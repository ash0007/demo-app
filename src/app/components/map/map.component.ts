import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { circle, Map, map, rectangle, svg, tileLayer } from 'leaflet';
import { MapService } from './map.service';
// declare const google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [MapService, {provide: MapService, useClass: MapService}]
})
export class MapComponent implements OnInit, AfterViewInit {
  @Input() id = 'map';
  @Input() centroid = {
    lat: 22.71361466327701,
    lng: 75.9120403994733,
  };
  @Input() zoom = 10;

  public ids: Array<string> = [];
  private _maps: Array<Map> = [];

  constructor(
    private mapService: MapService
  ) {
    this.ids[0] = this.id;
    // this.ids[1] = 'map1';
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
    this.ids.forEach((id, index, ids) => {
      this._maps[index] = map(id, {
        center: this.centroid,
        zoom: this.zoom,
        renderer: svg()
      });
      this.mapService.getTileLayer().addTo(this._maps[index]);
      // {
      //   maxZoom: 21,
      //   // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      // })
      this.mapService.getCircle(this.centroid, 10000).addTo(this._maps[index]);
      this.mapService.getRectangle([22.73361466327701, 75.9320403994733], [22.55161466327701, 75.7120403994733]).addTo(this._maps[index]);
    });
    // L.geoJSON({}, {} as L.GeoJSONOptions).addTo(this._map)
    // new google.maps.Map(document.getElementById(this.id) as HTMLElement, {
    //   center: centroid,
    //   zoom: 15
    // });
  }
}
