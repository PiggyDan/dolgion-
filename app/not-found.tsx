import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell not-found">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p className="lead">That page doesn't exist. The case studies and contact details are on the home page.</p>
      <Link href="/" className="btn btn-primary">
        Back to home
      </Link>
    </section>
  );
}
