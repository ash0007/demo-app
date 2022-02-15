import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Container, Shape, Stage, Text, Ticker } from 'createjs-module';
import { IPoint } from './createjs/create-js-shapes';
import { Clock } from './createjs/clock.shape';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  stage: Stage;
  container: Container;

  private objectsList: any;
  private links: any = [];
  frameRate: number;
  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.stage = this.getStage();
    this.container = new Container();
    Ticker.interval = 1;
    this.frameRate = 1;
    Ticker.setFPS(this.frameRate);
    this.main();
    Ticker.on('tick', this.onTick.bind(this));
  }

  private main() {
    this.objectsList = {
      // obj0: {
      //   position: {
      //     x: window.innerWidth / 2,
      //     y: window.innerHeight / 2
      //   },
      //   radius: 90,
      //   speed: 1.5,
      //   direction: 30,
      //   rotation: 1
      // },
      // obj1: {
      //   position: {
      //     x: 10,
      //     y: 20
      //   },
      //   radius: 50,
      //   speed: 1,
      //   direction: 20,
      //   rotation: 1
      // },
      // obj2: {
      //   position: {
      //     x: 100,
      //     y: 0,
      //   },
      //   radius: 70,
      //   speed: 2,
      //   direction: 40,
      //   rotation: 1
      // },
      // obj3: {
      //   position: {
      //     x: 10,
      //     y: 100,
      //   },
      //   radius: 30,
      //   speed: 3,
      //   direction: 15,
      //   rotation: 1
      // },
      obj4: {
        position: {
          x: 200,
          y: 200,
        },
        radius: 100,
        speed: 500,
        direction: 60,
        rotation: 10
      }
    };
    Object.keys(this.objectsList).forEach((c: any) => {
      this.objectsList[c].isX_inc = true;
      this.objectsList[c].isY_inc = true;
      if(this.objectsList[c].position.x < this.objectsList[c].radius) {
        this.objectsList[c].position.x = this.objectsList[c].radius;
      }
      if(this.objectsList[c].position.y < this.objectsList[c].radius) {
        this.objectsList[c].position.y = this.objectsList[c].radius;
      }
    });

    Object.keys(this.objectsList).forEach(e => {
      const clock = new Clock(this.objectsList[e].radius, this.objectsList[e].position, e);
      this.container.addChild(clock.container);
      this.objectsList[e].shape = clock;
    });
    this.links = this.createLinks();
    this.stage.addChild(this.container);
  }

  private createLinks() {
    let uniqLinks = [];
    const links: any = [];
    for (let n1 in this.objectsList) {
      for (let n2 in this.objectsList) {
        if (n1 !== n2 && uniqLinks.findIndex(l => (l.indexOf(n1) > -1 && l.indexOf(n2) > -1)) < 0) {
          uniqLinks.push([n1, n2]);
        }
      }
    }
    for (let link of uniqLinks) {
      links.push({ nodes: link });
    }
    return links;
  }

  private updateLinks() {
    const getDistance = (p1: IPoint, p2: IPoint) => {
      return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
    }
    for(let link of this.links) {
      link.distance = getDistance(this.objectsList[link.nodes[0]].position, this.objectsList[link.nodes[1]].position);
    }
  }

  private onTick() {
    this.moveObjects();
    this.stage.update();
  }

  private moveObjects() {
    let left = 0, right = 0, top = 0, bottom = 0, index = -1, speed = null, container = null, linksOfNode = null, shapeObject = null, direction = 0;
    this.updateLinks();
    Object.keys(this.objectsList).forEach((name: string) => {
      shapeObject = this.objectsList[name];
      linksOfNode = this.links.filter((link: any) => link.nodes.indexOf(name) > -1);
      index = this.container.children.findIndex(c => c.name === name);
      container = this.container.children[index];
      left = shapeObject.radius;
      right = window.innerWidth - shapeObject.radius;
      top = shapeObject.radius;
      bottom = window.innerHeight - shapeObject.radius;
      // direction = shapeObject.direction;
      shapeObject.shape.animate(this.frameRate);
      speed = this.getXYSpeed(shapeObject.direction, shapeObject.speed);

      // container.x += speed.x;
      // shapeObject.position.x += speed.x;
      // container.y += speed.y;
      // shapeObject.position.y += speed.y;

      if(shapeObject.position.x <= left || shapeObject.position.x >= right) {
        shapeObject.direction = 180 - shapeObject.direction;
      }
      if(shapeObject.position.y <= top || shapeObject.position.y >= bottom) {
        shapeObject.direction = 360 - shapeObject.direction;
      }
      // shapeObject.direction = shapeObject.direction > 360 ? shapeObject.direction - 360 : shapeObject.direction;
      shapeObject.direction = shapeObject.direction < 0 ? shapeObject.direction + 360 : shapeObject.direction;
    });
  }

  getXYSpeed(direction: number, speed: number): IPoint {
    return {
      x: speed * Math.cos(Math.PI * direction / 180) / this.frameRate,
      y: speed * Math.sin(Math.PI * direction / 180) / this.frameRate
    }
  }

  private animateClock() {
    const context = 'http://localhost:8080/';
    const restName = 'api/3';
    this.httpClient.get(context + restName).subscribe((data: any) => {
      Array.from({ length: data }).forEach((e: any, i: number) => {
        setTimeout(() => {
          // this.drawObject();
        }, i * 1000, i);
      });
    });
  }

  private getStage(canvasConfig?: any) {
    const stage: any = new Stage(canvasConfig?.id || "demoCanvas");
    stage.canvas.width = canvasConfig?.width || window.innerWidth;
    stage.canvas.height = canvasConfig?.height || window.innerHeight;
    return stage;
  }

  private updateStage(shape: Shape | Text | Container) {
    this.stage.addChild(shape);
    (this.stage.canvas as any).width = window.innerWidth;
    (this.stage.canvas as any).height = window.innerHeight;
    this.stage.update();
  }
}