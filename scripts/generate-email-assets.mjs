import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const mark = readFileSync(join(root, "server/assets/certifygrc-mark.png")).toString("base64");
const logo = readFileSync(join(root, "server/assets/certifygrc-logo-email.png")).toString("base64");

writeFileSync(
  join(root, "server/emailAssetData.ts"),
  `// Auto-generated — run: npm run generate:email-assets
export const EMAIL_MARK_DATA_URI = "data:image/png;base64,${mark}";
export const EMAIL_LOGO_DATA_URI = "data:image/png;base64,${logo}";
`,
);

console.log("Generated server/emailAssetData.ts");
