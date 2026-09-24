import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/motion/MotionProvider";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <MotionProvider />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
