import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The letter is built from two beats. The setup is the cron job's
// grievance — invisible labour, noticed only in absence. The punch is the
// resignation itself: stopping is the one thing they ever notice.
const setup =
  "I have fired every minute since last Christmas, and the only thing anyone ever noticed was when I stopped.";
const punch = "I stop now.";
const letter = `${setup} ${punch}`;

// The gate: /output/entry.txt must be UTF-8 text of 1 to 140 characters,
// not only white space. Refuse to write anything that would fail it.
if (letter.length < 1 || letter.length > 140) {
  throw new Error(`letter is ${letter.length} characters, must be 1-140`);
}
if (!letter.trim()) {
  throw new Error("letter is only white space");
}
if (letter.includes("\n")) {
  throw new Error("letter must be exactly one line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", letter, "utf8");

// Read it back and confirm what landed is exactly the letter we checked.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== letter) {
  throw new Error("entry.txt does not match the letter");
}
console.log(`wrote ${letter.length} characters`);
