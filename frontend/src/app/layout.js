import "./globals.css";

export const metadata = {
  title: "JanSetu - AI Government Assistant",
  description: "Your AI Government Assistant is here to help you find information and get things done.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
