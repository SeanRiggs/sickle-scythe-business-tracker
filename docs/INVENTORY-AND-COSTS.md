# Follow stock and its costs

These workflows are available in v5.5. Check the app version before following them. They use existing records; opening the app does not rewrite old inventory, warranty or financial entries.

## See where stock went

Choose **Products → Inventory history**, or search for the product and choose **Inventory history**. The history combines:

- Stock received against purchase orders.
- Original sales and individual customer returns.
- Warranty replacements sent from inventory.
- Supplier-direct replacements, shown with zero local stock effect.
- Manual adjustments, including reversed entries.

Every movement has **Open record** to reach its invoice, order, claim or adjustment. The sum of active stock effects matches current on-hand stock. Reversed/voided entries remain visible with zero active effect. Export history CSV if you need a private reconciliation file.

New receipts record the actual arrival date and quantities. Earlier received quantities remain in an undated receipt row. Expected arrival is not treated as an actual receipt date. Earlier replacement flags keep their original stock deduction but have no invented shipment date. The view is a reconciliation of current records, not a historical running balance or a replacement for the before/after audit log.

For a resellable customer return, use **Return items** on the original invoice. Do not also record an adjustment. Warranty replacements belong on the claim. Manual adjustments cover losses, damage, demos and other physical count changes; they require a reason and explanation.

## Send a replacement independently of approval

1. Create or open the warranty claim. Its **Manufacturer approval** describes the credit/claim process only.
2. Choose **Record replacement sent**.
3. Enter the quantity actually sent and actual date. Partial replacement shipments are supported up to the claim quantity.
4. Choose **My inventory** or **Supplier shipped directly**. Only My inventory deducts local stock.
5. Confirm the product cost per unit and shipping paid by this business. Inventory supplies a weighted-cost estimate; supplier-direct starts at zero, which you must change if you incurred a product cost.
6. If a cost is already recorded in Expenses, select that expense under its cost treatment. Otherwise leave **Count this cost here**.
7. Enter a note, review the stock effect, save, and wait for OneDrive confirmation.

Changing approval to Approved, Denied, Credit Pending or Closed never sends or reverses a replacement. Older “Replacement Sent” statuses can be retained until approval is clarified; the app does not infer a shipment from the text alone.

**Reverse incorrect entry** is for an entry made by mistake, not for a physical customer return. It retains the original event and reason, restores any stock it deducted, and removes its separately recorded costs. Any linked expense remains saved. Record the correct replacement again if necessary. Claims with replacement or reviewed cost history are retained; use Closed rather than voiding away that history. Older replacement flags are preserved and cannot be silently reversed by changing status.

## Read the profit estimate

The operational estimate is:

Revenue after returns − estimated cost of sold units − saved expenses − separately recorded warranty product/shipping costs − separately recorded stock-loss/non-sale-use costs.

This is not FIFO, tax reporting or full accounting. Sales use current weighted landed costs; those estimates can change when purchase costs change. New replacement and adjustment costs use the amount confirmed when recorded. Positive stock adjustments do not create profit. Approved manufacturer credit is not counted as income: applying it to a purchase already reduces landed cost.

A cost linked to an expense is counted only through that expense. Several cost components may share an expense only up to its saved amount. Editing or voiding an expense cannot leave those links unfunded. Review the linked costs first; if a new replacement entry was incorrect, reverse and re-record it with the correct cost treatment. The app cannot detect the same cost entered independently without a link.

**Costs beyond sales** shows the breakdown and source-record actions. The CSV contains the cost amount, date, source record and linked expense ID. Keep this and all business exports private.

## Review earlier costs without changing stock

Earlier replacement costs can be ambiguous: a stored amount may have been per unit, total, estimated, or already included in Expenses. Earlier stock deductions may have no cost at all. The app does not guess. Profit stays **provisional** while these entries await review, and unreviewed amounts are not yet deducted.

Choose **Reports → Review costs** or open the warning in **Data Health**. Confirm the actual total, date if known, cost treatment and explanation. Enter zero only when no additional cost was incurred, or another confirmed movement already counts it; explain your decision. A saved cost review can be revised with an audit trail. This does not change inventory quantities or overwrite the original legacy cost fields.

All Time includes confirmed costs with unknown dates. Month/year reports exclude undated separately recorded costs. Linked costs follow their expense's date. Do not substitute a claim date, expected arrival or today's date for an unknown historical cost date. PO shipping already included in landed cost should not also be entered as an unrelated expense.

## Open the exact warning

Data Health opens the identified invoice, payment, purchase order, product history or adjustment. Customer overpayments remain normal credit balances, not data errors.

Needs Review uses a saved record ID or one unique source-row match. If an older warning has no unique link, **Choose the record to review** requires an explicit record selection and reason. Saving that link does not change money, quantity or dates. Reopen **Edit & Resolve** to make the actual correction. Quantity warnings edit quantity; purchase-date warnings edit actual purchase date, never ETA. Date-only corrections are available from invoice details even on paid invoices.

Unlinked payments open their exact payment details for investigation; this release does not automatically reassign them. Never select an unrelated invoice just to make a warning disappear. Keep Unknown and Ignore preserve the decision in History.
