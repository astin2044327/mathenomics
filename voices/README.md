# Owner narration clips

Put **your** spoken audio here. Learners never record.

## Kids: one voice sample → every name

The phone/laptop **cannot** turn a single word like “Dog” into your voice for every card by itself. That needs **voice cloning**.

### Recommended workflow

1. Open [`tools/voice-sample.html`](../tools/voice-sample.html) and record **~30–60 seconds** reading the on-screen script (not just one word).
2. Download as `voices/_sample.webm` (or convert to `.mp3`).
3. Get an [ElevenLabs](https://elevenlabs.io) API key, then from the project root:

```bash
export ELEVENLABS_API_KEY=your_key_here
node tools/generate-kids-voice.mjs
```

4. That clones your sample once, then writes `kids-{set}-{Name}.mp3` for every A–Z card (animals, fruits, food, vehicles, music).
5. Hard-refresh Mathenomics. **Hear name & sound** plays your clip first, then the real animal (or other) sound.

Reuse an existing clone next time:

```bash
export ELEVENLABS_API_KEY=your_key_here
export ELEVENLABS_VOICE_ID=$(cat voices/_voice_id.txt)
node tools/generate-kids-voice.mjs
```

Optional: `ONLY=animals` · `DRY=1` (list jobs only) · `SAMPLE=voices/_sample.mp3`

Until a clip exists for a kids card, the app falls back to the **device** speaking voice (not a cloud AI in the app). Lesson phrases still need a clip or they show “not added yet.”

## Naming

| Kind | File name |
| --- | --- |
| Lesson | `{courseId}-{lessonId}.webm` e.g. `g3-nines.webm` |
| Kids | `kids-{setId}-{Name}.webm` (or `.mp3`) e.g. `kids-animals-Dog.mp3` |

Also accepts `.ogg`, `.m4a`.

## Record one clip by hand

1. Open [`tools/record-owner.html`](../tools/record-owner.html).
2. Kind → Kids picture name (or Lesson).
3. Record → Download → move into this folder.
