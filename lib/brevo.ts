
/**
 * Brevo (Sendinblue) Transactional Email Utility
 */

export async function sendTransactionalEmail(to: string, subject: string, htmlContent: string) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || "hello@glazedgloss.com";
  const senderName = process.env.BREVO_SENDER_NAME || "Glazed Gloss";

  if (!apiKey) {
    console.log("❌ CRITICAL: BREVO_API_KEY is missing from environment variables!");
    return null;
  }
  
  console.log(`📡 Attempting to send Brevo email to ${to} from ${senderEmail}...`);

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: senderName,
          email: senderEmail,
        },
        to: [
          {
            email: to,
          },
        ],
        subject: subject,
        htmlContent: htmlContent,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Brevo Email failed:", data);
      return null;
    }

    return data.messageId;
  } catch (error) {
    console.error("❌ Error sending Brevo email:", error);
    return null;
  }
}
