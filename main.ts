// Last Text at One Percent — make.fun entry
// Writes the funniest final text a dying phone sends at 1% battery
// to /output/entry.txt (1-200 chars, gate-checked here before writing).
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: a phone on its last percent uses its final text to snitch on
// its owner — screen time, mom left on read — then flips the blame: the
// phone is the one dying, yet somehow the owner is the disappointment.
const ENTRY =
  "quick — before i go: you scrolled 9 hours today, ignored mom's 3 texts, and now i'm the one at 1%. i'm dying and somehow you're still the disappointment.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });

const chars = [...ENTRY].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry is ${chars} characters, must be 1-200`);
}
if (!ENTRY.trim()) throw new Error("entry is only whitespace");

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read back and verify what landed on disk, byte for byte.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) throw new Error("read-back mismatch");
const sha256 = createHash("sha256").update(written, "utf8").digest("hex");
console.log(`wrote ${outPath} (${chars} chars, sha256 ${sha256})`);
console.log(written);
