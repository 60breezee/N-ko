"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MissionMapProps {
  missions: Array<{
    id: string;
    name: string;
    lat: number;
    lng: number;
    current?: boolean;
  }>;
}

export default function MissionMap({ missions }: MissionMapProps) {
  useEffect(() => {
    // Fix for markers
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });

    const map = L.map("mission-map").setView([missions[0].lat, missions[0].lng], 14);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Custom Icon for Truck
    const truckIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: #059669; color: white; padding: 8px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-5l-4-4h-3v10h1"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
            </div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });

    // Add missions markers
    missions.forEach(mission => {
      const marker = L.marker([mission.lat, mission.lng], {
        icon: mission.current ? truckIcon : undefined
      }).addTo(map);
      
      marker.bindPopup(`<b>${mission.name}</b><br/>Status: ${mission.current ? 'Destination actuelle' : 'À venir'}`);
    });

    // Draw simple line between points (fake route)
    const points = missions.map(m => [m.lat, m.lng] as [number, number]);
    L.polyline(points, { color: '#059669', weight: 4, dashArray: '10, 10', opacity: 0.6 }).addTo(map);

    return () => {
      map.remove();
    };
  }, [missions]);

  return <div id="mission-map" className="h-[calc(100vh-160px)] md:h-[600px] w-full rounded-3xl border border-slate-200 shadow-sm" />;
}
