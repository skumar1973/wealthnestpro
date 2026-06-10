import { Resend } from 'resend';
import {} from 'dotenv/config';

const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, phoneNumber, message } = await request.json();

    // console.log('route request', { firstName, lastName, email, phoneNumber, message });

    const inquiryEmail = 'support@wealthnestpro.in';
    const inquiryMessage = `First Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nMessage: ${message}`;

    // Send to company
    try {
      
     /*  console.log('Sending inquiry email to company via Resend with message:', inquiryMessage);
      console.log('Using Resend API key:', process.env.RESEND_API_KEY ? '***' : 'not set');
      console.log('Using Resend from email:', process.env.RESEND_FROM_EMAIL!);
      console.log('Using Resend to email:', inquiryEmail); */
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: inquiryEmail,
        subject: 'New Inquiry',
        text: inquiryMessage,
        html: `<pre>${inquiryMessage}</pre>`,
      });
      console.log('Inquiry email sent to company');
    } catch (err) {
      console.error('Error sending inquiry to company via Resend:', err);
      return new Response(JSON.stringify({ error: 'Failed to send inquiry' }), { status: 500 });
    }

    // Send confirmation to user
    const userMessage = `Dear ${firstName},\n\nThank you for reaching out to WealthNestPro. We have received your inquiry and will get back to you within 24 hours.\n\nBest regards,\nWealthNestPro Team`;
    console.log('Using Resend to email:', email);
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: email,
        subject: 'WealthNestPro - We received your inquiry',
        text: userMessage,
        html: `<p>${userMessage.replace(/\n/g, '<br/>')}</p>`,
      });
      console.log('Confirmation email sent to user');
    } catch (err) {
      console.error('Error sending confirmation to user via Resend:', err);
      return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: 'inquiry submitted successfully' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Unhandled error in inquiry route:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}