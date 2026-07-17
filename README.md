# Exámenes · Hoteles de Petén

Dos exámenes interactivos de capacitación, **independientes**, publicados con
GitHub Pages y con guardado automático de resultados en Google Sheets.

- **Fase 1** — Servicio en el Ecosistema → `fase1.html`
- **Fase 2** — Anfitrión de Petén → `fase2.html`

Cada archivo funciona solo. Links (tras activar Pages):

- `https://javiwar04.github.io/examenHCI/fase1.html`
- `https://javiwar04.github.io/examenHCI/fase2.html`

## Guardado en Google Sheets

Los resultados (nombre, respuestas y punteo) se guardan solos al terminar cada examen.

1. Crea una Hoja de Google nueva en [sheets.new](https://sheets.new).
2. Menú **Extensiones → Apps Script**.
3. Pega el contenido de [`google-apps-script.gs`](google-apps-script.gs).
4. **Implementar → Nueva implementación → Aplicación web**
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier persona**
5. Copia la URL que termina en `/exec`.
6. Pégala en la constante `SHEETS_ENDPOINT` de `fase1.html` y `fase2.html`
   (reemplaza el texto `PEGA_AQUI_LA_URL_DEL_APPS_SCRIPT`).

Las pestañas **Fase 1** y **Fase 2** se crean automáticamente con sus encabezados.

## Publicar (GitHub Pages)

Repo: **Settings → Pages → Branch: `main` / carpeta `/ (root)` → Save**.
