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

export interface ResolveShaOptions {
  repository: string;
  ref: string;
  cacheDir: string;
}

export async function resolveCommitSha(opts: ResolveShaOptions): Promise<string> {
  const cachePath = join(opts.cacheDir, opts.ref, ".commit-sha");

  try {
    const cached = (await readFile(cachePath, "utf8")).trim();
    if (/^[0-9a-f]{40}$/i.test(cached)) return cached;
  } catch {
    // fall through
  }

  const url = `https://api.github.com/repos/${opts.repository}/commits/${opts.ref}`;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "musescore-sdk-types-generator",
  };
  const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(
      `Failed to resolve commit SHA for ${opts.repository}@${opts.ref}: HTTP ${res.status}. Set GITHUB_TOKEN to avoid rate limits.`,
    );
  }
  const body = (await res.json()) as { sha?: string };
  if (!body.sha) {
    throw new Error(`GitHub API returned no sha for ${opts.repository}@${opts.ref}`);
  }

  await mkdir(dirname(cachePath), { recursive: true });
  await writeFile(cachePath, body.sha, "utf8");
  return body.sha;
}
