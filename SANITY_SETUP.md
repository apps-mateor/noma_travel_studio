# Admin del sitio (Sanity) — pasos para activarlo

El admin vive en **`/admin`** (ej: `https://tusitio.com/admin`). Cada sección de la
home es una "zona" fija que se puede editar pero no borrar. Si el CMS no está
configurado o una sección está vacía, el sitio usa los textos por defecto del código.

## 1. Crear el proyecto en Sanity (una sola vez)

```bash
# en la carpeta del repo
npx sanity@latest init --bare
```

Iniciá sesión (Google funciona) y creá el proyecto — anotá el **projectId**.
Dataset: `production`.

## 2. Variables de entorno

Crear `.env.local` en la raíz:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=<el projectId>
NEXT_PUBLIC_SANITY_DATASET=production
```

Y cargar las mismas dos variables en **Vercel** (Settings → Environment Variables)
y redeployar.

## 3. Permitir el dominio (CORS)

```bash
npx sanity cors add http://localhost:3000 --credentials
npx sanity cors add https://<tu-dominio-en-vercel> --credentials
```

## 4. Cargar el contenido actual (opcional pero recomendado)

Crear un token con permiso **Editor** en [sanity.io/manage](https://sanity.io/manage)
→ API → Tokens, y correr:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=<projectId> SANITY_WRITE_TOKEN=<token> node scripts/seed-cms.mjs
```

Así el admin arranca con todos los textos actuales pre-cargados.
⚠️ Correrlo una sola vez: si se repite, pisa lo editado en el admin.

## 5. Invitar a quien va a editar

En [sanity.io/manage](https://sanity.io/manage) → Members → Invite, con rol
**Editor**. Esa persona entra a `/admin` con su cuenta y ya puede editar.

## Cómo se refresca el sitio

La home se regenera como máximo cada 60 segundos (`revalidate = 60`), así que
los cambios publicados en el admin aparecen solos en ~1 minuto, sin deploy.
