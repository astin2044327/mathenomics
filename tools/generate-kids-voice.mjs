#!/usr/bin/env node
/**
 * Clone YOUR voice once, then generate every kids-corner name into voices/.
 *
 * Prerequisites:
 *   1. Record ~30–60s at tools/voice-sample.html → save as voices/_sample.webm (or .mp3/.wav)
 *   2. export ELEVENLABS_API_KEY=...
 *   3. node tools/generate-kids-voice.mjs
 *
 * Optional:
 *   ELEVENLABS_VOICE_ID=existing_id   # skip cloning, reuse a voice
 *   SAMPLE=voices/_sample.mp3
 *   ONLY=animals                     # one set id
 *   DRY=1                            # list lines only
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const VOICES = path.join(ROOT, "voices");
const API = "https://api.elevenlabs.io/v1";
const KEY = process.env.ELEVENLABS_API_KEY || "";
const ONLY = process.env.ONLY || "";
const DRY = process.env.DRY === "1";
const SAMPLE =
  process.env.SAMPLE ||
  ["_sample.webm", "_sample.mp3", "_sample.wav", "_sample.m4a", "_sample.ogg"]
    .map((n) => path.join(VOICES, n))
    .find((p) => fs.existsSync(p));

function letterOf(name) {
  const ch = String(name).replace(/[^A-Za-z]/g, "").charAt(0).toUpperCase();
  return ch || "?";
}

function kidStem(setId, name) {
  return `kids-${setId}-${String(name).replace(/\s+/g, "-")}`;
}

function loadKids() {
  const src = fs.readFileSync(path.join(ROOT, "js/kids.js"), "utf8");
  const sets = [];
  const setRe = /\{\s*id:\s*"([^"]+)"[\s\S]*?items:\s*\[([\s\S]*?)\]\s*\}/g;
  let m;
  while ((m = setRe.exec(src))) {
    const id = m[1];
    const names = [...m[2].matchAll(/\["([^"]+)"/g)].map((x) => x[1]);
    sets.push({ id, names });
  }
  return sets;
}

async function cloneVoice(samplePath) {
  const form = new FormData();
  form.append("name", "Mathenomics owner");
  form.append("description", "Owner narration for Mathenomics kids corner");
  const buf = fs.readFileSync(samplePath);
  const ext = path.extname(samplePath).toLowerCase();
  const type =
    ext === ".mp3" ? "audio/mpeg" :
    ext === ".wav" ? "audio/wav" :
    ext === ".m4a" ? "audio/mp4" :
    ext === ".ogg" ? "audio/ogg" : "audio/webm";
  form.append("files", new Blob([buf], { type }), path.basename(samplePath));

  const res = await fetch(`${API}/voices/add`, {
    method: "POST",
    headers: { "xi-api-key": KEY },
    body: form
  });
  if (!res.ok) {
    throw new Error(`Clone failed ${res.status}: ${await res.text()}`);
  }
  const data = await res.json();
  return data.voice_id;
}

async function speak(voiceId, text, outPath) {
  const res = await fetch(`${API}/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
    method: "POST",
    headers: {
      "xi-api-key": KEY,
      "Content-Type": "application/json",
      Accept: "audio/mpeg"
    },
    body: JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: { stability: 0.45, similarity_boost: 0.8, style: 0.15, use_speaker_boost: true }
    })
  });
  if (!res.ok) {
    throw new Error(`TTS failed ${res.status} for "${text}": ${await res.text()}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outPath, buf);
  return buf.length;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  if (!KEY && !DRY) {
    console.error("Set ELEVENLABS_API_KEY first.\n  export ELEVENLABS_API_KEY=...");
    process.exit(1);
  }
  if (!DRY && !process.env.ELEVENLABS_VOICE_ID && !SAMPLE) {
    console.error("Missing voices/_sample.webm (or .mp3). Record it at tools/voice-sample.html");
    process.exit(1);
  }

  fs.mkdirSync(VOICES, { recursive: true });
  let voiceId = process.env.ELEVENLABS_VOICE_ID || "";
  if (!DRY && !voiceId) {
    console.log("Cloning voice from", SAMPLE);
    voiceId = await cloneVoice(SAMPLE);
    console.log("voice_id:", voiceId);
    fs.writeFileSync(path.join(VOICES, "_voice_id.txt"), voiceId + "\n");
  } else if (voiceId) {
    console.log("Using ELEVENLABS_VOICE_ID", voiceId);
  }

  const sets = loadKids().filter((s) => !ONLY || s.id === ONLY);
  const jobs = [];
  for (const set of sets) {
    for (const name of set.names) {
      const L = letterOf(name);
      const text = `${L} is for ${name}. ${name}.`;
      const stem = kidStem(set.id, name);
      jobs.push({ set: set.id, name, text, out: path.join(VOICES, `${stem}.mp3`) });
    }
  }

  console.log(`${jobs.length} clips to generate${ONLY ? ` (set=${ONLY})` : ""}`);
  if (DRY) {
    jobs.slice(0, 8).forEach((j) => console.log(" ", j.out, "←", j.text));
    if (jobs.length > 8) console.log("  …");
    return;
  }

  let ok = 0;
  for (const job of jobs) {
    process.stdout.write(`→ ${path.basename(job.out)} … `);
    try {
      const n = await speak(voiceId, job.text, job.out);
      console.log(`${(n / 1024).toFixed(1)} KB`);
      ok += 1;
    } catch (e) {
      console.log("FAIL");
      console.error(e.message || e);
    }
    await sleep(350);
  }
  console.log(`Done: ${ok}/${jobs.length}. Reload Kids’ corner — Hear uses your clips first.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
