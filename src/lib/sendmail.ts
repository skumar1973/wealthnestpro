import emailjs from '@emailjs/browser';

let status=null;

async function sendEmail(
    serviceId: string,
    templateId: string,
    publicKey: string,
    name:string,
    email:string,
    message: string,
) { 
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: name,
          from_email: email,
          message: message,
      },
        publicKey
      );
      status='ok';
    } catch (error) {
      status='error';
    }
};
