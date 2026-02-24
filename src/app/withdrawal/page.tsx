import type { Metadata } from "next";
import LegalPage from "@/components/pages/LegalPage";

export const metadata: Metadata = {
  title: "Right of Withdrawal",
  description: "Pedral Watches right of withdrawal — your 14-day cooling-off period under EU law.",
  alternates: { canonical: "/withdrawal" },
};

export default function WithdrawalPage() {
  return (
    <LegalPage eyebrow="Legal" title="Right of Withdrawal" updated="EU Consumer Rights">
      <h2>Your Right</h2>
      <p>
        You have the right to withdraw from this contract within <strong>14 days</strong> without
        giving any reason. The withdrawal period expires{" "}
        <strong>14 days from the day you acquire physical possession of the goods</strong>.
      </p>
      <p>
        To exercise, notify: Pedral Design Studio AB, Sveavägen 117A, 113 49 Stockholm,
        Sweden / <a href="mailto:hello@pedral.watch">hello@pedral.watch</a>
      </p>

      <h2>Pre-Orders: Additional Cancellation Rights</h2>
      <p>
        Because many Pedral watches are pre-order items with payment taken at time of order, you
        have the following rights:
      </p>
      <ul>
        <li>
          <strong>Before dispatch:</strong> You may cancel your pre-order at any time before the
          watch is shipped. Contact <a href="mailto:hello@pedral.watch">hello@pedral.watch</a> with
          your order number. A full refund will be issued within 14 days via the original payment
          method.
        </li>
        <li>
          <strong>After delivery:</strong> The standard 14-day withdrawal period applies. The
          clock starts the day you physically receive the watch — not the day you placed the order
          or the day it was dispatched.
        </li>
      </ul>
      <p>
        Pre-order payment secures your allocation in a limited edition of 20 pieces. This does not
        reduce or alter your statutory withdrawal rights in any way.
      </p>

      <h2>Effects of Withdrawal</h2>
      <p>
        We reimburse all payments including standard delivery cost within 14 days of receiving the
        goods back or proof of return shipment. Same payment method. No fees. We may withhold
        reimbursement until goods are received or proof of return provided.
      </p>
      <p>You bear the direct cost of returning the goods.</p>
      <p>
        You are liable for any diminished value resulting from handling beyond what is necessary to
        establish the nature, characteristics and functioning of the goods.
      </p>

      <h2>Exceptions</h2>
      <p>
        The right of withdrawal does <strong>NOT</strong> apply to: made-to-order Triomphe Hebrew
        and Eastern Arabic numeral editions produced specifically for the buyer (Art. 16(c) — goods
        made to the consumer&apos;s specifications). You will be clearly informed at checkout
        before purchase if this exception applies.
      </p>
      <p>
        <strong>
          For all standard editions, including pre-orders: the 14-day right applies in full.
        </strong>
      </p>

      <h2>Model Withdrawal Form</h2>
      <p>To: Pedral Design Studio AB, Sveavägen 117A, 113 49 Stockholm / <a href="mailto:hello@pedral.watch">hello@pedral.watch</a></p>
      <p>I hereby give notice that I withdraw from my contract of sale of the following goods:</p>
      <p>Product: _______________ | Order number: _______________</p>
      <p>Ordered on / Received on: _______________</p>
      <p>Name: _______________ | Address: _______________</p>
      <p>Date: _______________ | Signature (if by post): _______________</p>
    </LegalPage>
  );
}
