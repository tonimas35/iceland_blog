'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Polyline, Marker, Tooltip } from 'react-leaflet';
import * as L from 'leaflet';
import { useEffect, useMemo, useState } from 'react';

type Pt = [number, number];

// ===== Icono 3D del coche
const carIcon = (L as any).icon({
  iconUrl: '/icons/car-3d.svg',
  iconSize: [48, 48],
  iconAnchor: [24, 36],
  className: 'car-3d',
});

// ===== Paradas
const stops = [
  { name: 'Reykjavík',      lat: 64.1466, lng: -21.9426, img: '/images/stops/reykjavik.jpg' },
  { name: 'Selfoss',        lat: 63.9330, lng: -21.0010, img: '/images/stops/selfoss.jpg' },
  { name: 'Vík',            lat: 63.4189, lng: -19.0060, img: '/images/stops/vik.jpg' },
  { name: 'Höfn',           lat: 64.2539, lng: -15.2121, img: '/images/stops/hofn.jpg' },
  { name: 'Egilsstaðir',    lat: 65.2670, lng: -14.3940, img: '/images/stops/egilsstadir.jpg' },
  { name: 'Mývatn',         lat: 65.6480, lng: -16.9990, img: '/images/stops/myvatn.jpg' },
  { name: 'Akureyri',       lat: 65.6885, lng: -18.1262, img: '/images/stops/akureyri.jpg' },
  { name: 'Siglufjörður',   lat: 66.1510, lng: -18.9110, img: '/images/stops/siglufjordur.jpg' },
  { name: 'Grundarfjörður', lat: 64.9240, lng: -23.2630, img: '/images/stops/grundarfjordur.jpg' },
  { name: 'Reykjavík',      lat: 64.1466, lng: -21.9426, img: '/images/stops/reykjavik.jpg' },
];

// ===== Avatares redondos (fallback si no hay foto)
function initials(n: string) {
  const parts = n.replace(/[^\p{L}\p{N} ]/gu, '').trim().split(/\s+/);
  const a = (parts[0]?.[0] || '').toUpperCase();
  const b = (parts[1]?.[0] || '').toUpperCase();
  return (a + b) || a || '•';
}
function colorFor(n: string) {
  let h = 0; for (const c of n) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return `hsl(${h % 360} 70% 45%)`;
}
function badgeDataUrl(name: string) {
  const text = initials(name);
  const fill = colorFor(name);
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'>
       <defs><filter id='s' x='-50%' y='-50%' width='200%' height='200%'>
         <feDropShadow dx='0' dy='4' stdDeviation='4' flood-color='rgba(0,0,0,.35)'/></filter></defs>
       <circle cx='40' cy='40' r='36' fill='${fill}' filter='url(#s)' />
       <text x='50%' y='54%' font-family='Inter, Arial' font-size='28' text-anchor='middle' fill='white' font-weight='700'>${text}</text>
     </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
function photoIcon(url: string | undefined, name: string) {
  const iconUrl = url || badgeDataUrl(name);
  return (L as any).icon({ iconUrl, iconSize: [44, 44], iconAnchor: [22, 22], className: 'stop-photo' });
}

const MapContainerTyped: any = MapContainer;
const TileLayerTyped: any = TileLayer;
const PolylineTyped: any = Polyline;
const MarkerTyped: any = Marker;
const TooltipTyped: any = Tooltip;

export default function MapIceland() {
  const [roadRoute, setRoadRoute] = useState<Pt[] | null>(null);
  const [idx, setIdx] = useState(0);

  // 1) Pedir la ruta real por carretera
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/roadroute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coords: stops.map(s => ({ lat: s.lat, lng: s.lng })) }),
      });
      const data = await res.json();
      if (data?.route?.length) setRoadRoute(data.route as Pt[]);
      else console.error('No route returned', data);
    })();
  }, []);

  // 2) Animación simple (sin rotación)
  useEffect(() => {
    if (!roadRoute) return;
    const id = setInterval(() => setIdx(i => (i + 1) % roadRoute.length), 30);
    return () => clearInterval(id);
  }, [roadRoute]);

  const position = useMemo(() => (roadRoute?.[idx] || [64.8, -18]) as Pt, [roadRoute, idx]) as Pt;

  return (
    <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-800">
      <MapContainerTyped
        center={[64.8, -18]}
        zoom={6}
        style={{ height: 420, width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayerTyped
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {roadRoute && <PolylineTyped positions={roadRoute} />}

        {stops.map((s, i) => (
          <MarkerTyped key={i} position={[s.lat, s.lng] as Pt} icon={photoIcon(s.img, s.name)}>
            <TooltipTyped>{`${i + 1}. ${s.name}`}</TooltipTyped>
          </MarkerTyped>
        ))}

        {roadRoute && <MarkerTyped position={position} icon={carIcon} />}
      </MapContainerTyped>
    </div>
  );
}

