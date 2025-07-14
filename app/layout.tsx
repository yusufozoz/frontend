import { BakiyeProvider } from "@/Context/balanceContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <BakiyeProvider>
          {children}
        </BakiyeProvider>
      </body>
    </html>
  );
}
