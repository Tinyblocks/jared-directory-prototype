"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-8">
      <h2 className="text-xl font-semibold text-gray-900">Something went wrong</h2>
      <p className="max-w-md text-center text-gray-600">{error.message}</p>
      <button
        onClick={reset}
        className="rounded-lg bg-[var(--color-primary)] px-6 py-2 font-medium text-white hover:opacity-90"
      >
        Try again
      </button>
    </div>
  );
}
