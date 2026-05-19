import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="text-8xl font-extrabold text-emerald-500">404</p>
      <h1 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">Page not found</h1>
      <p className="mt-2 max-w-md text-muted">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
      >
        Back Home
      </Link>
    </section>
  );
}
