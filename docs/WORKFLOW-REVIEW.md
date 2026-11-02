# Business workflow review — November 2026

The initial review used v5.4.2 at `981446c298dded214dcc7ea13732855aadeeb16b`. Purchasing improvements shipped in v5.4.3. The v5.5 candidate starts from deployed commit `c2b5a0ea446f9c0252e13303da77f8b656a1104b`. The original table below records the findings at that time; the update immediately below supersedes its completed roadmap items. This review uses public code, fictional records, automated checks and a signed-out live UI. It does not inspect or reconcile anyone's private OneDrive database.

## v5.5 candidate update

- Inventory history now connects received purchases, original sales, returns, replacements and adjustments, with exact source actions and audited adjustment/replacement reversals. Older receipt and shipment dates stay unknown.
- Data Health warnings open their exact record. Needs Review requires a unique verified match or explicit operator selection; quantity correction no longer uses a date editor. Purchase date remains separate from ETA.
- Manufacturer approval is independent of explicit dated replacement shipments. Supplier-direct shipments do not deduct local stock; existing legacy flags are preserved.
- Reports subtract confirmed warranty costs and inventory deductions, link to existing expenses to avoid double-counting, and mark the estimate provisional while older costs need review. This remains weighted operational accounting, not FIFO or a complete general ledger.

See [employee workflow instructions](INVENTORY-AND-COSTS.md) and [candidate verification](V5.5-ACCEPTANCE.md). Remaining work includes broader list filters, customer activity timelines, friendly audit summaries, fuller expense metadata and supplier-payment tracking. Hosting changes remain separate.

## Main conclusion

Keep the existing static app, Microsoft sign-in and private OneDrive model. The main opportunity is to connect the records around a job: a customer, invoice, payment, return, warranty claim and purchase order should lead to one another. More dashboards would not solve the extra navigation.

The most urgent findings concern supplier credits and clear money labels. Reproductions on v5.4.2 accepted $300 of warranty credit against a $200 order, resulting in a negative $100 cost. The order stored only the total credit, without claim links. It could not cancel an unreceived credited order through a guided release. The new-sale payment field also used whole-number browser validation, rejecting a payment of $20.50.

## Section-by-section review

| Workspace | Employee job and current friction | Improvement / status |
| --- | --- | --- |
| Dashboard | Decide what needs doing next. Counts open broad sections, sometimes requiring another search. | Keep the compact totals. Next: open the exact due/awaiting-stock/low-stock list with its filter already selected. |
| Products / inventory | Check stock, buy more, reconcile a count. The product card lacks a unified movement history. | Next: product detail with purchases received, net sales, returns, replacements and adjustments; each movement opens its source. Adjustment correction needs an audited reversal flow. |
| Purchase Orders | Enter supplier prices, use credit, receive stock. Credit availability and its source were invisible; calculated cost was labelled “Paid.” | **Candidate:** before-save breakdown; available/remaining credit; supplier reference; claim links; nonnegative order limit; manufacturer checks; exact release on cancellation of a new unreceived order. Use “Net order cost.” |
| Receivables | Take payment or resolve a returned item while looking at the balance. | v5.4.2 adds partial returns and search actions. Next: consistent invoice detail with payment, document and return actions, plus a customer statement shortcut. Keep debt and credit separate. |
| Sales & Payments | Record a sale and optional payment, then find a receipt. Large lists still take space. | **Candidate:** decimal payment input fix. Next: default to recent/open invoices, retain explicit All/Voided views, and allow safe metadata corrections on paid invoices without changing financial amounts. Multiple products per invoice remains a future schema-compatible enhancement. |
| Customers | Answer “what did they buy, pay, return or claim?” without changing sections. | **Candidate:** invoice/PDF, record payment, view payments, edit payment, receipt and claim-detail actions directly in the profile. Next: a unified chronological activity view and duplicate-name review; never silently merge customers. |
| Expenses | Record a receipt, vendor, amount and classification. Exports support fields that the normal editor does not expose. | Next: optional payment method, tax category, reference, notes and receipt state. Mark voided rows clearly. Avoid recording PO freight again as an expense if already included in landed cost. |
| Warranty | Issue a replacement, pursue manufacturer credit and see where it was used. | **Candidate:** linked claim/order detail. Next: separate replacement-stock confirmation from claim-processing status. At present stock is deducted only when `replacementSent` is true; selecting a later status does not prove replacement delivery. Default replacement cost also needs product-aware handling. |
| Reports | Understand performance for a chosen period. Summary totals are filtered, while product performance is all-time and balances are current. | **Candidate:** explicit panel time labels. Next: period-consistent views or a clearer “current position” section. Weighted cost estimates can change when purchase costs change. Warranty replacement costs, warranty shipping and stock losses are not fully represented in the net-profit formula; treat it as an operational estimate. |
| Needs Review | Resolve an ambiguous historical record. Some review actions are not specific enough. | Next: retain an explicit stable record ID when resolving. Current warranty matching can choose the first imported claim, and the generic editor primarily resolves dates even for quantity-related items. Review uncertain matches instead of guessing or inventing dates. |
| Data Health | Go directly to a record needing attention. Current Review buttons mostly open an entire section. | **Candidate:** friendlier “Items to review” language. Next: record-specific actions and separate informational customer credit from errors. Add unmatched credit/receiving checks. Never auto-repair financial data. |
| History | Explain a correction. Raw before/after objects are hard to read. | Next: short summaries such as “Payment changed from … to …,” actor/device context where available, with technical details collapsed. Preserve the existing complete history. |
| Settings / recovery | Know where data is saved, back up, recover safely. Similar backup labels repeat. | Next: group into “Sync,” “Backups,” “Business details,” and advanced setup. Explain local copy versus confirmed OneDrive copy. Keep explicit restore comparison and upload controls. |
| Search | Find a record and complete the task. Broad searches can exhaust the 30-result display before later record types. | v5.4.2 adds direct actions. **Candidate:** order details, claim details and supplier-reference/product matching. Next: type filters and exact-ID matches first. |

