import { ChangeEvent, FormEvent, RefObject, useState } from 'react';
import { FormData, FormStatus } from './types';
import { sendEmail } from '../../lib/emailjs';
import { sanitizeInput, validateEmail, rateLimit } from '../../lib/security';

const INITIAL_FORM_DATA: FormData = {
  name: '',
  email: '',
  message: ''
};

export function useContactForm(formRef: RefObject<HTMLFormElement>) {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [status, setStatus] = useState<FormStatus>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const sanitizedName = sanitizeInput(formData.name);
    const sanitizedMessage = sanitizeInput(formData.message);
    
    if (!validateEmail(formData.email)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address'
      });
      return;
    }

    if (!rateLimit(formData.email)) {
      setStatus({
        type: 'error',
        message: 'Too many requests. Please try again later.'
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const form = formRef.current;
      const formElements = form.elements as HTMLFormControlsCollection;
      (formElements.namedItem('from_name') as HTMLInputElement).value = sanitizedName;
      (formElements.namedItem('message') as HTMLTextAreaElement).value = sanitizedMessage;

      const result = await sendEmail(form);

      if (result.text === 'OK') {
        setStatus({
          type: 'success',
          message: 'Message sent successfully! We\'ll get back to you soon.'
        });
        setFormData(INITIAL_FORM_DATA);
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    status,
    isSubmitting,
    handleChange,
    handleSubmit
  };
}