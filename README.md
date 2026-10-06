# Onyx Studios

Website for Cameron McCann's independent web design and development studio in Buffalo, NY.

Built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Local development

Install Node.js and npm, then run:

```sh
npm ci
npm run dev
```

Vite serves the site at http://localhost:5173 by default.

## Production build

```sh
npm run build
npm run preview
```

The production output is in `dist/`.

## Contact and booking

- Personal portfolio: https://cwmccann.pro
- Email: cwm@cwmccann.pro
- Project booking: https://cal.com/cameron-mccann-9prmcz/cwmccann

Shared contact details live in `src/data.ts`. The Cal.com embed and its colors are configured in `index.html`.

## Cloudflare Workers deployment

Live site: https://onyx.cwmccann.pro

Log in to the Cloudflare account that owns `cwmccann.pro`, then deploy:

```sh
npx wrangler login
npm run deploy
```

The deploy command builds the site and uploads `dist/` to the `onyx-studios` Worker. `wrangler.jsonc` configures the custom domain and single-page application routing.

To validate the build and Worker configuration:

```sh
npm run deploy:check
```
