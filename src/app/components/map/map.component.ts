import { AfterViewInit, Component, OnInit } from '@angular/core';
import { circle, Map, map, rectangle, svg, tileLayer } from 'leaflet';
// declare const google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  public ids: Array<string> = [];
  private _maps: Array<Map> = [];

  constructor() {
    this.ids[0] = 'map';
    this.ids[1] = 'map1';
    // document.createElement('div');
    // this.loadGoogle();
  }
  ngOnInit(): void {
    // this.loadMap();
  }

  ngAfterViewInit(): void {
      this.loadMap();
  }
  
  loadMap(): void {
    const centroid = {
      lat: 22.71361466327701,
      lng: 75.9120403994733,
    };
    this.ids.forEach((id, index, ids) => {
      this._maps[index] = map(id, {
        center: centroid,
        zoom: 10,
        renderer: svg()
      });
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 21,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this._maps[index]);
      circle(centroid, { radius: 10000, renderer: svg({ padding: 0.5 }) }).addTo(this._maps[index]);
      rectangle([[22.73361466327701, 75.9320403994733], [22.55161466327701, 75.7120403994733]]).addTo(this._maps[index]);
    });
    // L.geoJSON({}, {} as L.GeoJSONOptions).addTo(this._map)
    // new google.maps.Map(document.getElementById(this.id) as HTMLElement, {
    //   center: centroid,
    //   zoom: 15
    // });
  }
}
