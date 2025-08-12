# Iceland Roadtrip Blog (Next.js + MDX + Leaflet)

## Requisitos
- Node.js LTS (20 o 22) y npm
- Git
- (Opcional) VS Code
- Clave API de OpenRouteService (`ORS_API_KEY`) definida en el entorno. Regístrate en https://openrouteservice.org/ para obtenerla y configúrala con `export ORS_API_KEY=tu_clave`.
## Arranque
```bash
npm install
npm run dev
```
Abre http://localhost:3000

## Estructura
- `app/` páginas (App Router)
- `components/MapIceland.tsx` mapa con coche animado
- `content/` posts MDX (ejemplo incluido)

## Despliegue
- Vercel recomendado: conecta el repo y listo.
