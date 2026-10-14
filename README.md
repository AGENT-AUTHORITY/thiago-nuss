# Thiago Nuss — Player Portfolio

Web estática responsive para GitHub Pages. Hecha con **HTML + CSS + JavaScript**, sin frameworks ni bases de datos. La carpeta `assets/` contiene imágenes ya optimizadas en WebP.

## Qué contiene

- Presentación editorial de Thiago Nuss (Cañuelas → OFI Creta).
- Tarjeta de jugador estilo videojuego y sección **PLAYER DNA** interactiva.
- Perfil y línea de tiempo de trayectoria.
- Dato histórico corroborado: 12 goles en 33 partidos en 2024/25, según OFI Creta.
- Sección reservada para videos destacados.
- Galería con ampliación de fotos, menú móvil, SEO básico y accesibilidad.

### Importante sobre habilidades y datos

Los tres rasgos (explosividad, intensidad y capacidad goleadora) están basados en una descripción del OFI publicada el 9 de julio de 2025. **No se han inventado puntuaciones de EA SPORTS FC, calificaciones de scouts, citas de Thiago ni estadísticas actuales.** Antes de entregar o publicar definitivamente, validar todos los datos y las imágenes con el jugador.

Fuentes:
- OFI (incorporación y perfil, 2024): https://www.oficretefc.com/genika/sta-aspromavra-o-nuss/
- OFI (contrato y números 2024/25, 2025): https://www.oficretefc.com/genika/latin-mageia-trietias-me-nuss/
- UEFA (club, número y fecha de nacimiento, 2026/27): https://www.uefa.com/uefaeuropaleague/clubs/players/250223443--thiago-thomas-nuss/
- Datos de posición / pierna / altura: https://www.transfermarkt.com.ar/thiago-nuss/profil/spieler/840101

## Probar en tu PC

Abrí `index.html` con un navegador o corré un servidor local desde la carpeta:

```bash
python -m http.server 8000
```

Después visitá `http://localhost:8000`.

## Publicar en GitHub Pages

1. Creá un repositorio nuevo, por ejemplo `thiago-nuss-portfolio`.
2. Subí **el contenido de esta carpeta** a la raíz del repositorio (`index.html`, `styles.css`, `script.js`, `assets/`). No subas solamente el ZIP.
3. Andá a **Settings → Pages**. Elegí **Deploy from a branch**, branch `main`, folder `/ (root)` y guardá.
4. GitHub mostrará la URL publicada, normalmente `https://TU-USUARIO.github.io/thiago-nuss-portfolio/`.
5. Probá el sitio en un teléfono antes de enviárselo a Thiago.

Nota: GitHub Pages es alojamiento de archivos estáticos. No se necesita Supabase para esta versión; se puede incorporar más adelante si Thiago quiere un panel de administración para actualizar clips o estadísticas.

## Fotos y créditos

Las fotos utilizadas son las compartidas para realizar esta demostración. Se han convertido a WebP y pesan aproximadamente 100–300 KB cada una. No se recomienda utilizar las fotos públicamente en anuncios comerciales ni atribuir patrocinio al jugador sin obtener su permiso y revisar los derechos de los fotógrafos originales. Para una versión definitiva, reemplazá o acreditá las fotografías según la licencia o autorización correspondiente.

### Reemplazar fotos

Los archivos en `assets/` tienen nombres descriptivos:

| Archivo | Uso |
| --- | --- |
| `portrait.webp` | Portada, ficha de jugador y galería |
| `celebration.webp` | Perfil y galería |
| `back.webp` | Highlights |
| `trophies.webp` | Foto de la sección historia |
| `moments.webp` | Galería |
| `action.webp`, `dribble.webp` | Highlights y galería |
| `action-collage.webp` | Reserva de material |
| `poster.webp` | Miniatura para compartir |

Para comprimir una fotografía JPG con Pillow (si querés mantener el nombre):

```python
from PIL import Image
im = Image.open('foto.jpg').convert('RGB')
im.thumbnail((1600, 2000))
im.save('assets/portrait.webp', 'WEBP', quality=80, method=6)
```

## Agregar videos de Thiago (automático)

La primera versión muestra tres tarjetas con la leyenda *VIDEO PRÓXIMAMENTE*. **No simula que se pueden reproducir videos que todavía no tenemos.**

Cuando Thiago te pase clips autorizados:

1. Guardalos optimizados como **`highlight-01.mp4`**, **`highlight-02.mp4`**, **`highlight-03.mp4`**.
2. Subilos directamente a `assets/` en GitHub (respetá exactamente estos nombres).
3. **Listo: la web detecta automáticamente los videos y muestra el reproductor HTML5**, manteniendo las fotos de portada; no tenés que editar HTML ni JavaScript. Si algún video no está, esa tarjeta sigue diciendo *PRÓXIMAMENTE*.

Recomendación: formato MP4 H.264, audio AAC, `yuv420p`, moov al inicio para reproducción progresiva.

Ejemplo FFmpeg para comprimir un clip a un máximo de 1280 píxeles sin recortar el original:

```bash
ffmpeg -i original.mp4 -vf "scale='if(gt(iw,ih),min(1280,iw),-2)':'if(gt(iw,ih),-2,min(1280,ih))'" -c:v libx264 -crf 27 -preset medium -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart assets/highlight-01.mp4
```

Nota: GitHub Pages está bien para videos cortos y optimizados, pero tiene límites de tamaño/tráfico. Para videos largos o muchos espectadores, alojarlos en YouTube/Vimeo y usar reproductores embebidos.

## Entrega y promoción

Esta demo **no se presenta como web oficial ni implica una recomendación de Thiago**. Primero mostrársela y pedir validación. Si el jugador autoriza mostrarla como caso en el Instagram de la agencia, guardar ese consentimiento y los permisos de uso de imágenes para publicidad. El crédito a la agencia podría agregarse a la página **solo si Thiago está de acuerdo**.

## Antes de publicar

- [ ] Thiago confirma datos de carrera, club y características del juego.
- [ ] Thiago elige fotos y da su visto bueno.
- [ ] Revisar permisos de fotógrafos y de emblemas / escudos.
- [ ] Agregar videos autorizados.
- [ ] Confirmar si se puede mostrar el trabajo y etiquetarlo en publicaciones de la agencia.
- [ ] No usar `www.thiagonuss.com` sin comprar / controlar ese dominio; GitHub Pages tendrá la URL verdadera del repositorio.
