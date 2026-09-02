import React from "react";
import { PolicyPage, H2, Confirm } from "./PolicyPage";

export default function ShippingReturns() {
  return (
    <PolicyPage title="Shipping & Returns" lastUpdated="27 August 2026">
      <p>
        How we get your Khajuri to you, and what to do if something isn't right.
      </p>

      <H2>Delivery areas and timing</H2>
      <ul className="list-disc space-y-1.5 pl-5">
        <li>
          <strong>Inside Kathmandu Valley:</strong> free delivery, within 24 hours and usually
          the same day.
        </li>
        <li>
          <strong>Outside the Valley:</strong> nationwide delivery for a flat NPR 150 fee,
          typically 1–3 days depending on distance.
        </li>
      </ul>
      <p>
        Timings start once your order is confirmed with you by a real person.{" "}
        <Confirm>Cut-off time for same-day delivery inside the Valley</Confirm>.
      </p>

      <H2>Payment on delivery</H2>
      <p>
        Cash on Delivery is available, along with eSewa, Khalti, bank transfer and QR / Fonepay
        arranged when your order is confirmed.
      </p>

      <H2>If your order arrives damaged or wrong</H2>
      <p>
        Because Khajuri is a fresh food made without preservatives, we don't accept returns of
        opened product for reasons of change of mind. If your order arrives damaged, incomplete,
        or is not what you ordered, contact us within{" "}
        <Confirm>the number of days allowed to report a problem</Confirm> with a photo, and we
        will arrange a replacement or refund. <Confirm>Whether resolution is a replacement, a
        refund, or either at the customer's choice, and how a refund is paid back</Confirm>.
      </p>

      <H2>Missed delivery</H2>
      <p>
        If the delivery person cannot reach you, they will contact you to arrange another
        attempt. <Confirm>How many redelivery attempts are made and any repeat delivery fee</Confirm>.
      </p>

      <H2>Contact</H2>
      <p>
        For any delivery question, contact us at Bouddha-6, Kathmandu, by phone on
        +977 9845993344, or on WhatsApp via the button in the site footer.
      </p>
    </PolicyPage>
  );
}
