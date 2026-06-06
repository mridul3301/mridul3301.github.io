// Client-side fallback for greeting. This repository is intended to be
// a static site (GitHub Pages), so server-only RPC handlers are removed.
// Use this simple client-side function instead of a server function.

export async function getGreeting({ name }: { name: string }) {
  if (!name || name.length === 0) {
    throw new Error("name is required");
  }

  // Read mode from Vite env (available at build/runtime in the client)
  const mode = (import.meta.env.MODE as string) ?? "unknown";
  return {
    greeting: `Hello, ${name}!`,
    mode,
  };
}
