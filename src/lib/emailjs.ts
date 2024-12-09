import emailjs from '@emailjs/browser';

const EMAIL_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
} as const;

export const initEmailJS = () => {
  if (!EMAIL_CONFIG.publicKey) {
    throw new Error('EmailJS public key is missing');
  }
  
  // Validate environment variables
  if (!EMAIL_CONFIG.serviceId || !EMAIL_CONFIG.templateId) {
    throw new Error('Missing required EmailJS configuration');
  }

  emailjs.init(EMAIL_CONFIG.publicKey);
};

export const sendEmail = async (form: HTMLFormElement) => {
  // Additional validation before sending
  const requiredFields = ['from_name', 'from_email', 'message'];
  for (const field of requiredFields) {
    const element = form.elements.namedItem(field) as HTMLInputElement | HTMLTextAreaElement;
    if (!element?.value?.trim()) {
      throw new Error(`${field.replace('_', ' ')} is required`);
    }
  }

  try {
    return await emailjs.sendForm(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      form,
      EMAIL_CONFIG.publicKey
    );
  } catch (error) {
    console.error('EmailJS error:', error);
    throw error;
  }
};