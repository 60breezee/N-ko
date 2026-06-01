"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapPickerProps {
  onLocationSelect: (lat: number, lng: number) => void;
  defaultLocation?: [number, number];
}

export default function MapPicker({ onLocationSelect, defaultLocation = [6.1323, 1.2228] }: MapPickerProps) {
  useEffect(() => {
    // Fix for default markers not showing in Leaflet with Next.js
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });

    const map = L.map("map-picker").setView(defaultLocation, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    let marker = L.marker(defaultLocation, { draggable: true }).addTo(map);

    marker.on("dragend", () => {
      const position = marker.getLatLng();
      onLocationSelect(position.lat, position.lng);
    });

    map.on("click", (e) => {
      marker.setLatLng(e.latlng);
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    });

    return () => {
      map.remove();
    };
  }, [onLocationSelect, defaultLocation]);

  return <div id="map-picker" className="h-[300px] w-full rounded-xl border border-slate-200" />;
}
