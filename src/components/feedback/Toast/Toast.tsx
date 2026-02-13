import { Toaster } from 'react-hot-toast';

export function ToastContainer() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#fff',
          color: '#171717',
          borderRadius: '0.75rem',
          padding: '12px 16px',
          fontSize: '14px',
          boxShadow: '0 10px 40px -10px rgba(0,0,0,0.15)',
        },
        success: {
          iconTheme: { primary: '#22c55e', secondary: '#fff' },
        },
        error: {
          iconTheme: { primary: '#ef4444', secondary: '#fff' },
        },
      }}
    />
  );
}
