import nodemailer from "nodemailer";
import dns from 'dns';

export async function POST(request: Request) {


  async function Email(fromEmail: string, toEmail: string, message: string) {
    const smtpHost = 'smtp.gmail.com';

    // Resolve IPv4 address first (helps identify network/DNS issues)
    let address = smtpHost;
    try {
      const lookupRes: any = await (dns.promises as any).lookup(smtpHost, { family: 4 });
      if (lookupRes && lookupRes.address) {
        address = lookupRes.address;
        console.log(`Resolved ${smtpHost} -> ${address} (IPv4)`);
      }
    } catch (e: any) {
      console.warn(`IPv4 lookup for ${smtpHost} failed, will use hostname instead:`, e?.message || e);
    }

    // Helper to create transporter with given options
    const makeTransport = (port: number, secure: boolean) =>
      nodemailer.createTransport({
        host: address,
        port,
        secure,
        auth: {
          user: process.env.SMTP_USER || 'ashutoshnayan707@gmail.com',
          pass: process.env.SMTP_PASS || 'sbmw kixd vhgl xhur',
        },
        // Ensure TLS uses the proper server name when connecting to IP
        tls: { servername: smtpHost },
        // generous timeouts to avoid ETIMEDOUT for slow networks
        connectionTimeout: 30000,
        greetingTimeout: 15000,
        socketTimeout: 30000,
      } as any);

    // Try STARTTLS on 587 first, then fall back to 465 (SSL) if timed out
    const attempts = [ { port: 587, secure: false }, { port: 465, secure: true } ];
    let lastError: any = null;

    for (const attempt of attempts) {
      const { port, secure } = attempt;
      const transporter = makeTransport(port, secure);
      try {
        console.log(`Attempting SMTP connection to ${smtpHost} (${address}) on port ${port} secure=${secure}`);
        // Optional verify to check connection without sending
        await transporter.verify();
        const info = await transporter.sendMail({
          from: fromEmail,
          to: toEmail,
          subject: 'Inquiry',
          text: message,
          html: `<p>${message}</p>`
        });
        console.log('Message sent: %s', info.messageId);
        // success => return
        return;
      } catch (err: any) {
        lastError = err;
        console.error(`Error while sending mail on port ${port}:`, err?.code || err?.message || err);
        // If timeout, try next attempt; for other errors you may want to break
        if (err && (err.code === 'ETIMEDOUT' || err.code === 'ESOCKET' || err.code === 'ECONNECTION')) {
          console.log(`Connection attempt on port ${port} failed with ${err.code}, trying next option...`);
          continue;
        } else {
          // non-network error - stop retrying
          break;
        }
      }
    }

    console.error('All SMTP attempts failed.', lastError);
    throw lastError;
  }

  const { firstName, lastName, email, phoneNumber, message } = await request.json();

  console.log("route request", { firstName, lastName, email, phoneNumber, message });
  
  const inquiryEmail = "support@wealthnestpro.in";
  const inquiryMessage= `First Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nMessage: ${message}`;
  let emailFrom  = email;
  /* The email will be sent to the company email, with the message as the email body. */
  await Email(emailFrom, inquiryEmail, inquiryMessage);
  
  const userMessage = `Dear ${firstName},\n\nThank you for reaching out to WealthNestPro. We have received your inquiry and will get back to you within 24 hours.\n\nBest regards,\nWealthNestPro Team`;
  const userEmail = email;
  emailFrom = "support@wealthnestpro.in";

  /* The email will be sent to the address provided in the form, with the company message. */
  await Email(emailFrom, userEmail, userMessage);

  return new Response(JSON.stringify({ message: "route" }), {
    headers: { "Content-Type": "application/json" },
  })
}