import dynamic from "next/dynamic";
import Link from "next/link";
const MapIceland = dynamic(() => import("@/components/MapIceland"), { ssr: false });

export default function Home() {
  return (
    <section className="grid gap-8">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">Vuelta a Islandia en coche</h1>
          <p className="text-gray-300">Planificación del viaje de tu madre: paradas, hoteles, consejos prácticos y mapa animado del recorrido.</p>
          <div className="flex gap-3">
            <Link href="/itinerario" className="px-4 py-2 bg-white text-gray-900 rounded-xl font-medium">Ver itinerario</Link>
            <Link href="/consejos" className="px-4 py-2 border border-gray-700 rounded-xl">Consejos</Link>
          </div>
        </div>
        <MapIceland />
      </div>
    </section>
  );
}
