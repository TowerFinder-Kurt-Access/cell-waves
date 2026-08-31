# Contributing

Please discuss changes via issue or discussion before opening a PR.

## Development

1. Fork this repository (button at top right).

2. Clone:

```bash
git clone https://github.com/TowerFinder-Kurt-Access/cell-waves.git
cd cell-waves
```

3. Install dependencies (Bun required, `node >=22.12.0`):

```bash
bun install
```

4. Start dev server:

```bash
bun run dev
```

5. Build and verify before PR:

```bash
bun run build
bun run lint
bun run typecheck
```

See `AGENTS.md` for full verification checklist.

## Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/) as enforced in `AGENTS.md`:

Format: `type(scope): description`

- One module per commit, no `Co-Authored-By`, no `--no-verify`.
- Allowed types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `ci`, `style`, `perf`

E.g. `feat(ui): add avatar prop` or `fix(calendar): handle null date`

See `AGENTS.md` for scope rules.

## Pull Requests

- Link related issue (`Fixes #123`).
- Keep diff small and reviewable.
- Fill out `.github/PULL_REQUEST_TEMPLATE.md` sections.
- Ensure `bun run build` passes with no new warnings.
