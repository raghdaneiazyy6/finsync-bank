export const dynamic = "force-dynamic";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full   justify-between font-inter">
      {children}
      <div className="auth-asset">
        <div>
          <Image
            src="/icons/screen.png"
            alt="Auth image"
            width={750}
            height={750}
            style={{ border: "5px solid black", borderRadius: "15px" }}
          />
        </div>
      </div>
    </main>
  );
}
