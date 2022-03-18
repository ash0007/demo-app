import { Injectable } from '@angular/core';
import { Circle, circle, LatLngExpression, LatLngTuple, Rectangle, rectangle, svg, TileLayer, tileLayer } from 'leaflet';

const DEFAULT_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
@Injectable()
export class MapService {

  constructor() { }

  getTileLayer(tileUrl?: string, options?: any): TileLayer {
    return tileLayer(tileUrl || DEFAULT_TILE_URL, options);
  }
  getCircle(center: LatLngExpression, radius: number): Circle {
    return circle(center, { radius: radius, renderer: svg({ padding: 0.5 }) });
  }
  getRectangle(corner1: LatLngTuple, corner2: LatLngTuple): Rectangle {
    return rectangle([corner1, corner2]);
  }
}
