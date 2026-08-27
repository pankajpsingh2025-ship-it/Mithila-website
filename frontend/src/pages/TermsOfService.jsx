import React from "react";
import { PolicyPage, H2, Confirm } from "./PolicyPage";

export default function TermsOfService() {
  return (
    <PolicyPage title="Terms of Service" lastUpdated="27 August 2026">
      <p>
        These terms apply to orders placed with Mithila.Foods (Pawan Mithila Foods Pvt. Ltd.,
        Bouddha-6, Kathmandu) through this website, WhatsApp or phone.
      </p>

      <H2>Products</H2>
      <p>
        We sell handcrafted Khajuri made in small batches with semolina, wheat flour, ghee,
        jaggery, fresh coconut, almonds, cashew, peanuts, cardamom, cloves and fennel seeds.
        It contains nuts, dairy and gluten and does not contain egg. No preservatives are added,
        so the product is best enjoyed fresh and kept sealed in its resealable pouch.
      </p>

      <H2>Orders</H2>
      <ul className="list-disc space-y-1.5 pl-5">
        <li>You can order by adding packs to the cart and checking out, or by messaging us on WhatsApp.</li>
        <li>A real person confirms every order before it is prepared. An order is only accepted once we confirm it with you.</li>
        <li>Prices are shown in Nepalese Rupees (NPR) on the product cards and may change over time.</li>
        <li>We may decline or cancel an order if the item is unavailable or the delivery address is outside the area we can reach.</li>
      </ul>

      <H2>Payment</H2>
      <p>
        We accept Cash on Delivery, eSewa, Khalti, bank transfer, and QR / Fonepay. Payment is
        taken as agreed with you at the time your order is confirmed.
      </p>

      <H2>Delivery</H2>
      <p>
        Delivery terms are set out in our{" "}
        <a href="/shipping-returns" className="text-maroon underline underline-offset-4">Shipping &amp; Returns</a>{" "}
        page.
      </p>

      <H2>Cancellations and issues</H2>
      <p>
        If something is wrong with your order, contact us as soon as possible so we can put it
        right. <Confirm>The window for cancelling a confirmed order before it ships, and how
        refunds or replacements are handled</Confirm>.
      </p>

      <H2>Liability</H2>
      <p>
        Please check the ingredient list before eating if you have a food allergy. To the extent
        permitted by law, our responsibility for any claim relating to an order is limited to the
        value of that order.
      </p>

      <H2>Contact</H2>
      <p>
        Pawan Mithila Foods Pvt. Ltd., Bouddha-6, Kathmandu. Phone +977 984-9453348, or WhatsApp
        via the button in the site footer.
      </p>
    </PolicyPage>
  );
}
