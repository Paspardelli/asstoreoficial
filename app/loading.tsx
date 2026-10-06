export default function Loading() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-8 sm:grid-cols-3 lg:grid-cols-4" aria-busy="true">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[3/4] bg-neutral-200" />
          <div className="mt-2 h-4 w-3/4 bg-neutral-200" />
          <div className="mt-2 h-4 w-1/3 bg-neutral-200" />
        </div>
      ))}
    </div>
  );
}
