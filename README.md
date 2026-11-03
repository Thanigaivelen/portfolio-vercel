# Thani — cinematic studio portfolio

A Nuxt 3 / Vue / Three.js portfolio with a handcrafted interactive developer studio.

## Run locally

Requires Node.js 22.17 or newer for the geometry tests.

```sh
npm install
npm run dev
```

Open the local URL printed by Nuxt. For an explicit port on Windows:

```sh
node node_modules/@nuxt/cli/bin/nuxi.mjs dev --host 127.0.0.1 --port 3001
```

## Verify

```sh
npm test
npm run build
```

The production build retains the existing Vercel Nitro preset. No deployment has been made.

## Main files

- `pages/index.vue`: page content, navigation, contact links and scene controls.
- `components/StudioScene.vue`: WebGL lifecycle, pointer interaction and accessibility fallback.
- `utils/buildStudio.ts`: procedural room geometry.
- `assets/css/global.css`: responsive visual design.
- `assets/css/fonts.css`: locally hosted fonts, with licenses in `public/fonts`.
- `tests/studio.test.mjs`: screen visibility/raycasting and geometry budget checks.

Drag the room to rotate it. Select either monitor to reach its project. Golden hour/moonlight and motion controls support keyboard operation. OS reduced-motion preferences disable idle animation. Normal page links remain usable without WebGL.

## Original project and preserved assets

This redesign lives at `C:\Users\thani\OneDrive\Documents\ChatGPT\portfolio`.

The original project remains at `C:\Users\thani\Downloads\my projects\portfolio\3D-Portfolio`.

Unused house models, sounds, and old project attachments from the working copy are retained in the ignored `legacy-assets/` folder, outside the public site. The old unused Vue components remain for reference. The new studio uses only procedural geometry and the selected project images.

Note: the original image filenames were reversed: `cos-theta.png` contains Pascal AI; `heypascal.png` contains Cos-theta. The new page and studio map them to the correct projects.

LinkedIn: https://www.linkedin.com/in/thanigaivelen06122002/
