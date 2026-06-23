import SuccessContent from "@/Components/Common Sec/SuccessContent";
import { createSubsction } from "@/lib/Actions/subscriptions";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
// import SuccessContent from "./SuccessContent";

export default async function Success({
  searchParams,
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error(
      "Please provide a valid session_id"
    );
  }

  const {
    status,
    customer_details: { email: customerEmail },
    metadata

  } = await stripe.checkout.sessions.retrieve(
    session_id,
    {
      expand: [
        "line_items",
        "payment_intent",
      ],
    }
  );

  if (status === "open") {
    redirect("/");
  }
  
  if (status === "complete") {
    const subsIndfo ={
      email : customerEmail,
      planId : metadata.planId,
    }

    const result = await createSubsction(subsIndfo)

    // console.log('subscription', result);
    return (
      <SuccessContent
        customerEmail={customerEmail}
      />
    );
  }
}