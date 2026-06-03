# DB Strategy Plan (formerly: SQLite Migration)

## Status: BLOCKED — Decision Needed Before Execution

The original plan assumed we could run SQLite on Laravel Cloud with a persistent volume. **Laravel Cloud does not support SQLite in production.** From [cloud.laravel.com/docs/knowledge-base/sqlite](https://cloud.laravel.com/docs/knowledge-base/sqlite), verbatim:

> "[SQLite] is not supported in Laravel Cloud production environments… Laravel Cloud environments are ephemeral, meaning the filesystem resets across deployments, reboots, and infrastructure migrations… any changes are lost whenever your application is redeployed, hibernates and wakes, or is moved between hosts."

There is no persistent volume option on any Laravel Cloud plan (verified: Starter plan offers no attached persistent storage; only managed Postgres / MySQL / KV / object storage are persistent).

Pick one of the four paths below before executing any steps further down. The "Local Migration" + "SQLite Tuning" sections still apply to Paths A and C (those paths keep SQLite locally).

---

## Path A — Laravel Serverless Postgres (Laravel Cloud's recommendation)

**What:** Use Laravel Cloud's managed Serverless Postgres in production. Keep SQLite locally for dev (fast, zero-install, matches the test environment).

**Cost on Starter plan:** $0 monthly fee. Postgres storage ~$0.50/mo. Compute is hibernation-based — Inga's low-traffic site spends most of its life asleep, so compute cost is near zero. Realistic total: under $2/mo.

**Pros:**
- Officially supported, zero friction with Laravel Cloud.
- Persistent across deploys, hibernates idle, fully managed (backups, scaling).
- Local stays SQLite (fast tests, no docker, no MySQL service).

**Cons:**
- Dialect drift: local SQLite vs prod Postgres. Mitigation: app uses zero raw SQL today — only Eloquent — so risk is low. CI could run tests against Postgres as a guard if needed.
- One-time provisioning step in Laravel Cloud dashboard.

**Work required:**
- Provision Serverless Postgres in Laravel Cloud dashboard, copy connection vars into LC env.
- Set production `DB_CONNECTION=pgsql` + `DB_HOST` / `DB_PORT` / `DB_DATABASE` / `DB_USERNAME` / `DB_PASSWORD` from the provisioned instance.
- Verify all migrations run on Postgres (`page_sections.settings` `json` column becomes `jsonb` — Eloquent's `array` cast handles both transparently).
- Update README deployment section.
- Locally: still switch from MySQL → SQLite per the "Local Migration" section below.

---

## Path B — Laravel MySQL

**What:** Use Laravel Cloud's managed MySQL in both local and prod. Skip SQLite entirely.

**Cost on Starter plan:** MySQL on Laravel Cloud does **not** support hibernation — always-on compute. Higher monthly floor than Postgres (specifics not on the Starter pricing page; need to check the MySQL pricing doc).

**Pros:**
- Zero dialect change from current local MySQL setup.
- No migration of existing dev data.
- Familiar.

**Cons:**
- Most expensive of the four paths (always-on compute).
- Defeats the original motivation (free hosting + drop MySQL dependency).
- Still need local MySQL service running.

**Work required:**
- Provision Laravel MySQL in Laravel Cloud dashboard.
- Set production env vars from the provisioned instance.
- Update README.
- No local change needed.

---

## Path C — SQLite + Litestream Sidecar

**What:** Push SQLite to Laravel Cloud anyway, run [Litestream](https://litestream.io/) as a sidecar process that continuously streams the SQLite WAL to an S3-compatible bucket (Cloudflare R2 has a free tier). On boot, Litestream restores the latest snapshot before the app starts.

**Cost:** Cloudflare R2 free tier covers expected usage. Laravel Cloud Starter $0 fee.

**Pros:**
- Keeps SQLite end-to-end (local + prod identical).
- Survives container loss / hibernation wake.
- No SQL dialect change.

**Cons:**
- **Defies Laravel Cloud's official guidance** — may hit unexpected friction.
- Needs a writable path inside the container for SQLite to live during runtime — Laravel Cloud filesystem is ephemeral but writable in-process, so this works *while the container is up*, then Litestream restores on next boot. Verify before committing.
- Litestream restore-on-boot adds a few seconds to cold-start (compounds with hibernation wake delay).
- Extra moving parts: Litestream binary, R2 credentials, custom start command.

**Work required:**
- Stand up Cloudflare R2 bucket + access keys.
- Find a way to install Litestream binary on the Laravel Cloud container (Dockerfile? Build hook? Confirm what Laravel Cloud supports.)
- Custom start command: `litestream restore -if-replica-exists -o /writable-path/database.sqlite ${REPLICA_URL} && litestream replicate -exec "php artisan serve"` (rough shape — needs research).
- Test that hibernation wake correctly restores the latest replica.

---

## Path D — Move Host Off Laravel Cloud

**What:** Pick a host that natively supports persistent SQLite — [Fly.io with volumes](https://fly.io/docs/laravel/database-guides/laravel-sqlite/), Railway, or a $5/mo VPS (Hetzner / DigitalOcean / Linode).

**Cost:** Fly.io free allowances cover this size of site. Railway has a small free tier then pay-per-use. VPS is fixed ~$5/mo.

**Pros:**
- Keeps SQLite plan as-is, no DB strategy change.
- Volume-based persistence is rock solid on Fly.io.

**Cons:**
- Loses Laravel Cloud's git-push deploy ergonomics.
- More ops work (Dockerfile, deploy pipeline, env management on a new platform).
- Inga already has Laravel Cloud set up and billing configured.

**Work required:**
- Pick the host, sign up.
- Write Dockerfile (Fly.io provides Laravel template) or set up deploy on chosen platform.
- Migrate domain DNS.
- Tear down Laravel Cloud setup.

---

## Recommendation

Path A (Serverless Postgres) is the lowest-friction path with the best long-term cost on the Starter plan. Path C (Litestream) is the most aligned with the original intent but pushes against the platform. Path B is the safest fallback but most expensive. Path D only makes sense if you'd rather change host than DB.

---

## Goal (Original)

Move the primary database from MySQL to SQLite for both local dev and Laravel Cloud production. The motivation was free hosting on Laravel Cloud (no managed DB needed) and removing a dev-environment dependency.

The "free hosting" half is preserved by Laravel Cloud's Starter plan no matter which path we pick. The "SQLite everywhere" half is only achievable via Paths C or D.

## Current State (verified — actual local `.env`)

The local `.env` file at the project root is the source of truth for what's running on your machine. Verified contents:

- `DB_CONNECTION=mysql`, `DB_HOST=127.0.0.1`, `DB_PORT=3306`, `DB_DATABASE=peterson_coaching`, `DB_USERNAME=root`, `DB_PASSWORD=` (empty) — **local dev is running MySQL right now.**
- `SESSION_DRIVER=file` — already file-based, no DB-session writes happening.
- `CACHE_STORE=file` — already file-based, no DB-cache writes happening.
- `QUEUE_CONNECTION=database` — uses the MySQL DB for the `jobs` table (this app has no queued jobs today, so the table is empty).

The `.env.example` (template checked into git) differs from your real `.env`: it defaults to `DB_CONNECTION=sqlite` and `SESSION_DRIVER=database` / `CACHE_STORE=database`. That template is what a new developer cloning the repo would see; it's not what your dev environment is actually using.

Other facts about the codebase relevant to the migration (independent of `.env`):

- `config/database.php` has the SQLite, MySQL, and Postgres connections all pre-configured. SQLite has `foreign_key_constraints` defaulted to true; `busy_timeout`, `journal_mode`, `synchronous` are null and could be tuned.
- `phpunit.xml` pins tests to `DB_CONNECTION=sqlite` + `DB_DATABASE=:memory:`. Tests have been running on SQLite the entire time.
- No MySQL-specific code anywhere: zero `DB::raw`, zero MySQL-only functions (`GROUP_CONCAT`, `DATE_FORMAT`, etc.), no `whereJsonContains` / `whereJsonLength` calls, no `->enum()` columns, no `->fullText()`, no `->change()` / `->after()` quirks. **This means a swap to either SQLite or Postgres carries the same low risk.**
- Models use standard casts only (`array`, `boolean`, `datetime`). `PageSection::settings` is `array`-cast over a `json` column — works in SQLite (JSON1), Postgres (`jsonb`), and MySQL.
- README documents Laravel Cloud SQLite deployment (lines 78–96) with `DB_DATABASE=/tmp/database.sqlite` — needs rewrite once a path is chosen (the /tmp guidance is broken regardless: ephemeral on every plan).

## Local Migration to SQLite (applies to Paths A, C, D)

Your local `.env` currently runs MySQL on a `peterson_coaching` DB. The data in there is just seed data (already in `database/seeders/` and `fallback.json`), so a fresh re-seed against SQLite loses nothing.

Steps:

- [ ] Stop local MySQL service (optional but encouraged — no longer needed).
- [ ] Edit local `.env`:
  - `DB_CONNECTION=sqlite`
  - `DB_DATABASE=database/database.sqlite` (Laravel's default — relative to project root)
  - Comment out / remove `DB_HOST`, `DB_PORT`, the existing `DB_DATABASE=peterson_coaching` line, `DB_USERNAME`, `DB_PASSWORD`.
  - Optional: change `QUEUE_CONNECTION=database` → `QUEUE_CONNECTION=sync` to keep the new sqlite file free of an unused `jobs` table.
- [ ] `touch database/database.sqlite`
- [ ] `php artisan migrate:fresh --seed` (drops everything in the new sqlite file, runs all migrations + `DatabaseSeeder` + `DevDatabaseSeeder`).
- [ ] Verify `database/database.sqlite` is in `.gitignore` (Laravel default ships with it ignored — confirm).
- [ ] Smoke test: `php artisan serve` + load `/`, `/packages`, `/contact` — confirm content renders identically to the MySQL version.
- [ ] Run full test suite: `php artisan test --compact`.

## SQLite Tuning (`config/database.php`) — applies to Paths A, C, D

The defaults work, but two small additions improve write reliability under any concurrency:

- [ ] Set `busy_timeout` to `5000` (5s) — prevents `SQLITE_BUSY` errors if two writes race.
- [ ] Set `journal_mode` to `WAL` — write-ahead log allows readers to proceed during a write.
- [ ] Leave `synchronous` at `NORMAL` (the WAL default).
- [ ] Foreign key constraints: leave `true` (already the Laravel default).

Edit target: `config/database.php` `connections.sqlite`. Set via either direct config values or `.env` vars (`DB_BUSY_TIMEOUT=5000`, `DB_JOURNAL_MODE=WAL`).

## Service Driver Settings (cache / queue / session) — applies to all paths

Your local `.env` already has `SESSION_DRIVER=file` and `CACHE_STORE=file`, which is correct. `QUEUE_CONNECTION=database` is currently pointed at MySQL — needs revisiting depending on chosen path:

- [ ] `SESSION_DRIVER=cookie` (recommended for Laravel Cloud prod) — survives container restarts, no DB writes per request. Locally `file` is fine.
- [ ] `CACHE_STORE=file` — already correct locally; same for Laravel Cloud (cache files are non-critical, fine to regenerate after redeploy).
- [ ] `QUEUE_CONNECTION=sync` — this app has no background jobs that need queueing today; everything runs in-request. Drop the `database` driver to avoid a stray `jobs` table.

## Files Changed (will firm up after path is picked)

```
.env                          (local — switch DB_* vars, optionally tweak QUEUE_CONNECTION)
.env.example                  (already sqlite-friendly, no change for Path A/C/D)
config/database.php           (sqlite tuning if Paths A/C/D)
README.md                     (deployment section — rewrite for chosen path)
.gitignore                    (verify database/database.sqlite is ignored)
```

Path B adds prod MySQL env vars only. Path C adds Dockerfile / start-script changes for Litestream. Path D adds a new host's deploy config + tear-down of Laravel Cloud.

## Verification (path-agnostic)

After local switch (any path):
1. `php artisan migrate:fresh --seed` runs clean.
2. `php artisan test --compact` — full suite green.
3. `php artisan serve` — visit `/`, `/about`, `/packages`, `/testimonials`, `/contact` — content renders identically to the MySQL version.
4. Submit the contact form — confirm the email sends + the row lands in the DB.

After production deploy (any path):
1. Visit the live URL, click through all pages, submit a test contact.
2. Trigger a redeploy and confirm content persists (don't re-seed).
3. If hibernation applies (Postgres, Litestream): wait for the app to hibernate, hit it again, confirm wake-up + data intact.

## Open Questions

- **Path selection.** Pending user decision.
- Confirm Laravel MySQL pricing on Starter plan if leaning toward Path B.
- If Path C: confirm Laravel Cloud allows Litestream installation (Dockerfile? Build hook? Custom start command?).
- If Path D: confirm Fly.io / chosen host's persistent volume cost on equivalent free / cheap tier.