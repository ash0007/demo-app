import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as createjs from 'createjs-module';

@Component({
  selector: 'app-draw-anim',
  templateUrl: './draw-anim.component.html',
  styleUrls: ['./draw-anim.component.css']
})
export class DrawAnimComponent implements OnInit {
  stage: createjs.Stage;
  container: createjs.Container;

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.stage = this.getStage();
    this.container = new createjs.Container();
    this.animateClock();
    // createjs.Ticker.setFPS(60);
    // createjs.Ticker.addEventListener('tick', this.onTick.bind(this));
  }

  onTick() {
    this.stage.update();
  }

  animateClock() {
    const context = 'http://localhost:8080/';
    const restName = 'api/3';
    // this.httpClient.get(context + restName).subscribe((data: any) => {
      Array.from({length: 2}).forEach((e: any, i: number) => {
        setTimeout(() => {
          this.drawObject(i, 30);
        },i*1000, i);
      });
    // });
  }

  shapeObject = {
    centroid: {
      x: 0,
      y: 0
    }
  }
  
  drawObject(index: number, radius: number) {
    const draw = (i: number) => {
      const rotation = 0;
      const container = this.getObject(i, radius);
      container.setTransform(radius, 0, 1, 1, rotation, 0, 0, 0, 0);
      this.container.addChild(container);
      this.updateStage(this.container);
    }
    if(!index && index !== 0) {
      draw(0);
    } else {
      draw(index);
    }
  }

  getStage(canvasConfig?: any) {
    const stage: any = new createjs.Stage(canvasConfig?.id || "demoCanvas");
    stage.canvas.width = canvasConfig?.width || window.innerWidth;
    stage.canvas.height = canvasConfig?.height || window.innerHeight;
    return stage;
  }

  updateStage(shape: createjs.Shape | createjs.Text | createjs.Container) {
    this.stage.addChild(shape);
    (this.stage.canvas as any).width = window.innerWidth;
    (this.stage.canvas as any).height = window.innerHeight;
    this.stage.update();
  }

  getObject(i: number, radius: number): createjs.Container {
    const circleCenter = {
      x: 2*(i + 0.5)*radius,
      y: 2*(i + 0.5)*radius
    };
    const circle1 = this.getCircle(circleCenter.x, circleCenter.y, radius);
    const circle2 = this.getCircle(circleCenter.x, circleCenter.y, radius/40);
    const rect2 = this.getRect((2*i)*radius,(2*i)*radius,radius,radius);
    const rect1 = this.getRect((2*i + 1)*radius,(2*i + 1)*radius,radius,radius);
    const container = new createjs.Container();
    container.addChild(circle1);
    container.addChild(circle2);
    container.addChild(rect1);
    container.addChild(rect2);
    return container;
  }

  getCircle(x: number, y: number, radius: number): createjs.Shape {
    const graphics = this.getGraphics().drawCircle(x, y, radius);
    const circle = new createjs.Shape(graphics);
    return circle;
  }

  getRect(x: number, y: number, w: number, h: number) {
    const graphics = this.getGraphics().drawRect(x, y, w, h);
    const rect = new createjs.Shape(graphics);
    return rect;
  }

  createText() {
    this.updateStage(this.getText(2));
  }

  getText(n: number): createjs.Text {
    const text = new createjs.Text(n.toString(), '20px', "#000")
    return text;
  }
  getGraphics(): createjs.Graphics {
    const circleConfig = {
      beginFill: '#ddd',
      beginStroke: '#000',
    };
    const graphics = new createjs.Graphics().beginFill(circleConfig.beginFill).beginStroke(circleConfig.beginStroke);
    return graphics;
  }
}

interface IShapeObject {
  centroid: ICenter;
  rotation?: number;
  scaleX?: number;
  scaleY?: number
}

interface ICenter {
  x: number;
  y: number;
}