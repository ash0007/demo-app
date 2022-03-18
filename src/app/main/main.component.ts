import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  title = 'demo-app';

  isLoaded = false;
  isBtnClicked = false;
  @ViewChild('lazyLoadCmp', { read: ViewContainerRef }) vcref: ViewContainerRef

  constructor(
    private cfr: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
  }

  loadCmp(event: any) {
    this.isBtnClicked = true;
    // console.log(event);
    timer(20).subscribe((value) => {
      this.isLoaded = true;
      this.loadDynamicComponent();
    });
  }
  loadDynamicComponent() {
    this.vcref?.clear();
    import('../components/canvas/canvas.component').then((cmp: any) => {
      const componentName: string = Object.keys(cmp)[0];
      let clockCmp = this.vcref.createComponent(
        this.cfr.resolveComponentFactory( cmp[componentName] )
      );
    });
    // clockCmp.instance.radius = 160;
  }
}
