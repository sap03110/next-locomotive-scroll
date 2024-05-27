import LocomotiveScrollProvider from '@/utils/locomotive-scroll-provider';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <nav style={{ position: 'sticky', top: 0, zIndex: 1 }}>
          <Link href="/">메인</Link>
          <Link href="/a">페이지 1</Link>
          <Link href="/b">페이지 2</Link>
          <Link href="/c">페이지 3</Link>
        </nav>

        <LocomotiveScrollProvider>{children}</LocomotiveScrollProvider>
      </body>
    </html>
  );
}
