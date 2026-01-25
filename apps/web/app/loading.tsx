export default function Loading() {
  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <div className="h-10 w-64 bg-muted animate-pulse rounded mb-8" />
        <div className="bg-card border rounded-lg p-6">
          <div className="h-6 w-48 bg-muted animate-pulse rounded mb-4" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
