
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements OnInit {

  constructor() { }

  leafletMap: any;
  lat: number = 53.4;
  lng: number = -8;
  zoom: number = 6;

  ngOnInit() {
    this.initMap();
  }

  private initMap() {
    this.leafletMap = new L.Map('map');
    const self= this;
    this.leafletMap.on("load", function() {
      setTimeout(() => {
        self.leafletMap.invalidateSize();
      }, 10);
    });

    this.leafletMap.setView([this.lat, this.lng], this.zoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
      attribution: '&copy: <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.leafletMap)

  }
}