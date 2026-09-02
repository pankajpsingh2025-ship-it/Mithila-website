import React from "react";
import { PolicyPage, H2, Confirm } from "./PolicyPage";

export default function PrivacyPolicy() {
  return (
    <PolicyPage title="Privacy Policy" lastUpdated="27 August 2026">
      <p>
        This policy explains what information Mithila.Foods (Pawan Mithila Foods Pvt. Ltd.,
        Bouddha-6, Kathmandu) collects when you use this website or place an order, and how we
        use it. We only collect what we need to take and deliver your order.
      </p>

      <H2>What we collect</H2>
      <ul className="list-disc space-y-1.5 pl-5">
        <li>
          <strong>Order details</strong> you give us: name, delivery address, phone number and,
          if you check out on the site, your email address.
        </li>
        <li>
          <strong>Newsletter sign-up:</strong> if you join our list, we store the email address
          you enter so we can send occasional fresh-batch and offer updates.
        </li>
        <li>
          <strong>Account sign-in:</strong> if you sign in with Google, we receive your name,
          email address and profile picture from Google so we can show your order history.
        </li>
        <li>
          <strong>Messages you send us</strong> on WhatsApp or by phone, so we can confirm and
          follow up on your order.
        </li>
      </ul>

      <H2>How we use it</H2>
      <ul className="list-disc space-y-1.5 pl-5">
        <li>To confirm, prepare and deliver your order.</li>
        <li>To contact you about your order or a delivery question.</li>
        <li>To send newsletter emails — only if you asked for them. Every email can be unsubscribed from.</li>
      </ul>

      <H2>Sharing</H2>
      <p>
        We do not sell your information. We share delivery details with the courier or delivery
        person handling your order, and with payment services only as needed to confirm a
        payment. <Confirm>The specific delivery partners and payment processors used</Confirm>.
      </p>

      <H2>Storage and retention</H2>
      <p>
        Order and account records are stored in our order system. <Confirm>How long order and
        newsletter records are kept before deletion</Confirm>.
      </p>

      <H2>Your choices</H2>
      <ul className="list-disc space-y-1.5 pl-5">
        <li>Ask us for a copy of the order information we hold about you.</li>
        <li>Ask us to correct or delete your details, subject to records we must keep for tax or accounting.</li>
        <li>Unsubscribe from the newsletter at any time.</li>
      </ul>

      <H2>Contact</H2>
      <p>
        For any privacy request, contact us at Bouddha-6, Kathmandu, by phone on +977 9845993344,
        or on WhatsApp via the button in the site footer.
      </p>
    </PolicyPage>
  );
}
