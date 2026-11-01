# Sickle & Scythe Business Tracker — v5.3.1

A small-business inventory, sales, payment, receivables, warranty, and expense tracker. The static vanilla JavaScript PWA is hosted on GitHub Pages. Microsoft sign-in uses the existing OAuth Authorization Code + PKCE flow; the private OneDrive App Folder holds `business-data.json`. There is no client secret and no required application build framework.

**Production data remains private.** Tests use fictional records and mocked cloud responses. They do not access the production database or prove live Microsoft account behavior.

## Receipts and navigation in v5.3.1

Sales & Payments has a sticky shortcut bar for Record Sale, Invoices, and Payments & Receipts. Use View Payments on an invoice to find its receipts directly, or search payment history by customer, invoice, amount, or reference. Partner imports are collapsed until needed.

Customer receipts use a phone-friendly layout, omit internal payment notes and empty reference fields, and omit unavailable payment methods. Missing payment dates say Not recorded. Current invoice balances are labeled with an as-of timestamp; stored accounting snapshots remain unchanged. No historical dates, payment methods, or balances are reconstructed.

## Payment controls introduced in v5.3

- Full payment entry/editing for amount, date, method, reference, and notes; edits retain record IDs, unknown fields, and before/after audit details.
- Payments retain the full amount received. Excess remains invoice-backed customer credit. Credit transfers are paired and excluded from cash collected; refunds reduce net cash collected.
- Payment voiding requires a reason. Credit transfers reverse together. Reducing a payment that funded an already-used credit is blocked until the downstream transfer/refund is reversed. Ambiguous historical pairs require review, not guessed matching.
- Printable payment/refund/transfer records with branding and explicit void status. Historical balances are shown only when recorded; legacy receipts identify current balances without inventing past values.
- Obvious OneDrive warning and reconnect/retry/backup actions. Failed reads never create a replacement database. Saves compare the last confirmed cloud copy and send an `If-Match` precondition; conflicts stop automatic writes.
- Service-worker caching restricted to the app shell. External authentication, Graph requests, and business files are excluded.
- Floating Back to Top, quantity-based Units Sold, separate transaction counts, and separate A/R and customer-credit totals.
- Customer-specific historical repair commands removed from the shipped script. No historical repair or Excel migration is run.

## Safe use

OneDrive is authoritative; localStorage is an offline cache that can contain unsynced work. **Use one editing device/tab at a time. Wait for Cloud saved before switching devices.** This is not a multi-user accounting platform or a substitute for tested backups.

On first upgrade, if this device and OneDrive differ, v5.3 stops rather than picking a winner. Download the local backup, compare it with a separately obtained OneDrive backup, and reconcile deliberately. Use OneDrive Copy replaces the local copy only after confirmation and initiating a download; verify the downloaded file exists before proceeding. There is no automatic merge of conflicting databases.

The existing source stored a clamped payment amount in some cases. This release cannot reconstruct money discarded by an earlier version. Review original payment evidence and correct the saved payment manually; do not infer values from this release or rerun old repair logic.

Keep unknown historical dates blank. Internal credit transfers and customer refunds must use Manage Credit; they are not cash payment methods. Invoice changes with active payments require reversing/voiding those entries first to avoid silently moving or deleting balances.

Weighted landed cost remains an operational estimate, not FIFO. Cash collected is net external payments/refunds by payment date; internal credit transfers are excluded. Accounts receivable and customer credits are displayed separately, not netted across customers. Reports' period buttons filter financial KPIs; aging and the 12-month chart remain current/global views.

## Privacy

This project is primarily a privately operated business tool with a reusable public app shell. Visitors can read the source and load the interface; doing so does not grant access to the owner's OneDrive. Microsoft authorization grants access to the signed-in account's permitted OneDrive files. Business records and uploaded branding are loaded from private storage, not bundled into the site.

The browser's local cache also contains business information: use trusted devices and profiles. Anyone adapting the app must configure their own Microsoft app registration and redirect URI. Never add a client secret to this browser application.


Public GitHub contains source, assets, documentation, and fictional test code only. Never upload business databases, backups, completed partner CSVs, customer attachments, receipts, invoices, or accountant exports. The partner template is header-only.

Removing sensitive files or repair code from a new release does not remove their contents from Git history or previously downloaded releases. Any historical exposure requires a separate owner-approved review and cleanup. Do not paste production data into issues or test reports.

## Preview without production data

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://localhost:8000/ using an isolated browser profile. Do not sign into production from a development preview. The registered Microsoft redirect URI remains the production GitHub Pages URL.

## Validation

```sh
node --check tracker-v531.js
node --check service-worker.js
node --test tests/*.test.cjs
npm install --no-save --package-lock=false playwright@1.62.1
npx playwright install chromium
node tests/browser.cjs
python3 scripts/package_release.py
```

The workflow tests fictional data and desktop/phone browser layouts. It has no deployment step or access to repository secrets. See [release acceptance and deployment instructions](docs/V5.3.1-ACCEPTANCE.md).

The existing [LICENSE](LICENSE) is unchanged.
