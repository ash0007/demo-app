import { Component, ComponentFactoryResolver, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Stage } from 'createjs-module';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  @Input('width') width: number;
  @Input('height') height: number;
  private stage: Stage;
  constructor(
    private vcref: ViewContainerRef,
    private cfr: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.vcref.clear();
    import('../clock/clock.component').then((cmp: any) => {
      const cmpName = Object.keys(cmp)[0];
      this.vcref.createComponent(
        this.cfr.resolveComponentFactory(cmp[cmpName])
      );
    })
  }

  private getStage(canvasConfig?: any) {
    const stage: any = new Stage(canvasConfig?.id || "demoCanvas");
    stage.canvas.width = canvasConfig?.width || window.innerWidth;
    stage.canvas.height = canvasConfig?.height || window.innerHeight;
    return stage;
  }

}
