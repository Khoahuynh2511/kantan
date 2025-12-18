export default function DictionaryLoading() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 animate-pulse">
      <div className="mb-8">
        <div className="h-9 w-48 bg-[var(--card-color)] rounded-lg mb-2" />
        <div className="h-5 w-72 bg-[var(--card-color)] rounded-lg" />
      </div>

      <div className="mb-6">
        <div className="h-12 w-full bg-[var(--card-color)] rounded-xl" />
      </div>

      <div className="mb-6 flex gap-4">
        <div className="h-8 w-32 bg-[var(--card-color)] rounded-lg" />
        <div className="h-8 w-32 bg-[var(--card-color)] rounded-lg" />
        <div className="h-8 w-24 bg-[var(--card-color)] rounded-lg" />
      </div>

      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-24 w-full bg-[var(--card-color)] rounded-xl"
          />
        ))}
      </div>
    </div>
  );
}
