export default function Loading() {
  return (
    <main className="loading-screen" aria-label="Loading SONORA">
      <span className="sonora-mark loading-mark" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
      <span className="loading-copy">Tuning into the world</span>
    </main>
  );
}
