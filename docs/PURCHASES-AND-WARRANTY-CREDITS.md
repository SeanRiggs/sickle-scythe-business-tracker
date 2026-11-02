# Receive inventory bought with warranty credit

For the v5.4.3 candidate. Check the version displayed in the app before using the new claim/order links and cancellation controls.

## Enter the purchase once

1. In **Warranty**, find the existing claim or claims. Confirm the manufacturer-approved credit is recorded accurately. Do not create another claim for credit already present. **Approved**, **Used**, and **Available** are different amounts.
2. Open **Claim details → Use warranty credit**, or go to **Purchase Orders**. Select the matching manufacturer. Existing draft lines remain for you to review.
3. Enter the supplier reference, expected arrival if known, product quantities and the **unit cost before warranty credit**. Add shipping and bank/customs fees separately.
4. Enter the credit actually applied by the supplier under **Warranty credit to use**. Use the agreed amount, not all available credit unless the supplier used all of it. The preview shows the claims funding the credit, net order cost and credit remaining.
5. Save the order. Credit is allocated at this point; inventory is not yet increased. Wait for **Saved with OneDrive**.
6. When stock arrives, choose **Receive stock** on that order and enter only the quantity received now. Partial deliveries are supported. If it has already arrived when entering the order, save first, then receive it once.
7. Verify the product's on-hand quantity, the order's remaining units, and the credit remaining on the claims. A supplier payment is not a customer payment; do not record it under Sales & Payments.

## Fictional example

| Entry | Amount |
| --- | ---: |
| 20 units × $200 before credit | $4,000.00 |
| Shipping | $200.00 |
| Bank/customs fees | $25.00 |
| Warranty credit used | −$150.00 |
| Net order cost | **$4,075.00** |
| This order's landed cost per unit | **$203.75** |

If there was $260 of approved unused credit, $110 remains after saving. Receiving five units adds five to stock and attributes $1,018.75 of this order's cost to those received units. The app's product-wide weighted cost may differ if earlier purchases exist.

**Do not reduce the unit price by the credit and also enter the credit field.** That would subtract it twice. If the supplier invoice only shows the final discounted amount, use its breakdown or confirm the pre-credit unit price before entering both fields. For multiple product lines, the app allocates shipping, fees and credit proportionally to each line's pre-credit value; it does not support a manufacturer credit restricted to one specific line.

Do not enter a warranty credit as revenue, a customer payment or a separate inventory adjustment. Shipping/fees already included here should not also be counted as a separate operating expense without reviewing the intended treatment.

## Trace and correct

**Order details → View claim** shows the source credit. **Claim details → View order** shows where it was used. New orders retain each allocation. Cancelling a new unreceived order releases exactly its allocations back to those claims and preserves the order's history. It does not issue a supplier refund.

Orders with received stock require a supplier-return review. Older credited orders without allocation links cannot safely release credit automatically; back up and reconcile the records first. The update does not reconstruct historical links.

An order's **Net order cost** is not proof of payment. Supplier cash payments and supplier accounts payable are not tracked by this application.
