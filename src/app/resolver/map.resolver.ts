import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Observer } from 'rxjs';

const API_KEY = "AIzaSyD_7zV9Y84sCeiijNISabociP2i9_RAHD8";
@Injectable({
  providedIn: 'root'
})
export class MapResolver implements Resolve<any> {

  constructor() { }

  loadOSM(): Observable<any> {
    return new Observable((obs) => {
      const language = 'en';
      const url = `https://www.openstreetmap.org/#map=1/22/-128&layers=H`;
      const id = 'osm-map-script';
      this.addScriptToDOM(id, url, obs);
    });
  }
  loadGoogle(): Observable<any> {
    return new Observable((obs) => {
      const language = 'en';
      const url = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&language=${language}`;
      const id = 'google-map-script';
      this.addScriptToDOM(id, url, obs);
    });
  }
  addScriptToDOM(id: string, url: string, obs: Observer<any>) {
    let script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.id = id;
      if (script.addEventListener) {
        script.addEventListener(
          'load',
          () => {
            obs.next(true);
            obs.complete();
          },
          false
        );
      }
      document.head.appendChild(script);
  }
  resolve(): Observable<any> {
      return this.loadOSM();
  }
}
