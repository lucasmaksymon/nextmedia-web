# Auditoría SEO — Nextmedia (seguimiento)

**Sitio:** https://www.nextmedia.com.ar/ · **Fecha:** 8 de septiembre de 2026
**Base:** [AUDITORIA-SEO.md](AUDITORIA-SEO.md) (5/6/2026) + [PASOS-PENDIENTES.md](PASOS-PENDIENTES.md) (9/6/2026)

---

## Resumen

Desde la auditoría de junio se hizo mucho trabajo real: WebP en todas las imágenes, GA4 instalado y disparando eventos, 3 páginas de servicios nuevas con Schema `Service` + `FAQPage`, `og-image` y `apple-touch-icon` agregados, jerarquía de encabezados prolija (h1→h2→h3), testimonios de muestra eliminados. El sitio hoy tiene una base técnica sólida para ser una landing.

**Actualización (mismo día):** de los hallazgos de esta pasada, ya se corrigieron en el código el redirect de idioma (hallazgo #1) y las dimensiones de imagen (pendiente #6), se marcó `whatsapp_click` como evento clave en GA4, se borró el archivo sin uso, y **se verificó el sitio en Search Console y se envió el sitemap** (no hizo falta DNS — se verificó automáticamente vía la conexión existente con GA4). Ver [Corregido en esta sesión](#corregido-en-esta-sesión-8-9) más abajo. Quedan abiertos: marcar `generate_lead` como evento clave (GA4 no lo permite todavía, ver detalle) y conseguir las URLs reales de redes sociales.

**Puntaje estimado:** ~93/100 (técnica on-page) — el techo hoy es medición fina (eventos clave) y contenido, no infraestructura SEO.

---

## Hallazgos nuevos de esta pasada

### 1. (Alto — a verificar) Redirección de idioma por JavaScript puede confundir a Googlebot

En el `<head>` de **todas** las páginas (`index.html:6`, y se repite en cada página de servicio e idioma) hay un script inline que, si el visitante no tiene un idioma guardado, redirige según `navigator.language` — antes de que se pinte nada:

```js
var nv = (navigator.language||'es').slice(0,2).toLowerCase();
l = (nv==='en'||nv==='pt'||nv==='it') ? nv : 'es';
if (l !== 'es') location.replace(u); // ej: "/" -> "/en/"
```

Googlebot renderiza JS y su entorno normalmente reporta `navigator.language = en-US`. Si eso dispara este script en su primer rastreo de `https://www.nextmedia.com.ar/`, Google podría ver un `location.replace` hacia `/en/` en lo que debería ser la home en español — la versión que más te importa posicionar para búsquedas en Argentina.

**Mitigante:** el `canonical` y los `hreflang` de cada página son correctos y autoreferenciados, así que el daño real depende de cómo Google interprete ese redirect JS, no es un error de canonicalización. Pero es la clase de cosa que conviene confirmar, no asumir.

**Cómo confirmarlo (gratis, 5 min) una vez tengas Search Console verificado:** Inspección de URLs → pegá `https://www.nextmedia.com.ar/` → "Ver página rastreada" → mirá si la URL renderizada/el HTML que devuelve es la home en español o si aparece com redirigido a `/en/`.

**Si se confirma el problema**, la solución más simple es no ejecutar el redirect para user-agents de bots (chequear `navigator.webdriver` o lista de user-agents conocidos), o directamente sacar el auto-redirect por idioma del navegador y dejar sólo el selector manual ES/EN/PT/IT — es una práctica que Google en general desaconseja para SEO porque interfiere con el rastreo.

### 2. (Alto — analytics) Eventos clave de GA4 no coinciden con los eventos reales

Ya lo vimos en la sesión de analytics: la propiedad tiene marcados como "evento clave" `close_convert_lead`, `qualify_lead` y `purchase` (nunca se dispararon), pero el sitio en realidad dispara `generate_lead` (al enviar el formulario de contacto — [main.js:178](assets/js/main.js:178)), `whatsapp_click` y `cta_click`. Resultado: **0 conversiones registradas** en todos los reportes de GA4 pese a que hubo 7 envíos de formulario en 2 meses.

**Arreglo:** Configuración de la propiedad → Eventos → pestaña "Eventos recientes" → tildar la estrella en `generate_lead` (el de mayor intención) y, si querés medir también clics de WhatsApp como conversión secundaria, en `whatsapp_click`.

---

## Corregido en esta sesión (8/9)

| # | Qué se hizo | Dónde |
|---|---|---|
| A | Guardia anti-bots en el redirector de idioma: si `navigator.webdriver` es `true` o el user-agent matchea patrones de bots/crawlers conocidos (Googlebot, Bingbot, Lighthouse, etc.), el script no ejecuta el `location.replace`. Reduce el riesgo del hallazgo #1 sin sacar la función para usuarios reales. | `index.html`, `servicios/publicidad-via-publica.html`, `servicios/pantallas-led.html`, `servicios/activaciones-de-marca.html` |
| B | `width`/`height` agregados a las imágenes de la galería de campañas y a los logos de clientes (288 `<img>` en total) usando las dimensiones reales de cada archivo. Verificado en navegador que el tamaño renderizado no cambió (el CSS ya gobierna el tamaño final vía `aspect-ratio`/`object-fit`) — solo se eliminó el salto de layout mientras carga. | Las 4 home (`index.html`, `en/`, `it/`, `pt/`) + 8 páginas de servicio (todas menos `pantallas-led.html`, que no tiene galería) |
| C | Borrado `assets/img/campanias/8.jpg` (66 KB, no referenciado en ningún HTML) | — |
| D | `whatsapp_click` marcado como evento clave en GA4 | Configuración de la propiedad → Eventos |
| E | Sitio verificado en Google Search Console (`https://nextmedia.com.ar/` y `https://www.nextmedia.com.ar/`, vía el método "Google Analytics" — instantáneo, sin tocar DNS) y `sitemap.xml` enviado | search.google.com/search-console |

**Sobre `generate_lead` (no se pudo marcar todavía):** GA4 solo deja elegir como evento clave algo que aparezca en la lista de "Eventos recientes" (ventana de 28 días), y `generate_lead` no se disparó desde principios de julio — no aparece en esa lista aunque el evento existe. No lo fuerzo simulando un envío falso porque eso metería un dato ficticio en tus analytics reales. Dos caminos: esperar al próximo envío real del formulario de contacto (ahí sí va a aparecer en los últimos 28 días y se puede marcar en 10 segundos), o si preferís tenerlo ya, avisame y lo puedo disparar manualmente por consola — quedaría identificable como evento de prueba, no como lead real.

---

## Confirmado: lo que ya se corrigió desde junio

| # | Pendiente de la auditoría anterior | Estado |
|---|---|---|
| 1 | Imagen `og:image` 1200×630 | ✅ Hecho (`assets/img/og-image.jpg`) |
| 2 | Apple touch icon | ✅ Hecho |
| 3 | Alt genérico en logos de clientes | ✅ Hecho — todos tienen nombre real |
| 4 | Analítica web (GA4) | ✅ Instalado y disparando eventos (ver hallazgo #2 arriba) |
| 5 | Jerarquía de encabezados | ✅ h1→h2→h3 sin saltos |
| 6 | Testimonios de muestra | ✅ Sección eliminada |

## Pendientes que siguen abiertos

### Alta prioridad
1. ~~Verificar el dominio en Google Search Console y enviar el sitemap.~~ ✅ **Resuelto en esta sesión** — resultó no necesitar DNS: como la cuenta de Google ya tenía acceso de administrador al GA4 instalado en el sitio, Search Console se pudo verificar automáticamente por "Google Analytics" para `https://nextmedia.com.ar/` y `https://www.nextmedia.com.ar/`, y ya se envió el `sitemap.xml`. Search Console va a tardar 24-48h en mostrar los primeros datos de búsqueda — el sitemap quedó con estado "No se ha podido obtener" apenas enviado, que es normal hasta el primer rastreo; conviene revisar mañana que haya pasado a "Correcto".
2. **Marcar `generate_lead` como evento clave en GA4** — no se pudo hacer todavía, ver nota en "Corregido en esta sesión" arriba. Se resuelve solo apenas el evento vuelva a aparecer en la ventana de 28 días, o antes si querés que dispare uno de prueba.

### Media prioridad
3. **Enlaces sociales reales** ([index.html:528](index.html:528)). Siguen comentados con el mismo TODO de junio — **necesito que me pases las URLs reales** de LinkedIn/Instagram para descomentarlos y agregar `"sameAs": [...]` al Schema.org Organization en las 4 versiones de idioma.
4. **Páginas de servicio con poco tráfico interno.** Las 3 páginas nuevas (`/servicios/*.html`) tienen muy buen SEO técnico (Schema `Service` + `FAQPage`, meta únicos) pero reciben apenas 3-5 sesiones cada una en 90 días — están para indexar bien mientras Google las descubre, pero conviene linkearlas también desde algún lugar con más tráfico (ej. mencionarlas en respuestas de WhatsApp, firma de mail) hasta que el orgánico madure.

### Baja prioridad
5. **Sin `BreadcrumbList` Schema** en las páginas de servicio. No es obligatorio pero ayuda a que aparezcan breadcrumbs en el resultado de búsqueda. (No lo agregué en esta pasada para no tocar más archivos de los necesarios sin que lo pidas — avisame si lo querés.)

## Lo que sigue estando muy bien (no tocar)
- Canonical + hreflang (con `x-default`) correctos y autoreferenciados en las 4 páginas de idioma y las 3 de servicio.
- Schema.org `Organization`/`AdvertisingAgency` en todas las páginas + `Service`/`FAQPage` en las de servicio.
- Sitemap con 16 URLs, hreflang cruzado, bien formado.
- `robots.txt` simple y correcto, con referencia al sitemap.
- Redirect 301 de `nextmedia.com.ar` → `www.nextmedia.com.ar` en `.htaccess`.
- Compresión de imágenes a WebP (2.5 MB toda la carpeta `assets/img`) y video con `preload="none"` + poster (no compite por LCP).
- `fetchpriority="high"` en logo y hero, `loading="lazy"` en el resto — buena gestión de LCP.

## Próximos pasos sugeridos (en orden)
1. Mañana o pasado: entrar a Search Console y revisar que el sitemap haya pasado a estado "Correcto" y que empiecen a verse datos de "Rendimiento".
2. Con Search Console ya verificado, usar "Inspección de URLs" sobre `https://www.nextmedia.com.ar/` para confirmar que Googlebot ve la home en español (no redirigida a `/en/`).
3. Pasarme las URLs reales de LinkedIn/Instagram para descomentar el footer y sumarlas al Schema.
4. Si querés `generate_lead` marcado ya (sin esperar al próximo lead real), avisame y disparo un evento de prueba identificable.
