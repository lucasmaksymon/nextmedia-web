# Auditoría SEO — Nextmedia

**Sitio:** https://www.nextmedia.com.ar/ · **Archivo:** `index.html` (landing one-page)
**Fecha:** 5 de junio de 2026

---

## Resumen

El sitio parte de una base SEO sólida para ser una landing de una sola página: ya tenía `meta description`, Open Graph, Twitter Card, datos estructurados Schema.org, atributo `lang`, `alt` en la mayoría de las imágenes, `loading="lazy"` y `width/height` en varios elementos. La auditoría detectó faltantes de indexación (no había `robots.txt` ni `sitemap.xml`), ausencia de `canonical` y algunos metadatos sociales incompletos. La mayoría ya quedó corregida en esta pasada; el resto requiere decisiones o archivos tuyos.

**Puntaje estimado antes:** ~72/100 · **después de las correcciones aplicadas:** ~88/100.

---

## Correcciones ya aplicadas

| # | Cambio | Dónde | Impacto |
|---|--------|-------|---------|
| 1 | Creado `robots.txt` con referencia al sitemap | raíz | Alto |
| 2 | Creado `sitemap.xml` | raíz | Alto |
| 3 | Agregada etiqueta `<link rel="canonical">` | `<head>` | Alto |
| 4 | `lang="es"` → `lang="es-AR"` (segmentación regional) | `<html>` | Medio |
| 5 | Open Graph completado: `og:site_name`, `og:locale`, `og:image:alt` | `<head>` | Medio |
| 6 | Schema.org enriquecido: tipo `AdvertisingAgency`, `contactPoint`, `areaServed`, `postalCode` | JSON-LD | Medio |
| 7 | `alt="Cliente"` (genérico) → `alt="Logo de cliente de Nextmedia"` en el carrusel de logos | sección Clientes | Bajo |
| 8 | Agregado `<meta name="author">` | `<head>` | Bajo |

---

## Pendientes recomendados (requieren acción tuya)

### Prioridad alta

1. **Imagen para compartir en redes (`og:image`).** Hoy apunta al logo (880×175 px), que se recorta mal en Facebook/WhatsApp/LinkedIn. Lo ideal es una imagen **1200×630 px** con el logo + un fondo de campaña. Puedo generártela si querés.
2. **Dar de alta el sitio en Google Search Console** y enviar el `sitemap.xml`. Sin esto Google tarda más en indexar y no ves datos de búsqueda. Requiere verificar la propiedad del dominio (meta tag o registro DNS).
3. **Confirmar dominio definitivo (www vs sin www).** Todo el SEO usa `https://www.nextmedia.com.ar/`. Asegurate de que el servidor redirija la versión sin `www` (y `http`) a esa, para no dividir señales.

### Prioridad media

4. **Apple touch icon.** Falta `apple-touch-icon.png` (180×180) para accesos directos en iOS. No lo agregué para no dejar un enlace roto; si me pasás un PNG cuadrado lo dejo listo.
5. **Logos de clientes con `alt` real.** Varias capturas (`Captura de pantalla 2023-...`) quedaron con alt genérico porque no sé qué marca es cada una. Conviene renombrar los archivos a algo descriptivo (ej. `cliente-rappi.png`) y poner el nombre real en el `alt`.
6. **Analítica web.** No hay Google Analytics / GA4 ni Tag Manager. Sin medición no podés saber qué canales traen tráfico.
7. **Enlaces sociales reales.** En el footer, LinkedIn e Instagram apuntan a `#`. Cuando tengas las URLs, además conviene sumarlas como `sameAs` en el Schema.org para reforzar la entidad de marca.

### Prioridad baja

8. **Jerarquía de encabezados.** La página salta de `h2` a `h4`/`h5` sin `h3`. No es crítico, pero ordenar la jerarquía ayuda a accesibilidad y semántica.
9. **Dimensiones en imágenes de campañas.** Las tarjetas de campañas no declaran `width/height`, lo que puede generar pequeño desplazamiento de layout (CLS) al cargar. Agregar dimensiones o `aspect-ratio` en CSS lo evita.
10. **Testimonios reales.** Los testimonios actuales son de muestra (hay un comentario que lo indica en el código). Google penaliza reseñas inventadas si se marcan con Schema `Review`; mantenerlos sin marcado estructurado o reemplazarlos por reales.

---

## Lo que ya estaba bien (no tocar)

- `meta description` clara y con palabras clave (OOH, activaciones, Argentina).
- Open Graph y Twitter Card presentes.
- Datos estructurados Schema.org de organización con dirección y teléfono.
- `loading="lazy"` y `decoding="async"` en imágenes.
- Logo con `width/height` y `fetchpriority="high"` (bueno para LCP).
- Enlace "saltar al contenido" y atributos `aria-*` (accesibilidad).
- Un único `<h1>` bien definido.

---

## Próximos pasos sugeridos

1. Generar la imagen `og:image` de 1200×630.
2. Subir los 3 archivos nuevos (`robots.txt`, `sitemap.xml`) y el `index.html` actualizado al hosting.
3. Verificar el sitio en Google Search Console y enviar el sitemap.
4. Conectar GA4 para empezar a medir.
