export default function Loading() {
  return (
    <div
      className="flex h-[200px] items-center justify-center bg-green-50"
      aria-live="polite"
      aria-busy="true"
      role="status"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
        <p className="text-lg font-semibold text-gray-600">Loading todos…</p>
      </div>
    </div>
  );
}
