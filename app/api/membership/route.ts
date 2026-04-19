import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, email, phone, address, plan } = await req.json();

    // Send Email via Brevo
    try {
        const { sendTransactionalEmail } = await import("@/lib/brevo");
        await sendTransactionalEmail(
            email,
            "Welcome to our Membership Program",
            `<h1>Hi ${name},</h1><p>We've received your interest in the <strong>${plan}</strong> membership plan.</p><p>Our team will review your application and contact you at ${phone} very soon.</p>`
        );
    } catch (err) {
        console.error("Membership email failed", err);
    }

    return NextResponse.json({
      success: true,
      message: "Membership interest recorded."
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
