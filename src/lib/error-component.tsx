import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

const FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center gap-3 px-6 text-center">
      <span className="text-brand" aria-hidden="true">
        <TriangleAlert className="size-10" strokeWidth={2} />
      </span>
      <h1 className="text-lg font-semibold">Something went wrong</h1>
      <p className="max-w-md text-sm break-words text-muted">{errorMessage(error)}</p>
    </main>
  );
}

export function AppNotFound() {
  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center gap-3 px-6 text-center">
      <h1 className="text-lg font-semibold">Page not found</h1>
      <p className="max-w-md text-sm text-muted">
        That page does not exist on Swahivo.
      </p>
      <Link
        to="/"
        className="mt-2 inline-flex h-10 items-center rounded-lg bg-brand px-4 text-sm font-semibold text-paper"
      >
        Back home
      </Link>
    </main>
  );
}
