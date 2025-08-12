import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { coords } = await req.json(); // [{lat,lng}]
    if (!process.env.ORS_API_KEY) {
      return NextResponse.json({ error: "Missing ORS_API_KEY" }, { status: 500 });
    }
    const body = {
      coordinates: coords.map((c: any) => [c.lng, c.lat]), // ORS usa [lon, lat]
      instructions: false,
      geometry: true,
      elevation: false,
      units: "km",
    };

    const res = await fetch(
      "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
      {
        method: "POST",
        headers: {
          Authorization: process.env.ORS_API_KEY!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const txt = await res.text();
      return NextResponse.json({ error: txt }, { status: res.status });
    }

    const data = await res.json();
    const line = data?.features?.[0]?.geometry?.coordinates || [];
    const latlng = line.map((p: [number, number]) => [p[1], p[0]]);
    return NextResponse.json({ route: latlng });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "error" }, { status: 500 });
  }
}
