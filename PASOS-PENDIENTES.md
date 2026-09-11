# Pasos pendientes (requieren acción tuya)

## Cambios de diseño aplicados (segunda pasada)
- **Hero con foto real**: pantalla LED de Taylor Swift de fondo con overlay oscuro.
- **Banda de logos de clientes** justo debajo del hero (la sección Clientes vieja se reemplazó por esta banda; el ancla `#clientes` sigue funcionando).
- **Stat "360°" corregido** → "Federal / Cobertura en todo el país".
- **Media kit PDF** en `_no-subir/Nextmedia-Media-Kit.pdf` (5 páginas, branded). No se sube a la web: cuando alguien lo pide por el botón "Pedí el media kit" en Contacto, te llega un WhatsApp y se lo enviás vos → así capturás el lead. Guardalo en tu teléfono/PC para tenerlo a mano.

## Cambios aplicados hoy (9/6/2026) — resumen
- Imágenes convertidas a WebP con nombres SEO: assets pasó de **27 MB a ~0,9 MB**.
- Archivos sin uso movidos a `_no-subir/` → **NO subir esa carpeta al hosting**.
- Nueva `assets/img/og-image.jpg` (1200×630) para compartir en WhatsApp/LinkedIn/Facebook.
- Nuevo `apple-touch-icon.png` (icono iOS).
- Formulario ahora envía por **WhatsApp** (convierte más que mailto) y registra el lead en GA4 si está activo.
- 3 páginas nuevas de servicios (SEO): `servicios/publicidad-via-publica.html`, `servicios/pantallas-led.html`, `servicios/activaciones-de-marca.html` — enlazadas desde la home y agregadas al `sitemap.xml`.
- Snippet GA4 dejado comentado en el `<head>` de `index.html`.

## Para hacer vos (en orden de impacto)

1. **Subir todo al hosting** (excepto `_no-subir/`). Verificar que `https://nextmedia.com.ar` redirija a `https://www.nextmedia.com.ar`.

2. **Google Search Console** — https://search.google.com/search-console
   Verificá la propiedad del dominio y enviá `sitemap.xml`. Sin esto Google tarda mucho más en indexar las páginas nuevas.

3. **Google Business Profile** — https://business.google.com
   Creá el perfil con la dirección de Puerto Madero, categoría "Agencia de publicidad". Es gratis y te hace aparecer en Maps y en búsquedas locales ("agencia vía pública Buenos Aires").

4. **GA4** — https://analytics.google.com
   Creá la propiedad, copiá el ID de medición (G-XXXXXXXXXX) y descomentá el bloque marcado en el `<head>` de `index.html`, reemplazando el ID. El formulario ya dispara el evento `generate_lead` automáticamente.

5. **Redes sociales.** En el footer de `index.html` hay un bloque comentado (`TODO`) para LinkedIn e Instagram: poné las URLs reales y descomentá. Agregalas también al Schema.org del `<head>` así:
   ```json
   "sameAs": ["https://www.instagram.com/...", "https://www.linkedin.com/company/..."]
   ```
   Para una agencia OOH, Instagram con fotos de campañas montadas es probablemente el mejor canal de visibilidad.

6. **Testimonios reales.** Los actuales son de muestra. Pedí 2-3 citas reales a clientes (Rappi, DF, etc.) y reemplazalas en la sección Testimonios.

## Ideas para más alcance a futuro
- Publicar un caso de éxito por mes como página nueva (ej. "Cómo cubrimos 7 ciudades para Rappi en 48 hs") y compartirlo en LinkedIn.
- Pedir a clientes reseñas en Google Business Profile.
- Página en inglés si apuntás a productoras internacionales (DF/DG traen shows del exterior).
