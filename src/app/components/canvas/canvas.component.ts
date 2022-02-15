import { Component, ComponentFactoryResolver, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Stage } from 'createjs-module';
import { Clock, ICircleConfig } from '../clock/canvas/clock.shape';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  @Input('width') width: number;
  @Input('height') height: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  context2: CanvasRenderingContext2D;
  constructor(
  ) {
  }

  ngOnInit(): void {
    this.canvas = this.getCanvas();
    this.context = this.getContext();
    Clock.createCircle(this.context);
    Clock.createCircle(this.context, {position:{x: 300, y:300}, radius: 150});
    Clock.createLine(this.context);
    Clock.createText(this.context, 10);
  }

  private getCanvas(canvasConfig?: any): HTMLCanvasElement {
    const canvas: HTMLCanvasElement = document.getElementById("demoCanvas") as HTMLCanvasElement;
    canvas.width = canvasConfig?.width || window.innerWidth;
    canvas.height = canvasConfig?.height || window.innerHeight;
    return canvas;
  }
  private getContext(): CanvasRenderingContext2D {
    const context = this.canvas.getContext("2d");
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    return context;
  }
}
