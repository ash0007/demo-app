import { AfterViewInit, Component, OnInit } from '@angular/core';
import { map, tileLayer } from 'leaflet';
// declare const google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  public id: string;
  private _map: L.Map;

  constructor() {
    this.id = 'map';
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
    this._map = map(this.id, {
      center: centroid,
      zoom: 10
    })
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      
    }).addTo(this._map);
    // L.geoJSON({}, {} as L.GeoJSONOptions).addTo(this._map)
    // new google.maps.Map(document.getElementById(this.id) as HTMLElement, {
    //   center: centroid,
    //   zoom: 15
    // });
  }
}
