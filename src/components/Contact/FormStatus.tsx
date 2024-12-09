interface FormStatusProps {
  type: 'success' | 'error' | null;
  message: string;
}

export default function FormStatus({ type, message }: FormStatusProps) {
  if (!message) return null;

  const statusClasses = type === 'success' 
    ? 'bg-green-50 text-green-800' 
    : 'bg-red-50 text-red-800';

  return (
    <div className={`p-4 rounded-lg ${statusClasses}`}>
      {message}
    </div>
  );
}