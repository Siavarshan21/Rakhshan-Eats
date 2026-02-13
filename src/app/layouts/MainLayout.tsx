import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from '../../components/layout/Header/Header';
import { Footer } from '../../components/layout/Footer/Footer';
import { Sidebar } from '../../components/layout/Sidebar/Sidebar';

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-surface-950">
      <Header />
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#171717',
            borderRadius: '0.75rem',
            fontSize: '14px',
          },
        }}
      />
    </div>
  );
}
