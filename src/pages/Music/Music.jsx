import React, { useEffect, useState } from "react";
import { FaMusic, FaSpotify, FaSoundcloud, FaYoutube } from "react-icons/fa";
import { SiApplemusic } from "react-icons/si";

const musicProfiles = [
  { label: "Spotify", href: "https://open.spotify.com/artist/7q2980YfC9zPRjX5UgGvCq", icon: FaSpotify },
  { label: "Apple Music", href: "https://music.apple.com/us/artist/marc-delacruz/1682167472", icon: SiApplemusic },
  { label: "YouTube", href: "https://www.youtube.com/@itsmarcdelacruz", icon: FaYoutube },
  // Keep as an option if you add SoundCloud later.
  { label: "SoundCloud", href: "", icon: FaSoundcloud },
];

const isValidUrl = (value) => typeof value === "string" && value.trim().startsWith("http");
const spotifyArtistEmbed = "https://open.spotify.com/embed/artist/7q2980YfC9zPRjX5UgGvCq";

export default function Music() {
  const [latestYouTube, setLatestYouTube] = useState(null);

  useEffect(() => {
    // This file is generated automatically via GitHub Actions (see .github/workflows).
    // In local dev it will just fall back to the channel embed if it doesn't exist yet.
    fetch("/music/latest-youtube.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && data.video && isValidUrl(data.video.embedUrl)) setLatestYouTube(data);
      })
      .catch(() => {});
  }, []);

  return (
    <main className="min-h-screen bg-[#04081A] text-white pt-28 pb-16 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(50,50,70,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(50,50,70,0.15)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_45%,#000_70%,transparent_100%)]" />

      <section className="relative container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-start gap-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur">
            <FaMusic className="text-cyan-300" />
            <span className="text-sm text-gray-200">Side quest</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text">
            Music
          </h1>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            I make music for fun alongside software dev. This page is a simple home for embeds and
            quick previews—clean, lightweight, and easy to update.
          </p>
        </div>

        {/* Profile links */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
          {musicProfiles
            .filter((p) => isValidUrl(p.href))
            .map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] transition-colors px-5 py-4"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10">
                    <Icon className="text-white/90" />
                  </span>
                  <div className="flex flex-col">
                    <span className="font-semibold">{label}</span>
                    <span className="text-xs text-gray-400">Listen ↗</span>
                  </div>
                </div>
                <span className="text-gray-400 group-hover:text-gray-200 transition-colors">↗</span>
              </a>
            ))}
        </div>

        {/* If no profiles yet, show a gentle placeholder */}
        {musicProfiles.every((p) => !isValidUrl(p.href)) && (
          <div className="mt-10 rounded-xl border border-dashed border-white/15 bg-white/[0.03] p-6 max-w-3xl">
            <p className="text-gray-300 font-medium">Add your music links (optional)</p>
            <p className="text-gray-400 text-sm mt-1">
              Update <code className="text-gray-200">musicProfiles</code> in{" "}
              <code className="text-gray-200">src/pages/Music/Music.jsx</code> with your Spotify /
              SoundCloud / YouTube URLs.
            </p>
          </div>
        )}

        {/* Embeds */}
        <div className="mt-12">
          <div className="flex items-center gap-4 mb-5">
            <h2 className="text-2xl font-bold">Showcase</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-500/60 to-purple-500/30" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">Latest release</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Auto-updated from YouTube (no manual site edits)
                    </p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                    YouTube
                  </span>
                </div>
              </div>

              {isValidUrl(latestYouTube?.video?.embedUrl) ? (
                <iframe
                  title="Latest release"
                  src={latestYouTube.video.embedUrl}
                  width="100%"
                  height={352}
                  style={{ border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                <div className="px-6 pb-6">
                  <div className="rounded-xl border border-dashed border-white/15 bg-black/20 p-5">
                    <p className="text-sm text-gray-300 font-medium">Latest release not loaded yet</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Once the GitHub Action runs, this will embed your newest release from{" "}
                      <a
                        className="text-gray-200 underline underline-offset-4"
                        href="https://www.youtube.com/@itsmarcdelacruz/releases"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        YouTube Releases
                      </a>
                      .
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">Spotify artist</h3>
                    <p className="text-sm text-gray-400 mt-1">Always up to date (Spotify embed)</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                    Spotify
                  </span>
                </div>
              </div>

              <iframe
                title="Spotify Artist"
                src={spotifyArtistEmbed}
                width="100%"
                height={352}
                style={{ border: 0 }}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


