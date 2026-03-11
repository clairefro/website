---
title: Free, private social media with Obsidian and Dropbox
published: '2026-03-02'
tags:
  - privacy
---

## Skippable backstory

My husband and I are separated by an ocean, opposite time zones, visa bureaucracy, five no-fly zones and possibly WWIII while we anticipate the arrival of our first child. It's been challenging and sometimes feels like threading a needle in a hurricane. But we're staying grateful and making the best of it.

We both love philosophy and literature. Near the end of his time in the US he boxed up a quarter-ton of his books and sent them from New York to India by cargo ship (they made it). Writings make frequent appearances in our calls and texts, and tend to get lost upstream our river of messages.

This Valentine's Day I wanted to gift him something special from afar that could help us stay close.

## A private, digital shared space

I ended up using free (I'm cheap\*) tools Obsidian and Dropbox to piece together a private, digital "third space" for us to asynchronously meet, curate and discuss our shared library from anywhere.

<img src="/assets/2025-02-26-selections-recent-activity.png" alt="selections" />

We named the shared space "selections", after the beloved [Select Book Shop](https://www.google.com/maps/place/Select+Book+Shop/@12.980428,77.5540753,13.62z/data=!4m10!1m2!2m1!1sselect+bookshop!3m6!1s0x3bae167dfe7700f7:0x9bd34e255a534b8c!8m2!3d12.97355!4d77.6079266!15sCg9zZWxlY3QgYm9va3Nob3BaESIPc2VsZWN0IGJvb2tzaG9wkgEKYm9va19zdG9yZZoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQydzVWbUZXUmtsWFZFSjBUbGhvTlZKSFduaFRWbXhYVlZSb1QweFhZeEFC4AEA-gEECHEQQw!16s%2Fg%2F1tg7_xvw?entry=ttu&g_ep=EgoyMDI2MDIyMy4wIKXMDSoASAFQAw%3D%3D).

The space includes a virtual bookshelf of writings we've recently discussed, the thinkers behind them, and our commentary, synced in near real-time with end-to-end encryption and no cargo ships.

<img src="/assets/2025-02-26-selections-bookshelf.png" alt="selections bookshelf" />

It's easy to access from any device - a laptop at home or a phone on the go. This virtual hangout space turned out to be a great connector for us.

I thought others might enjoy learning how to set up their own private, free digital gathering space for a handful of friends.

## Why Obsidian and Dropbox?

At first I started building an app from scratch, hosted on a Raspberry Pi and using Tailscale tunneling for privacy.

Halfway through I realized it was overkill and switched to Obsidian to take advantage of its powerful features:

- [Obsidian Bases](https://help.obsidian.md/bases) - turns notes into a dynamic database
- wikilinks
- sync
- cross-device compatibility

I ditched the Raspberry Pi in favor of free cloud storage (Dropbox) with the Remotely Sync plugin, which encrypts data in transit and at rest, and doesn’t require much technical know-how for users to connect.

> Sidenote - Obsidian has a wonderful (paid) feature that enables [collaboration on shared vaults](https://help.obsidian.md/sync/collaborate) for up to 20 users, with E2E encryption, version history, and merge conflict resolution. I recommend that if you can afford $4 per user per month.
>
> If you want my hacky free solution, proceed.

---

# Setup

<img src="/assets/2025-02-26-diagram.png" alt="system diagram" />

## What you'll need

Everything is free!

- [Obsidian](https://obsidian.md/)
- [Obsidian plugin: "Remotely Sync"](https://obsidian.md/plugins?search=remotely%20sync)
- [Dropbox](https://www.dropbox.com/) (free account = 2GB storage)

## 1. Setup storage

1.  Create a free [Dropbox](https://www.dropbox.com/plans) account

They make the free plan a little hard to find - scroll down.

> Note: your Dropbox account credentials will need to be shared with anyone you invite to your private digital gathering space in order for them to sync.
>
> I recommend using email + password signup instead of OAuth, and preferrably with a valid alt email.

## 2. Create an empty Obsidian Vault

_If you're new to Obsidian, a "vault" is just a folder on your computer, with some special hidden files Obsidian adds to enhance your experience._

I recommend starting this on a computer, as opposed to a phone. You can sync to mobile later if you like.

1. Install [Obsidian](https://obsidian.md/download)
2. In Obsidian, create a new **local vault**, wherever you like on your computer, and give it a name you'll share

<img src="/assets/2025-02-26-obsidian-create-vault.png" alt="Obsidian - create vault step 1" />

3. Enable community plugins (Settings > Community Plugins > Turn on Community Plugins)

Keep the vault empty and continue to the next step.

## 3. Setup sync

1. Install the "Remotely Sync" plugin (Settings > Community Plugins > Browse)
2. In the Remotely Sync plugin settings, configure as follows:

> a. Choose remote service > "Dropbox"
>
> b. Auth: `YOUR_DROPBOX_ACCOUNT_EMAIL` / `YOUR_DROPBOX_ACCOUNT_PASSWORD`
>
> c. Set an encryption password (jot this down!! you'll need to share it with friends)
>
> d. Enable "Syncing \_ files or folders" to ensure including underscored files
>
> e. Sync settings:
>
> - Run once on startup > after 10 seconds
> - Sync on save > after 5 secs
> - Schedule autorun > every 10 mins
> - (optional if you want reallllly real-timeish sync) On remote changes > every 1 min

## 4. Sync your first file

Test your Dropbox sync by creating a `_GUIDE.md` file for your friends in your Obsidian vault and pasting in the content below.

Replace the `CAPITAL_VALUES` with your values.

```md
## Connecting more devices

1. install Obsidian on phone/desktop
2. create EMPTY vault called YOUR_VAULT_NAME, store on device
3. install and enable "Remotely Sync" plugin
4. Remotely Sync Plugin settings: Choose remote service > "Dropbox"
5. Auth: YOUR_DROPBOX_ACCOUNT_EMAIL / YOUR_DROPBOX_ACCOUNT PASSWORD
6. Encryption password > PASSWORD_HINT
7. enable "Syncing \_ files or folders" to ensure including underscored files
8. Sync settings:
   1. Run once on startup > after 10 seconds
   2. Sync on save > after 5 secs
   3. Schedule autorun > every 10 mins
   4. (optional if you want reallllly real-timeish) On remote changes > every 1 min
```

You can include password hints if you dare.

Hopefully the sync automatically runs after you create and update this file. But just to be safe, run a manual sync by clicking the "Remotely Sync" icon in the left ribbon

<img src="/assets/2025-02-26-manual-sync.png" alt="Remote sync - manual sync" />

### Check Dropbox

Now head over to your Dropbox dashboard. The Remotely Sync plugin should have created a directory `"Apps" > "Remotely Secure"`

You should see a file inside with a ciphertext (scrambled) filename, and content which can't be read in the browser. That's a good sign - it means the encryption worked and your filename and content is relatively private.

<img src="/assets/2025-02-26-dropbox-encrypted.png" alt="Encrypted dropbox" />

## 5. (Optional) Set up a "Recent Activity" view in your vault

You could stop here and start sharing your synced vault with your friends. But to enhance the "social media" feel, I recommend adding a view to show recent activity so you know who is doing what lately.

The idea is someone can make a new note, tag it with their name like `#claire`, and it shows up as recent activity

<img src="/assets/2025-02-26-note-from-claire.png" alt="Note from Claire" />

<img src="/assets/2025-02-26-recent-activity-view.png" alt="Recent Activity view" />

1. Create a new Bases file in Obsidian (right click File explorer > New Base)
2. Name the Base `_recent_activity`
3. Configure the Base as below

### Add a formula property called "added by" (Properties > Add Formula)

Paste this formula, replacing the names to convert detected tags into display names. You can continue nesting any additional names you expect in the `if` statement.

```
if(file.tags.contains("jude"), "Jude", if(file.tags.contains("claire"), "Claire", ""))
```

<img src="/assets/2025-02-26-added-by.png" alt="Added by formula" />

> Note on formula validation: if you're new to Obsidian Bases formulas and not sure of the syntax, I recommend pasting the [docs](https://help.obsidian.md/formulas) URL into an LLM and asking it how to achieve what you want to do.

### Add a formula property called "modified" (Properties > Add Formula)

Make a human-readable modified at column. Use Obsidian's native `.relative()` method

```
file.mtime.relative()
```

<img src="/assets/2025-02-26-modified.png" alt="Modified formula" />

### Sort by "modified time"

To float recent activity to the top, sort by "modified time" > "New to Old"

<img src="/assets/2025-02-26-sort-by-modified.png" alt="Sort by modified time" />

### Show relavant properties

Ensure Properties `file name`, `added by`, `modified` are selected in your view. You can drag the columns to desired order

<img src="/assets/2025-02-26-recent-activity-view-properties.png" alt="Recent activity view - select properties" />

## 6. Invite your friends

Invite your friends to join your shared vault by privately sharing the connection instructions in Step 4

## 7. (Optional) Create backups

If you'd like, create automated local backups (unencrypted) of your shared Vault. I recommend the Obsidian plugin [Local Backup](https://obsidian.md/plugins?search=local%20backup).

This is especially useful in case everyone forgets the encryption password and gets locked out of your precious space. It also enables you to migrate from Dropbox anytime.

## 8. (Optional) Go crazy

The world is really your oyster in terms of how you want to use your shared space. Play around with [Bases views](https://help.obsidian.md/bases), folder filters, [note properties](https://help.obsidian.md/properties) and [formulas](https://help.obsidian.md/bases/functions) to create custom experiences.

For example, we organized our vault into "selections" (artifacts of interest), "people" (authors, thinkers, etc), and "other stuff" (random thoughts and commentary). I love that we can wikilink references to eachother's notes with `[[]]` syntax. We use frontmatter [note properties](https://help.obsidian.md/properties) to create custom data attributes such as images that can be used in additional Bases views (like the virtual bookshelf cards view).

<img src="/assets/2025-02-26-frontmatter.png" alt="frontmatter example" />

The "Card" bases view allows displaying cover images

<img src="/assets/2025-02-26-bookshelf.png" alt="bookshelf view" />

## How secure is it?

I reviewed the [Remotely Sync plugin code](https://github.com/sboesen/remotely-sync) and rate its security as **Moderate (3/5)**: files are encrypted locally with AES‑GCM (key derivation uses PBKDF2 at 20,000 iterations) before uploading to Dropbox, but the encryption password is only weakly protected on your device and not stored using Obsidian’s new [SecretStorage](https://docs.obsidian.md/plugins/guides/secret-storage) feature (yet). This means anyone with access to your filesystem could potentially decrypt your notes remotely if they have access your Dropbox account. SecretStorage support in the plugin has been [requested](https://github.com/sboesen/remotely-sync/issues/148) but is not yet implemented.

## What about edit conflicts?

It's true that with this method you'll need to be careful about not stepping on eachother's toes. It's not much of a problem for us since we live in opposite waking hours, and tend to make our own notes with links for dialogue. But sync is pretty fast depending on your plugin config so it shouldn't be too much of a problem.

If you'd like hyper realtime collaboration to prevent conflicts, check out [this other tutorial](https://leduccc.medium.com/setup-self-hosted-synchronization-for-obsidian-cba121166d5e) for Obsidian + Raspberry Pi + CouchDB + LiveSync plugin setup, or consider upgrading to [Obsidian Team Sync](https://help.obsidian.md/teams/sync) which has merge conflict support and version history.

---

### _\*Note on my cheapness_

_I'm cheap, but a huge supporter of Obsidian and do already pay for Obsidian Sync for personal use. I'm also a [Catalyst donor](https://help.obsidian.md/catalyst), [plugin developer](https://obsidian.md/plugins?search=claire%20froelich), and annoying Obsidian evangelist._

_Obsidian is, in my view, everything software should be: excellently engineered, anti vendor-lock, privacy focused, free for what shouldn't be charged, a great deal for what you pay for, a useful tool for getting real-world shit done, 100% user-supported and loved by a generous community. Consider [supporting Obsidian](https://help.obsidian.md/financial-contributions)!_
