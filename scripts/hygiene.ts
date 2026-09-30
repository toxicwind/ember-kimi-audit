// Local mirror of .github/workflows/ci.yml hygiene checks.
// Usage: bun scripts/hygiene.ts   (or: bun run audit)
import { Glob } from "bun";
import { $ } from "bun";

let failures = 0;
const fail = (msg: string) => { console.error(`FAIL ${msg}`); failures++; };
const ok = (msg: string) => console.log(`ok ${msg}`);

// 1. scripts parse
{
  const ts = [];
  for await (const f of new Glob("scripts/*.ts").scan(".")) ts.push(f);
  let bad = false;
  for (const f of ts) {
    const r = await $`bun build ${f} --external '*' --outfile /dev/null`.quiet().nothrow();
    if (r.exitCode !== 0) { console.error(`  parse failed: ${f}`); bad = true; }
  }
  bad ? fail("scripts parse") : ok(`scripts parse (${ts.length} files)`);
}

// 2. data snapshots are valid JSON
{
  let n = 0, bad = false;
  for await (const f of new Glob("data/*.json").scan(".")) {
    n++;
    try { JSON.parse(await Bun.file(f).text()); }
    catch { console.error(`  invalid JSON: ${f}`); bad = true; }
  }
  bad ? fail("data snapshots valid JSON") : ok(`data snapshots valid JSON (${n} files)`);
}

// 3. internal README/docs links resolve
{
  const mdFiles: string[] = [];
  for await (const f of new Glob("**/*.md").scan(".")) mdFiles.push(f);
  const allFiles = new Set<string>();
  for await (const f of new Glob("**/*").scan({ cwd: ".", dot: true })) allFiles.add(f);
  let bad = 0;
  for (const f of mdFiles) {
    const t = await Bun.file(f).text();
    for (const m of t.matchAll(/\]\((?!https?:|mailto:|#)([^)#]+)(#[^)]*)?\)/g)) {
      const dir = f.includes("/") ? f.slice(0, f.lastIndexOf("/") + 1) : "";
      const path = (dir + m[1]).split("#")[0] || f;
      if (!allFiles.has(path)) { console.error(`  BROKEN ${f}: ${m[1]}`); bad++; }
    }
  }
  bad ? fail("internal links resolve") : ok(`internal links resolve (${mdFiles.length} markdown files)`);
}

// 4. no secrets committed
{
  const ls = await $`git ls-files`.quiet().nothrow().text();
  const envTracked = ls.split("\n").some((l) => l.trim() === ".env");
  const g = await $`grep -riE 'sk-(live|ant)-[A-Za-z0-9]{16,}' --include='*.ts' --include='*.md' .`.quiet().nothrow();
  const keyHits = g.text().split("\n").filter((l) => l.trim() && !l.includes("hidden"));
  if (envTracked) { console.error("  .env is tracked"); fail("no secrets committed"); }
  else if (keyHits.length) { for (const h of keyHits.slice(0, 5)) console.error(`  ${h}`); fail("no secrets committed"); }
  else ok("no secrets committed");
}

if (failures) { console.error(`\nhygiene: ${failures} check(s) FAILED`); process.exit(1); }
console.log("\nhygiene: all checks passed");
