import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "24px" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ margin: 0, fontSize: "3rem" }}>404</h1>
        <p style={{ color: "#9aa6b5", margin: "12px 0 20px" }}>Page not found</p>
        <Link href="/" style={{ color: "#59d8ff" }}>Back to home</Link>
      </div>
    </main>
  );
}
