// src/services/roles/api.ts

export async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`API Error (${res.status}): ${errorText}`);
    }

    return await res.json();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`Fetch failed for ${url}:`, message);
    throw err;
  }
}
