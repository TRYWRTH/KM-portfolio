# Working on this repo

## Deploying (Vercel has a daily deployment limit)

- Vercel deploys **only `main`** (see `git.deploymentEnabled` in `vercel.json`). Pushes to any other branch do not deploy.
- Commit and push work to the working branch as you go. That is the backup and costs no deployment.
- Update `main` **only when the user says "deploy" or "push to main"**, so many small changes go live in one deployment.
- Before updating `main`: run `npx next build` and check that it exits 0, then push as a fast-forward with `git push origin HEAD:main`.

## Copy rules

- Never end a big headline (page titles, section titles, the hero name) with a full stop.

## Where things live

See README.md. All copy is in `content/pl.ts`; photos are in `public/photos/`.
