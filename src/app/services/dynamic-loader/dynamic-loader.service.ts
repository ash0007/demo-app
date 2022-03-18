import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicLoaderService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  loadDynamicComponent(relativePath: string, vcref: ViewContainerRef, inputs: any) {
    vcref?.clear();
    import(relativePath).then((cmp: any) => {
      const componentName: string = Object.keys(cmp)[0];
      let component = vcref.createComponent(
        this.componentFactoryResolver.resolveComponentFactory( cmp[componentName] )
      );
      Object.assign(component.instance, inputs || {});
    });
  }
}
