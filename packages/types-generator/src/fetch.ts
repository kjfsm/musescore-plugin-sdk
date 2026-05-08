import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

export interface FetchOptions {
  repository: string;
  ref: string;
  headers: string[];
  cacheDir: string;
}

export interface FetchedHeader {
  path: string;
  source: string;
}

export async function fetchHeaders(opts: FetchOptions): Promise<FetchedHeader[]> {
  const results: FetchedHeader[] = [];
  for (const path of opts.headers) {
    const cachePath = join(opts.cacheDir, opts.ref, path);
    let source: string | null = null;
    try {
      source = await readFile(cachePath, "utf8");
    } catch {
      source = null;
    }
    if (source === null) {
      const url = `https://raw.githubusercontent.com/${opts.repository}/${opts.ref}/${path}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch ${url}: HTTP ${res.status}`);
      }
      source = await res.text();
      await mkdir(dirname(cachePath), { recursive: true });
      await writeFile(cachePath, source, "utf8");
    }
    results.push({ path, source });
  }
  return results;
}

export async function resolveCommitSha(repository: string, ref: string): Promise<string> {
  const url = `https://api.github.com/repos/${repository}/commits/${ref}`;
  const res = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) return ref;
  const body = (await res.json()) as { sha?: string };
  return body.sha ?? ref;
}
