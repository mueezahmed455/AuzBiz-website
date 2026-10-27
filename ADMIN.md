# AUZBIZ staff dashboard

The staff dashboard manages the public blog, group-tour galleries, and incoming
quote requests. It is a single-editor tool, not a multi-user CMS.

- Sign in: `/admin/login`
- Dashboard: `/dashboard`
- Public blog: `/blog`
- Public group tours: `/group-tours`

## Local setup

The repo already has a `.env.local` with a generated password and session secret.
Open that file to read the password. Do not commit it.

```bash
npm run dev
```

Then open <http://localhost:3000/admin/login>.

If `.env.local` is missing, create it with:

```dotenv
ADMIN_PASSWORD="choose-a-strong-password"
ADMIN_SESSION_SECRET="a-long-random-string"
```

Sessions last seven days and are signed with `ADMIN_SESSION_SECRET`. Changing
that secret signs everyone out.

## What each section does

| Section | What it does |
| --- | --- |
| Overview | Counts, storage status, and links into the dashboard |
| Blog | Create, edit, publish, unpublish, and delete articles |
| Group tours | Create tours, upload a cover photo and up to 20 gallery photos |
| Inquiries | Quote requests submitted from the public site; update their status |
| Visas | Read-only view of `src/data/visas.ts` |

Drafts are hidden from the public site. Published posts and tours appear
immediately on `/blog`, `/group-tours`, and the homepage.

## Images

- Accepted: JPG, PNG, WebP, AVIF, GIF
- Maximum size: 8 MB per image
- Local development: saved to `public/uploads/`
- Production: saved to Vercel Blob under `auzbiz/uploads/`

Both `public/uploads/` and `.data/` are gitignored. Photos are content, not code.

## Where content is stored

### Local development

`.data/content.json` — plain JSON on this machine. The directory is gitignored.

### Production (Vercel)

Vercel's filesystem is ephemeral, so production needs a Vercel Blob store.

1. Create a Blob store in the Vercel project.
2. Set `BLOB_READ_WRITE_TOKEN` in the project environment.
3. Set `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` in the project environment.
4. Redeploy.

Content is saved to `auzbiz/site-content.json`. The file includes inquiry
details, so it is encrypted with AES-256-GCM before upload. The key is derived
from `ADMIN_SESSION_SECRET`. The blob URL is public, but the contents are
ciphertext.

**Keep `ADMIN_SESSION_SECRET` stable.** If it is changed, existing encrypted
content cannot be decrypted. Restore the old secret, or start a fresh content
file and re-enter the content.

If `BLOB_READ_WRITE_TOKEN` is missing on Vercel, the dashboard shows a storage
error and refuses to save. This is intentional: silently writing to an ephemeral
filesystem would lose the editor's work.

## Security notes

- One shared staff password; there are no individual accounts or roles.
- The session cookie is HTTP-only, SameSite=Lax, and Secure in production.
- Uploads require a valid admin session.
- Inquiry data is stored encrypted in Blob and is never rendered on public pages.
- There is no audit log or revision history. Deleting a post or tour is permanent.
- Change the password by updating `ADMIN_PASSWORD` in the environment and
  redeploying. To invalidate existing sessions immediately, also change
  `ADMIN_SESSION_SECRET` — but read the warning above about encrypted content.

## Troubleshooting

**"Admin access is not configured yet"** — `ADMIN_PASSWORD` is missing from the
running environment. Restart the dev server after editing `.env.local`.

**"Content storage is not configured for this deployment"** — the site is
running on Vercel without `BLOB_READ_WRITE_TOKEN`. Connect a Blob store.

**Upload fails** — check the file type and that it is under 8 MB. On Vercel,
also check that the Blob token is present and the store is writable.

**A save appears to work but the public page is stale** — public content pages
are rendered on demand. Hard-refresh once. If it still does not update, check
the dashboard overview for a storage error.

## Not included

- Scheduled publishing
- Multiple staff accounts or permissions
- Content revisions or restore
- A media library (each upload belongs to the post or tour being edited)
- Legal policy pages (`/privacy`, `/terms`, `/refund`) — these need real policy
  text reviewed by the business before publishing.
