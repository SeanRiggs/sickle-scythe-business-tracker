# Backup, recovery and device changes

Use one editing device at a time. Wait for **Saved with OneDrive** before moving to another device. A code update does not require recreating your database.

## Before updating

Download a full JSON backup and, when connected, create a timestamped OneDrive backup. Keep both outside the repository. Note key totals and the installed version.

## Restore deliberately

1. Choose **Settings → Review backup to restore** and select a private JSON backup.
2. Compare record counts, saved date and whether settings differ. Selecting a file changes nothing.
3. Download and keep the current copy. Cancel if anything looks wrong.
4. Type **RESTORE** to replace records on this device. Audit history from both copies is retained; stable IDs and unknown fields are preserved.
5. Automatic cloud upload pauses. Review balances, credits, inventory, payments and settings.
6. To keep the restoration, choose **Upload reviewed restoration**. Normal cloud version checks apply. If OneDrive changed elsewhere, saving stops; there is no force-overwrite button.
7. To abandon it, keep a backup and choose **Discard restoration & load OneDrive**.

Restoring replaces record lists; it does not merge transactions. An older backup may omit later activity. Compare both copies before choosing.

## Conflict or failed sync

Download the local copy before clearing browser data or replacing records. Keep the OneDrive copy separately and compare them. **Use OneDrive Copy** explicitly replaces device records.

A 404 is not permission to recreate an existing business. Verify the Microsoft account, app registration and application folder. A rate limit, expired token or permission failure never triggers replacement.

## Accounts and devices

After a verified sync, the installation binds its cache to that Microsoft account. A different account is blocked before private file reads/writes. To switch intentionally, preserve a backup and clear this installation’s local copy first.

A legacy cache has no stored account ID. Its first upgrade can bind only after verified sync; confirm you signed in to the intended account.

Local data and tokens are not encrypted by this app. Sign-out is a workspace lock, not protection against someone with access to the browser profile. Downloaded backups contain the full private database.

Drafts survive navigation, rotation and sync rerenders in the same tab. They are not transactions and do not survive closing/reloading the tab. Save completed work deliberately.

Large attachments inside JSON can exhaust browser storage. Avoid using the tracker as a large document archive.
