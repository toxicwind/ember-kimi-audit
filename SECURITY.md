# Security Policy

## Scope

This repository is an **audit of public claims** about Fireworks' Ember-1 and
Moonshot's Kimi K3. It ships no model weights, no API keys, and no credentials.
The scripts in `scripts/` query only **public, unauthenticated APIs**
(Hugging Face Hub, OpenRouter catalog, article/blog URLs).

## Reporting a vulnerability

If you find a security issue in this repo's code or CI — for example, a script
that exfiltrates data, a workflow that leaks secrets, or a dependency with a
known CVE — please open a GitHub issue with the `security` label, or email
toxicwind@gmail.com.

**Do not** report model-behavior issues here (jailbreaks, prompt injection,
etc.) — those belong to the model publishers (Fireworks AI, Moonshot AI).

## What we promise

* We will acknowledge reports within 72 hours.
* We will not ask you to run anything privileged; the live-check lanes need no
  credentials and never write outside the repo.
* The `.env` file is gitignored — if you ever see a committed secret, report
  it immediately and we will rotate and purge.

## Supported versions

Only `main` is supported. This audit tracks live sources that rot fast —
stale checkouts should re-run `bun scripts/live-check.ts` before trusting
anything.
