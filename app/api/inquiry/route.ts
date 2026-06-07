import nodemailer from "nodemailer";
import dns from 'dns';

export async function POST(request: Request) {


  async function Email(fromEmail: string, toEmail: string, message: string) {
  // Custom lookup function to force IPv4 (family: 4)
  // use `any` here to avoid strict type mismatch with Node's overloaded dns.lookup typing
  const lookup4: any = (hostname: string, options: any, callback: any) => {
    if (typeof options === 'function') {
      callback = options;
      options = { family: 4, hints: dns.ADDRCONFIG | dns.V4MAPPED } as any;
    }
    // ensure family:4
    const opts = Object.assign({}, typeof options === 'object' ? options : {}, { family: 4 });
    return dns.lookup(hostname, opts as any, callback as any);
  };

  // Create a transporter using SMTP and force IPv4 resolution via `lookup`
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
      user: process.env.SMTP_USER || "ashutoshnayan707@gmail.com",
      pass: process.env.SMTP_PASS || "sbmw kixd vhgl xhur",
    },
    // Force IPv4 address resolution to avoid IPv6 ENETUNREACH errors
    lookup: lookup4 as any,
    connectionTimeout: 10000,
    greetingTimeout: 5000,
  } as any);


  try {
    const info = await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      subject: 'Inquiry',
      text: message,
      html: `<p>${message}</p>`
    });
    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
}
  
  const { firstName, lastName, email, phoneNumber, message } = await request.json();

  console.log("route request", { firstName, lastName, email, phoneNumber, message });
  
  const inquiryEmail = "support@wealthnestpro.in";
  const inquiryMessage= `First Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nMessage: ${message}`;
  let emailFrom  = email;
  /* The email will be sent to the company email, with the message as the email body. */
  Email(emailFrom, inquiryEmail, inquiryMessage);
  
  const userMessage = `Dear ${firstName},\n\nThank you for reaching out to WealthNestPro. We have received your inquiry and will get back to you within 24 hours.\n\nBest regards,\nWealthNestPro Team`;
  const userEmail = email;
  emailFrom = "support@wealthnestpro.in";

  /* The email will be sent to the address provided in the form, with the company message. */
  Email(emailFrom, userEmail, userMessage);

  return new Response(JSON.stringify({ message: "route" }), {
    headers: { "Content-Type": "application/json" },
  })
}