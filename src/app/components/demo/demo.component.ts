import { Component, OnInit } from '@angular/core';
import { Container, Graphics, Shape, Stage, Ticker } from 'createjs-module';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  stage: Stage;
  container: Container;
  line: Shape;
  constructor() { }

  ngOnInit(): void {
    this.stage = this.getStage();
    const from = {x: 400, y: 400};
    const to = {x: 300, y: 300};
    // this.line = this.getRect(100, 100, 10, 100);
    this.line = this.getLine(from, to);
    this.container = new Container();
    Ticker.setFPS(60);
    this.stage.addChild(this.container.addChild(this.line));
    Ticker.on('tick', this.onTick.bind(this));
    this.stage.update();
  }

  private getStage(canvasConfig?: any) {
    const stage: any = new Stage(canvasConfig?.id || "demoCanvas");
    stage.canvas.width = canvasConfig?.width || window.innerWidth;
    stage.canvas.height = canvasConfig?.height || window.innerHeight;
    return stage;
  }

  private onTick() {
    this.line.rotation += 2;
    this.stage.update();
  }

  private getLine(from: IPoint, to: IPoint, strokeStyle?: IStrokeStyle, graphicsColors?: any) {
    const line = this.getGraphics(graphicsColors?.fillColor, graphicsColors?.strokeColor, strokeStyle).moveTo(from.x, from.y).lineTo(to.x, to.y);
    const shape = new Shape(line);
    shape.regX = from.x;
    shape.regY = from.y;
    shape.x = 100;
    shape.y = 100;
    return shape;
  }

  private getRect(x: number, y: number, w: number, h: number) {
    const graphics = this.getGraphics().drawRect(x, y, w, h);
    const rect = new Shape(graphics);
    rect.regX = x + w/2;
    rect.regY = y;
    rect.x = 100;
    rect.y = 100;
    return rect;
  }

  private getGraphics(fillColor?: string, strokeColor?: string, strokeStyle?: IStrokeStyle): Graphics {
    const circleConfig = {
      beginFill: fillColor || '#ddd',
      beginStroke: strokeColor || '#000',
    };
    const graphics = new Graphics().beginFill(circleConfig.beginFill).beginStroke(circleConfig.beginStroke).setStrokeStyle(strokeStyle?.width || 1, strokeStyle?.caps || 'round');
    return graphics;
  }

}

interface ICenter {
  x: number;
  y: number;
}
interface IStrokeStyle {
  width: number;
  caps?: 'round' | 'butt' | 'square';
  joints?: 'round' | 'bevel' | 'miter';
  miterLimit?: number
}
type IPoint = ICenter;