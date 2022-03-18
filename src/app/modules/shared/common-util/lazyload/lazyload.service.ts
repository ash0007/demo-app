import { Injectable } from '@angular/core';

const modulePromiseList = [
  "import('../modules/shared/elements/elements.module')"
]

@Injectable()
export class LazyloadService {

  constructor() { }

  public loadFeature(module: string) {
    let modulePromise = modulePromiseList.filter(mPromise => mPromise.toString().indexOf(module) > -1)[0];
    eval(modulePromise).then((result: any) => {
      console.log(result);
    });
  }
}
