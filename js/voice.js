/** Your own voice: record a clip for any phrase or picture and play it instead of the device voice. Clips stay on this device. */
(function () {
  const DB = "mathenomics-voice";
  const STORE = "clips";
  const MAX_SECONDS = 12;
  let dbp = null;

  function db() {
    if (!window.indexedDB) return Promise.reject(new Error("no storage"));
    dbp = dbp || new Promise((resolve, reject) => {
      const req = indexedDB.open(DB, 1);
      req.onupgradeneeded = () => req.result.createObjectStore(STORE);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return dbp;
  }

  function tx(mode, fn) {
    return db().then((d) => new Promise((resolve, reject) => {
      const t = d.transaction(STORE, mode);
      const req = fn(t.objectStore(STORE));
      t.oncomplete = () => resolve(req && req.result);
      t.onerror = () => reject(t.error);
    }));
  }

  const get = (key) => tx("readonly", (s) => s.get(key)).catch(() => null);
  const put = (key, blob) => tx("readwrite", (s) => s.put(blob, key));
  const remove = (key) => tx("readwrite", (s) => s.delete(key));

  let current = null;
  function stopPlayback() {
    if (current) { current.pause(); current = null; }
  }

  /** Play a clip. Resolves true if a clip existed and started. */
  function playBlob(blob) {
    stopPlayback();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    current = audio;
    audio.addEventListener("ended", () => URL.revokeObjectURL(url), { once: true });
    return audio.play().then(() => true, () => false);
  }

  async function play(key) {
    const blob = await get(key);
    return blob ? playBlob(blob) : false;
  }

  const supported = () => !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);

  /** Start recording. Returns { stop() } and calls onDone(blob) when the clip is saved. */
  async function record(key, onDone) {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    const type = ["audio/webm;codecs=opus", "audio/mp4", "audio/webm"].find((t) => MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(t));
    const rec = new MediaRecorder(stream, type ? { mimeType: type } : undefined);
    const parts = [];
    rec.addEventListener("dataavailable", (e) => { if (e.data.size) parts.push(e.data); });
    rec.addEventListener("stop", async () => {
      stream.getTracks().forEach((t) => t.stop());
      const blob = new Blob(parts, { type: rec.mimeType || type || "audio/webm" });
      if (blob.size) await put(key, blob);
      onDone(blob.size ? blob : null);
    });
    rec.start();
    const timer = window.setTimeout(() => rec.state === "recording" && rec.stop(), MAX_SECONDS * 1000);
    return {
      stop() {
        window.clearTimeout(timer);
        if (rec.state === "recording") rec.stop();
      }
    };
  }

  async function has(key) {
    return !!(await get(key));
  }

  window.VOICE = { supported, has, play, playBlob, record, remove, stop: stopPlayback, MAX_SECONDS };
})();
