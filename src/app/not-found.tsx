export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4 text-center">
      <h1 className="text-3xl font-bold text-red-600">404 — Team Not Found</h1>
      <p className="text-gray-600">
        The team you're looking for doesn't exist or was deleted.
      </p>
      <a
        href="/dashboard"
        className="mt-4 bg-black text-white px-4 py-2 rounded-md"
      >
        Back to Dashboard
      </a>
    </div>
  );
}
