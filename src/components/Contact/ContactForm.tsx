import { useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { useContactForm } from './useContactForm';
import FormInput from './FormInput';
import FormStatus from './FormStatus';

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { formData, status, isSubmitting, handleChange, handleSubmit } = useContactForm(formRef);

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <FormInput
        id="name"
        label="Name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <FormInput
        id="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <FormInput
        id="message"
        label="Message"
        type="textarea"
        value={formData.message}
        onChange={handleChange}
        required
      />

      <FormStatus type={status.type} message={status.message} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:bg-blue-700 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}