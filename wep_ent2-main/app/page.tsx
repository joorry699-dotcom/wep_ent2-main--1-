export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        background: "linear-gradient(135deg, #0f172a, #111827)",
        color: "#e5e7eb",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: "480px",
          background: "rgba(255, 255, 255, 0.04)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 20px 70px rgba(0,0,0,0.35)",
          backdropFilter: "blur(6px)",
        }}
      >
        <p style={{ letterSpacing: "0.08em", textTransform: "uppercase", color: "#93c5fd" }}>
          Next.js is up
        </p>
        <h1 style={{ margin: "12px 0", fontSize: "2rem", fontWeight: 700 }}>Home route ready</h1>
        <p style={{ color: "#cbd5e1", lineHeight: 1.6 }}>
          You can start adding real content here. This page exists so the root route returns 200 instead of 404.
        </p>
      </div>
    </main>
  )
}