## Employee task walkthroughs

1. **Take an order:** customer → product → quantity/price → optional payment → review total/balance/credit → save → wait for OneDrive confirmation → invoice or receipt. A paid invoice's financial fields remain protected; a return is a separate event.
2. **Reconcile a return:** find invoice → Return items → selected quantity, agreed reduction, resellable condition, date and reason → preview → confirm. Preserve genuine payments; excess becomes explicitly held customer credit. Never also add a manual adjustment for the same returned units.
3. **Receive a credited purchase:** confirm approved warranty credit → purchase order at pre-credit prices → separate credit amount → review net cost and source claims → save → receive actual units → verify inventory and remaining credit. See the purchasing guide.
4. **Correct an unreceived purchase:** order details → Cancel order → reason → review credit release. New linked orders return credit to the same claims. Historical orders without claim links require reconciliation; the software does not infer those links.
5. **Answer a customer:** open profile or search → inspect invoice/payment/claim → act directly → generate the customer-facing document. Internal reasons and notes stay out of customer documents unless deliberately included in a suitable field.

## Phone and landscape direction

Preserve the current bottom navigation in portrait and side navigation in landscape. Use a compact record summary with one obvious next action and a More menu for secondary/destructive actions. Keep confirmation controls visible above the keyboard, pair short related inputs where readable, and keep the before-save outcome close to Save.

The candidate purchase preview shows costs in two columns, with claim details collapsed. Order attachments and secondary actions move into Order details. Do not replace business labels with implementation terms. Suggested language: “Record payment,” “Return items,” “Receive stock,” “Warranty credit available,” “Net order cost,” and “Items to review.”

## Test scope and boundaries

The baseline's 60 regression tests cover payments, credits, returns, storage conflicts and mocked cloud recovery. v5.4.3 adds purchasing/credit allocation, cancellation conservation, old-order compatibility, rollback, decimal inputs and record-action checks. Browser checks use fictional records in Chromium/WebKit at desktop, phone portrait, small portrait and landscape sizes. Check the linked PR's latest Actions result for the final outcome; an in-progress run is not a pass.

No automated suite certifies real iPhone keyboard behavior, actual Microsoft account consent, concurrent multi-user operation, or the accuracy of a production database. One editing device at a time remains the operating rule. No historical migration, inferred warranty allocation or customer-specific repair is part of this work.

## Recommended next releases

1. Purchasing credit controls and connected record details (v5.4.3 candidate).
2. Exact-record Data Health / Needs Review routing and explicit warranty replacement inventory events.
3. Inventory movement view, searchable list filters, customer activity timeline and friendly audit summaries.
4. Profit/report scope refinements and fuller expense capture after agreeing on the intended accounting treatment.

Hosting changes, roles, FIFO, multi-line sales and a supplier-payments ledger are separate projects; they should not be slipped into a UI cleanup.

## Browser privacy boundary for later hosting work

The cloud file remains private to its Microsoft account, but the local cache and sign-in tokens are accessible to scripts running on the same browser origin. Different project paths under one GitHub Pages hostname do not create separate storage boundaries. For a later hosting move, use a dedicated app origin, preserve the existing OneDrive database and register its exact OAuth redirect. Changing storage key names alone is not isolation. This is a design constraint, not a finding that a production record was exposed. No hosting or account change is included in this candidate.

Reference: [MDN Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API), which defines localStorage as shared by documents on the same origin.
