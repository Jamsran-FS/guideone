import Link from "next/link";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="bg-background pb-32 pt-44">
      <Container className="text-center">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-4 font-display text-4xl font-bold text-foreground">Хуудас олдсонгүй · Page not found</h1>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white">
          GuideOne
        </Link>
      </Container>
    </section>
  );
}
