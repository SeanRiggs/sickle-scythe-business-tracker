# Sickle & Scythe Business Tracker

A browser-based tracker for inventory, purchase orders, sales, payments, customer credits, expenses and warranties. Built for everyday work on a phone or computer, with a public application shell and private business records.

**v5.4.1 candidate:** direct unpaid returns and cancellations from Receivables, customer invoices, and Sales. The v5.4 mobile workspace, private OneDrive connection, and guarded backup recovery are retained.

## What it does

- Receive purchase orders in parts and track stock adjustments with reasons.
- Record sales/payments together and retain overpayments as customer credit.
- Edit or void payments with an audit trail; apply credits or record refunds.
- Print invoices, payment receipts and customer statements or save them as PDFs.
- Track expenses, warranties and manufacturer credits.
- Review outstanding balances, low stock and records needing attention.
- Export accountant-friendly CSVs and download private backups.

## Get started

- **[Set up your own local or OneDrive installation](docs/SETUP.md)**
- **[Back up, restore and switch devices safely](docs/RECOVERY.md)**
- **[Test the v5.4 candidate](docs/V5.4-ACCEPTANCE.md)**

On a phone, use the bottom navigation for Dashboard, Sales & Payments and Customers; **More** opens other sections. In landscape, navigation moves beside the workspace.

Start with products and business identity. For a sale, choose the customer/product, enter quantity and price, then optionally record payment. The preview shows the balance and credit before saving. For an existing receipt, choose **Sales & Payments → Payments & Receipts** and search by customer, invoice or reference.

Drafts remain while rotating or navigating within the tab. Save deliberately; closing/reloading the tab loses unsaved drafts.

## Public code, private records

The app is static HTML/CSS/JavaScript. Microsoft sign-in uses Authorization Code + PKCE; no client secret belongs in the app.

With OneDrive enabled, business-data.json lives in your private Microsoft application folder. The browser keeps an offline cache. Wait for **Saved with OneDrive** before switching editing devices.

Local-only mode provides explicit setup and manual backups, with no automatic cross-device sync.

**Never commit databases, backups, completed CSVs, receipts, invoices, customer screenshots or attachments.** This repository contains code, generic documentation, blank templates and fictional tests.

## Scope and limitations

- Weighted landed-cost estimates, not FIFO or complete accounting software.
- One editing device at a time; no roles or automatic conflict merging.
- Unknown dates remain unknown. Units sold sum quantities; transactions count invoices.
- Restoring replaces records deliberately; cloud upload is a separate guarded action.
- JSON attachments suit modest files, not large archives.
- Offline app-shell use is supported; cloud sync needs connectivity.
- A public shell does not make OneDrive data public or encrypt browser caches.
- Free setup depends on account eligibility, quotas and hosting terms. GitHub Pages restricts some commercial uses; read the setup guide before choosing a host.
- Fresh-account setup and work/school behavior need verification with your own registration.

## Contribute

Start from the current source. Preserve stable IDs, unknown database fields, audit history and backward compatibility. Include fictional regression cases.

Accessibility, responsive layouts, clearer business language and validation improvements are welcome. Do not embed customer-specific fixes or rerun historical migrations. Keep screenshots and diagnostics free of private records.

Run the acceptance checks before opening a pull request. Explain changed behavior and remaining limitations.

See [LICENSE](LICENSE).

## Unpaid returns and cancelled sales

Open **Receivables**, find the invoice, and choose **Return / cancel sale**. The same action is available on customer invoices and in Sales & Payments.

The confirmation shows the balance being removed and the quantity restored to inventory. Confirm that **all units** are back in resellable stock (for example, an unopened return), or were never delivered, and enter a reason. Confirm once, then wait for **Saved with OneDrive** before switching devices.

The original sale is retained as voided with a dated reason and a before/after audit entry. It no longer contributes to receivables, revenue, or units sold. Inventory restores automatically; **do not also add an inventory adjustment** for the same return.

This shortcut handles full, unpaid returns only. An invoice with any active payment or credit movement opens a payment-review explanation instead; no money or inventory changes. Do not void a genuine payment simply to force a return through. Partial returns, refunds on paid sales, damaged returns, and missing stock require separate review and are not automated by this shortcut.
