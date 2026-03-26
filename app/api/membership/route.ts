import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

async function pushToSalesforce(name: string, email: string, phone: string, address: string, plan: string) {
  const sfUrl = process.env.SALESFORCE_INSTANCE_URL;
  const token = process.env.SALESFORCE_ACCESS_TOKEN;

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
      LastName: name.split(' ').pop() || name,
      FirstName: name.split(' ').slice(0, -1).join(' '),
      Email: email,
      Phone: phone,
      Street: address,
      Company: "Membership Interest",
      Description: `User interested in ${plan} membership plan. Pre-filled from website modal.`
    })
  });

  if (response.ok) {
    const data = await response.json();
    return data.id;
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
    const { name, email, phone, address, plan } = await req.json();

    // Push to Salesforce as a Lead
    const salesforceId = await pushToSalesforce(name, email, phone, address, plan);

    return NextResponse.json({ 
        success: true, 
        message: "Membership interest recorded.",
        salesforceId 
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
