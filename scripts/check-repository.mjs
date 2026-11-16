import { execFileSync } from "node:child_process";

// Checking the index catches files that were force-added despite the ignore rules.
const ignoredTrackedFiles = execFileSync(
  "git",
  ["ls-files", "-z", "--cached", "--ignored", "--exclude-from=.gitignore"],
  { encoding: "utf8" },
)
  .split("\0")
  .filter(Boolean);

if (ignoredTrackedFiles.length > 0) {
  console.error("Remove these ignored paths from the Git index:");
  for (const path of ignoredTrackedFiles) {
    console.error(JSON.stringify(path));
  }
  process.exitCode = 1;
}
