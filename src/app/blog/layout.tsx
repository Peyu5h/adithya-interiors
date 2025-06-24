import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Adithya Interiors",
    default: "BLOG",
  },
};

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full flex-grow">
      {children}
      {/* <Footer /> */}
    </main>
  );
}
