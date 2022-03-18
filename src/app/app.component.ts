import { AfterViewInit, Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { MenuComponent } from "./modules/shared/elements/components/menu/menu.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'demo-app';
  headerMenu = MenuComponent;
  @ViewChild('renderingTmpl', { read: ViewContainerRef }) renderingTmpl: ViewContainerRef
  // @ViewChild('lazyHeader', { read: ViewContainerRef }) lazyHeaderTmpl: ViewContainerRef
  
  constructor(
    private cfr: ComponentFactoryResolver,
  ) {
  }
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // import('./modules/shared/elements/elements.module').then(() => {
    //   import('./modules/shared/elements/components/manu/manu.component').then((result: any) => {
    //     const componentName = Object.keys(result)[0];
    //     let cmp = this.lazyHeaderTmpl.createComponent(this.cfr.resolveComponentFactory(result[componentName]));
    //   });
    // });
  }

  ngOnDestroy(): void {
  }

  loadDynamicComponent(vcref: ViewContainerRef, mapId: string, centroid?: any) {
    vcref?.clear();
    import('./components/map/map.component').then((cmp: any) => {
      const componentName: string = Object.keys(cmp)[0];
      let clockCmp = vcref.createComponent(
        this.cfr.resolveComponentFactory( cmp[componentName] )
      );
      (clockCmp.instance as any).centroid = centroid || {
        lat: 22.71361466327701,
        lng: 75.9120403994733,
      };
      (clockCmp.instance as any).zoom = 10;
      (clockCmp.instance as any).id = mapId;
    });
    // clockCmp.instance.radius = 160;
  }

  loadCmp(event: any) {
  }

  private hitRestApi() {
    // this.activatedRoute.queryParams.subscribe((data: any) => {
    //   if(data?.name) {
    //     let url = "http://localhost:8080/greetPost?name=" + data.name;
    //     // let observable = this.httpClient.get(url);
    //     let observable = this.httpClient.post(url, data?.name);
    //     observable.subscribe((data) => {
    //       console.log(data);
    //       this.loadDynamicComponent(this.renderingTmpl, 'm1');
    //       // this.dynamicLoaderService.loadDynamicComponent('./components/map/map.component', this.vcref, {
    //       //   id: 'm1',
    //       //   zoom: 10,
    //       //   centroid: {
    //       //     lat: 22.71361466327701,
    //       //     lng: 75.9120403994733,
    //       //   }
    //       // })
    //     });
    //   }
    // });
  }
  private serviceWorkerDemo() {
    async function registration() {
      if('serviceWorker' in navigator) {
        try {
          navigator.serviceWorker.register('sw.js');
        } catch(e) {

        }
      }
    }
    registration();
  }
}