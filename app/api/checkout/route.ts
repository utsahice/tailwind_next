import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import pool from "@/lib/db";
import { ResultSetHeader } from "mysql2";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { address, totalPayment } = await req.json();

    // 1. Save to Database (Orders Table)
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO orders (user_id, address, total_payment, status, created_at, updated_at) 
       VALUES (?, ?, ?, 'Placed', NOW(), NOW())`,
      [session.user.id, address, totalPayment]
    );

    const orderId = result.insertId;

    // Send Email via Brevo
    try {
        const { sendTransactionalEmail } = await import("@/lib/brevo");
        await sendTransactionalEmail(
            session.user.email!,
            "Order Confirmation - Gloss",
            `<h1>Order Received!</h1><p>Thank you for your purchase. Your order ID is <strong>#${orderId}</strong>.</p><p>Total Payment: $${totalPayment}</p><p>Shipping Address: ${address}</p>`
        );
    } catch (err) {
        console.error("Email confirmation failed", err);
    }

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
