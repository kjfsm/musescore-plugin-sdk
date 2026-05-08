# Changesets

This folder is configured by [changesets](https://github.com/changesets/changesets).

## Adding a changeset

When you make a change that should ship in a release, add a changeset:

```sh
pnpm changeset
```

Pick the affected packages, choose `patch` / `minor` / `major`, and write a short
summary. The CLI writes a markdown file under `.changeset/` — commit it together
with your change.

Private packages (`@musescore-sdk/types-generator`, `@musescore-sdk-examples/*`)
are skipped automatically.

## Releasing

The `Release` GitHub Action consumes the pending changesets:

- On `main`, it opens / updates a `Version Packages` PR that bumps versions and
  writes `CHANGELOG.md` entries (`changeset version`).
- When that PR is merged, the same workflow runs `changeset publish`, which
  publishes the affected public packages to npm and creates GitHub releases.

`NPM_TOKEN` must be configured as a repository secret.
