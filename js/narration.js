/**
 * Owner narration only. Drop your recorded clips in /voices as
 *   voices/{courseId}-{lessonId}.webm  (or .mp3 / .ogg)
 *   voices/kids-{setId}-{Name}.webm     (spaces become -)
 * Use tools/record-owner.html locally to record and download with the right name.
 * Learners never record. There is no cloud / device TTS for lesson phrases.
 */
(function () {
  const EXT = [".webm", ".mp3", ".ogg", ".m4a"];
  const cache = Object.create(null);

  function kidKey(setId, name) {
    return `kids-${setId}-${String(name).replace(/\s+/g, "-")}`;
  }

  function lessonKey(courseId, lessonId) {
    return `${courseId}-${lessonId}`;
  }

  function candidates(stem) {
    const custom = (window.NARRATION_FILES || {})[stem];
    const list = custom ? [custom] : EXT.map((e) => `voices/${stem}${e}`);
    return list;
  }

  async function resolve(stem) {
    if (stem in cache) return cache[stem];
    for (const src of candidates(stem)) {
      try {
        const res = await fetch(src, { method: "HEAD", cache: "force-cache" });
        if (res.ok) {
          cache[stem] = src;
          return src;
        }
      } catch (e) { /* try next */ }
    }
    // Some hosts reject HEAD; try a tiny ranged GET once for the first candidate.
    for (const src of candidates(stem)) {
      try {
        const res = await fetch(src, { method: "GET", headers: { Range: "bytes=0-1" }, cache: "force-cache" });
        if (res.ok || res.status === 206) {
          cache[stem] = src;
          return src;
        }
      } catch (e) { /* try next */ }
    }
    cache[stem] = null;
    return null;
  }

  let current = null;
  function stop() {
    if (current) {
      current.pause();
      current = null;
    }
  }

  function playSrc(src) {
    stop();
    return new Promise((resolve) => {
      const a = new Audio(src);
      current = a;
      a.addEventListener("ended", () => resolve(true), { once: true });
      a.addEventListener("error", () => resolve(false), { once: true });
      a.play().catch(() => resolve(false));
    });
  }

  async function playLesson(courseId, lessonId) {
    const src = await resolve(lessonKey(courseId, lessonId));
    return src ? playSrc(src) : false;
  }

  async function playKid(setId, name) {
    const src = await resolve(kidKey(setId, name));
    return src ? playSrc(src) : false;
  }

  async function hasLesson(courseId, lessonId) {
    return !!(await resolve(lessonKey(courseId, lessonId)));
  }

  window.NARRATION = {
    playLesson,
    playKid,
    hasLesson,
    stop,
    lessonKey,
    kidKey,
    resolve
  };
})();
