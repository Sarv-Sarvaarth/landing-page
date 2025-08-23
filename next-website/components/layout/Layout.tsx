import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Analytics } from '@vercel/analytics/react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
        <Analytics />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
