// No "use client" here
import type { Metadata } from 'next';
import './globals.css';
import '@solana/wallet-adapter-react-ui/styles.css';
import { AppClientLayoutWrapper } from '@/components/AppClientLayoutWrapper';

export const metadata: Metadata = {
  title: 'Polarys Land',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <AppClientLayoutWrapper>{children}</AppClientLayoutWrapper>
      </body>
    </html>
  );
}
