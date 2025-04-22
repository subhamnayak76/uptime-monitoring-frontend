import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { DashboardNav } from '@/components/dashboard-nav';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Uptime Monitoring Dashboard',
  description: 'Monitor your websites and get notified when they go down',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthPage = (pathname: string) => {
    return pathname === '/' || pathname === '/login' || pathname === '/register';
  };

  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}