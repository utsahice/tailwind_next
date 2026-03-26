import { NextResponse } from "next/server";

const STORYBLOK_OAUTH_TOKEN = process.env.STORYBLOK_OAUTH_TOKEN;
const STORYBLOK_SPACE_ID = process.env.STORYBLOK_SPACE_ID;
const SALESFORCE_CLIENT_ID = process.env.SALESFORCE_CLIENT_ID;
const SALESFORCE_CLIENT_SECRET = process.env.SALESFORCE_CLIENT_SECRET;
const SALESFORCE_USERNAME = process.env.SALESFORCE_USERNAME;
const SALESFORCE_PASSWORD = process.env.SALESFORCE_PASSWORD;
const SALESFORCE_SECURITY_TOKEN = process.env.SALESFORCE_SECURITY_TOKEN;
const SALESFORCE_INSTANCE_URL = process.env.SALESFORCE_INSTANCE_URL;

function generateOrderId(): string {
    const ts = Date.now().toString(36).toUpperCase();
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `GG-${ts}-${rand}`;
}

async function getSalesforceToken(): Promise<{ access_token: string; instance_url: string } | null> {
    if (!SALESFORCE_CLIENT_ID || !SALESFORCE_CLIENT_SECRET || !SALESFORCE_USERNAME || !SALESFORCE_PASSWORD) {
        return null;
    }
    try {
        const params = new URLSearchParams({
            grant_type: "password",
            client_id: SALESFORCE_CLIENT_ID,
            client_secret: SALESFORCE_CLIENT_SECRET,
            username: SALESFORCE_USERNAME,
            password: `${SALESFORCE_PASSWORD}${SALESFORCE_SECURITY_TOKEN || ""}`,
        });
        const res = await fetch(
            `${SALESFORCE_INSTANCE_URL || "https://login.salesforce.com"}/services/oauth2/token`,
            { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: params }
        );
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

async function sendSalesforceEmail(
    sfToken: { access_token: string; instance_url: string },
    toEmail: string,
    toName: string,
    orderId: string,
    items: Array<{ title: string; quantity: number; price: string }>,
    orderTotal: number
) {
    const itemsHtml = items.map(i =>
        `<tr>
            <td style="padding:8px 0;font-family:sans-serif;font-size:13px;">${i.title}</td>
            <td style="padding:8px 0;font-family:sans-serif;font-size:13px;text-align:center;">${i.quantity}</td>
            <td style="padding:8px 0;font-family:sans-serif;font-size:13px;text-align:right;">$${(parseFloat(i.price) * i.quantity).toFixed(2)}</td>
        </tr>`
    ).join("");

    const emailBody = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#F2F0EA;font-family:sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border:1px solid #e5e5e5;">
    <div style="background:#111111;padding:32px 40px;">
      <p style="color:#DFF624;font-size:11px;letter-spacing:4px;margin:0 0 8px;">GLAZED GLOSS</p>
      <h1 style="color:#fff;font-size:32px;margin:0;font-weight:300;">Order Confirmed</h1>
    </div>
    <div style="padding:40px;">
      <p style="font-size:14px;color:#4D4D4D;margin:0 0 24px;">Hi ${toName},</p>
      <p style="font-size:14px;color:#4D4D4D;margin:0 0 24px;">
        Thank you for your order! We&apos;ve received it and will begin processing shortly.
      </p>
      <div style="background:#F2F0EA;padding:16px 20px;margin-bottom:24px;">
        <p style="font-size:11px;letter-spacing:3px;color:#8D8D8D;margin:0 0 4px;">ORDER NUMBER</p>
        <p style="font-size:18px;font-weight:bold;color:#111;margin:0;">${orderId}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <thead>
          <tr style="border-bottom:2px solid #DFF624;">
            <th style="text-align:left;padding:8px 0;font-size:10px;letter-spacing:2px;color:#8D8D8D;">PRODUCT</th>
            <th style="text-align:center;padding:8px 0;font-size:10px;letter-spacing:2px;color:#8D8D8D;">QTY</th>
            <th style="text-align:right;padding:8px 0;font-size:10px;letter-spacing:2px;color:#8D8D8D;">PRICE</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
        <tfoot>
          <tr style="border-top:1px solid #e5e5e5;">
            <td colspan="2" style="padding:12px 0;font-size:14px;font-weight:bold;color:#111;">Total</td>
            <td style="padding:12px 0;font-size:14px;font-weight:bold;color:#111;text-align:right;">$${orderTotal.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      <p style="font-size:13px;color:#4D4D4D;margin:0 0 8px;">
        You can track your order status by contacting us at <a href="mailto:hello@glazedgloss.com" style="color:#111;">hello@glazedgloss.com</a>.
      </p>
      <p style="font-size:13px;color:#4D4D4D;margin:0;">
        Thank you for shopping with Glazed Gloss.
      </p>
    </div>
    <div style="background:#111;padding:20px 40px;text-align:center;">
      <p style="color:#8D8D8D;font-size:11px;margin:0;">© 2024 Glazed Gloss Creative Collective. All Rights Reserved.</p>
    </div>
  </div>
</body>
</html>`;

    await fetch(`${sfToken.instance_url}/services/data/v58.0/actions/standard/emailSimple`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${sfToken.access_token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            inputs: [{
                emailAddresses: toEmail,
                emailSubject: `Order Confirmed — ${orderId} | Glazed Gloss`,
                emailBody: emailBody,
                senderType: "OrgWideEmailAddress",
            }],
        }),
    });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { form, items, orderTotal } = body;
        const orderId = generateOrderId();
        const orderDate = new Date().toISOString();

        // ── Save to Storyblok ──
        if (STORYBLOK_OAUTH_TOKEN && STORYBLOK_SPACE_ID) {
            const itemsSummary = items.map((i: { title: string; quantity: number; price: string }) =>
                `${i.title} x${i.quantity} ($${(parseFloat(i.price) * i.quantity).toFixed(2)})`
            ).join("\n");

            const storyPayload = {
                story: {
                    name: `Order ${orderId}`,
                    slug: `order-${orderId.toLowerCase()}`,
                    parent_id: 0,
                    content: {
                        component: "order",
                        order_id: orderId,
                        status: "pending",
                        customer_name: `${form.firstName} ${form.lastName}`,
                        customer_email: form.email,
                        customer_phone: form.phone || "",
                        shipping_address: `${form.address}${form.apartment ? `, ${form.apartment}` : ""}, ${form.city}, ${form.state} ${form.zip}, ${form.country}`,
                        order_notes: form.notes || "",
                        items_summary: itemsSummary,
                        order_total: orderTotal.toFixed(2),
                        payment_received: false,
                        order_date: orderDate,
                    },
                },
                publish: 1,
            };

            await fetch(`https://mapi.storyblok.com/v1/spaces/${STORYBLOK_SPACE_ID}/stories/`, {
                method: "POST",
                headers: {
                    "Authorization": STORYBLOK_OAUTH_TOKEN,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(storyPayload),
            });
        }

        // ── Send Salesforce email ──
        const sfToken = await getSalesforceToken();
        if (sfToken) {
            await sendSalesforceEmail(
                sfToken,
                form.email,
                form.firstName,
                orderId,
                items,
                orderTotal
            );
        }

        return NextResponse.json({ orderId, success: true });
    } catch (error) {
        console.error("Order error:", error);
        return NextResponse.json(
            { error: "Failed to place order", message: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
