import fs from "node:fs/promises";
import path from "node:path";

const HANDLE = process.env.YOUTUBE_HANDLE || "@itsmarcdelacruz";

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      // helps get consistent HTML from YouTube
      "User-Agent": "Mozilla/5.0 (compatible; github-actions; +https://github.com/)",
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Fetch failed: ${res.status} ${url} ${text.slice(0, 200)}`);
  }
  return res.text();
}

function extractFirst(regex, text) {
  const m = regex.exec(text);
  return m?.[1] || null;
}

function decodeEntities(str) {
  // minimal decoding for common entities we see in titles
  return String(str)
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

async function getLatestReleaseFromReleasesTab(handle) {
  const url = `https://www.youtube.com/${handle}/releases`;
  const html = await fetchText(url);

  // Try to also capture channelId if present (nice-to-have)
  const channelId =
    extractFirst(/"channelId"\s*:\s*"(UC[a-zA-Z0-9_-]{20,})"/, html) ||
    extractFirst(/"externalId"\s*:\s*"(UC[a-zA-Z0-9_-]{20,})"/, html) ||
    null;

  // The releases page contains ytInitialData; the first videoRenderer is typically the newest release item.
  const videoId = extractFirst(/"videoRenderer"\s*:\s*\{[^}]*?"videoId"\s*:\s*"([^"]+)"/, html);
  const rawTitle = extractFirst(
    /"videoRenderer"\s*:\s*\{[\s\S]*?"title"\s*:\s*\{"runs"\s*:\s*\[\{"text"\s*:\s*"([^"]+)"/,
    html
  );
  const publishedText = extractFirst(
    /"videoRenderer"\s*:\s*\{[\s\S]*?"publishedTimeText"\s*:\s*\{"simpleText"\s*:\s*"([^"]+)"/,
    html
  );

  if (!isNonEmptyString(videoId)) return null;

  const title = rawTitle ? decodeEntities(rawTitle) : null;
  return {
    channelId,
    video: {
      videoId,
      title,
      publishedText: publishedText ? decodeEntities(publishedText) : null,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
      sourceUrl: url,
    },
  };
}

async function main() {
  const latest = await getLatestReleaseFromReleasesTab(HANDLE);
  if (!latest?.video?.videoId) {
    throw new Error(`Could not find latest release from https://www.youtube.com/${HANDLE}/releases`);
  }

  const out = {
    updatedAt: new Date().toISOString(),
    channel: { handle: HANDLE, channelId: latest.channelId || null },
    video: latest.video,
  };

  const outPath = path.join(process.cwd(), "public", "music", "latest-youtube.json");
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, JSON.stringify(out, null, 2) + "\n", "utf8");
  console.log(`Wrote ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


