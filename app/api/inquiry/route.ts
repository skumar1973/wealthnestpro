import nodemailer from "nodemailer";

export async function POST(request: Request) {

  const { firstName, lastName, email, phoneNumber, message } = await request.json();
  console.log("route request", { firstName, lastName, email, phoneNumber, message });

  async function sendEmail(){
  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
      user: "ashutoshnayan707@gmail.com",
      pass: "sbmw kixd vhgl xhur",
    },
  });

  try {
    const info = await transporter.sendMail({
      from: 'ashutoshnayan707@gmail.com',
      to: email, 
      subject: 'enquiry',
      text: message,
      html: `<b>Hello Wealthnestpro.in,</b><p>${message}</p>`
    });
    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
}
  sendEmail();
  return new Response(JSON.stringify({ message: "route" }), {
    headers: { "Content-Type": "application/json" },
  })
}