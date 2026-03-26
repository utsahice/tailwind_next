import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import pool from "@/lib/db";
import { ResultSetHeader } from "mysql2";

// Salesforce API Configuration (ensure proper ENV setup)
async function pushToSalesforce(name: string, email: string, orderId: number) {
  const sfUrl = process.env.SALESFORCE_INSTANCE_URL;
  const token = process.env.SALESFORCE_ACCESS_TOKEN; // Get real access token dynamically in production

  if (!token) {
    console.warn("SF token not configured, skipping.");
    return null;
  }

  const response = await fetch(`${sfUrl}/services/data/v58.0/sobjects/Lead`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      LastName: name,
      Email: email,
      Company: "Ecommerce Store",
      Description: `Website Order Placed. Local Order ID: ${orderId}`
    })
  });

  if (response.ok) {
    const data = await response.json();
    return data.id; // Record ID from Salesforce
  } else {
    console.error("Salesforce failure:", await response.text());
  }
  return null;
}

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

    // 2. Push to Salesforce
    const salesforceId = await pushToSalesforce(session.user.name || "Customer", session.user.email!, orderId);

    // 3. Update Order with Salesforce ID if sync was successful
    if (salesforceId) {
      await pool.query(
        "UPDATE orders SET salesforce_id = ? WHERE id = ?",
        [salesforceId, orderId]
      );
    }

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
