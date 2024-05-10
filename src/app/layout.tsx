import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Cabbages",
  description: "A website where you can keep track of your grocery lists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
