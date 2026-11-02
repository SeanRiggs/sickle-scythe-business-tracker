# Sickle & Scythe Business Tracker

A browser-based tracker for inventory, purchase orders, sales, payments, customer credits, expenses and warranties. Built for everyday work on a phone or computer, with a public application shell and private business records.

**v5.4.3 candidate:** clearer purchase orders, traceable warranty-credit allocations, direct actions in customer profiles, and decimal payment entry. v5.4.2 supplies partial returns and direct search actions.

## What it does

- Receive purchase orders in parts and track stock adjustments with reasons.
- Record sales/payments together and retain overpayments as customer credit.
- Edit or void payments with an audit trail; apply credits or record refunds.
- Print invoices, payment receipts and customer statements or save them as PDFs.
- Track expenses, warranties and manufacturer credits.
- Review outstanding balances, low stock and records needing attention.
- Export accountant-friendly CSVs and download private backups.

## Get started

- **[Receive inventory bought with warranty credit](docs/PURCHASES-AND-WARRANTY-CREDITS.md)**
- **[Workflow review and improvement roadmap](docs/WORKFLOW-REVIEW.md)**

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

## Returns and direct search actions

Search by customer, invoice, payment reference, product, purchase order, expense, or warranty. Matching records offer their own actions: edit, record payment, return items, view payments, invoice/PDF, or receipt as appropriate. Voided records stay visible without active edit/return actions. Search shows up to 30 results; add an invoice ID or more detail to narrow a broad query.

For a full or partial return, select **Return items** on the invoice. Enter the quantity returned and the **agreed invoice reduction**; do not assume all units had the same effective price. Confirm the units are resellable (or never delivered), enter the actual return date and reason, review the balance and inventory preview, and confirm. Wait for **Saved with OneDrive** before switching devices.

Original sale quantity, price, date, invoice ID, and valid payments remain unchanged. Dated return records reduce the net invoice and net units sold and restore only the selected quantity to stock. Do not create an additional inventory adjustment for the same units. Previously voided sales remain voided; historical migrations and repairs are never rerun.

A return that exceeds the unpaid balance releases the excess payment as customer credit. The operator must explicitly choose **Hold credit for this customer**. No cash payment or refund is created. Existing Manage Credit actions can apply that credit or record a refund separately when appropriate.

**Return history** shows each return and can reverse an incorrect entry with a reason. Reversal deducts that quantity from stock and restores the amount to the invoice. If the resulting credit has already been applied or refunded, reverse the affected credit movement first. Original invoices with return history cannot be edited or wholly voided through the older correction path.

Reports apply reductions on the actual return date. All-Time totals include undated original sales; no historical dates are invented. Net units/revenue in a period can be negative when returns relate to older sales. Invoice counts remain separate from net units. Sales CSV shows original and net figures; Returns CSV supplies the individual dated entries. Cost estimates retain the existing weighted-cost model, not FIFO.

This workflow handles resellable returns and undelivered units. Damaged/missing stock needs separate review. A correction already made by editing an invoice must not also be entered as a new return. The release does not alter any production record automatically.
