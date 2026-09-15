# Jalur Decision Log

This file is the persistent record of major product and scope decisions for **Jalur**. It exists so future sessions (and agents) inherit settled conclusions instead of re-deriving them.

## Rules

- **Append-only** — decisions are never edited or rewritten. If a decision changes, mark the old entry `superseded by #<n>` and add a new entry.
- **Newest at top.** Insert new entries directly below the `## Open Decisions` anchor.
- **Recorded by** — the brainstorming agent appends an entry whenever a major call is settled during a session. You can also add entries by hand.
- **Engineering rules** do not go here — they belong in `.ai/rules` when that directory exists.

## Open Decisions

- None — core loop fully specified.

---

## Log

## 2026-09-16 — Career detail page fields (final)

- Decision: Career detail page ships with five sections: **why-this-fit** (personalized match explanation), **day-in-the-life** (what they actually do), **requirements** (already exists, skill list with levels + suggested actions), **your-path-ahead** (levels + branch careers, absorbing related-paths as branches), and **pick-CTA** ("Make this my Jalur"). Growth trajectory is in scope; related paths absorbed into trajectory branches.
- Rationale: "your-path-ahead" directly expresses the app's identity ("jalur = path") and eliminates redundant "related paths" section. Pick-CTA is required to convert exploration into commitment (drives roadmap/plan via career_target). Growth trajectory was confirmed as part of the brand ("RPG-like path evolution") and justifies keeping the app's name meaningful.
- Alternatives rejected: growth trajectory as separate optional section (merged into path-ahead instead); keeping related paths as standalone section (absorbed into branches).
- Status: accepted

## 2026-09-16 — Results = top-3 reveal + separate Find Your Jalur browse

- Decision: The Results screen shows the Career DNA profile **and** the top 3 recommended paths (one payoff moment). A separate "Find Your Jalur" screen is the browse-all discovery activity, navigable from Results; the catalog is expected to grow so browsing becomes a real activity.
- Rationale: decision moment (top 3) and discovery activity (browse) have different jobs and deserve separate screens. Follows the "Top Picks vs Browse" pattern. Prevents the reveal from turning into a browsing task.
- Sharpenings settled here: exactly 3 recommended paths; both views share one user-computed match engine (top 3 = LIMIT 3, browse = all careers sorted by same score); match percentage must always read as "match for you", never a static career property.
- Alternatives rejected: browse-only flow (no curated reveal); results-only flow (no discovery surface as catalog grows).
- Status: accepted

## 2026-09-16 — Career DNA model & Find Your Jalur flow

- Decision: Career DNA is a **profile** (a mix of traits), not a single archetype label. Recommended paths are computed from the profile; archetype labeling is retired from the user-facing result. "Find Your Jalur" = a short ranked list of recommended paths, each linking to a career detail page.
- Rationale: label bucketing forced mixed profiles into the nearest stereotype; the displayed `/100` score came from a static pivot value (best career↔DNA match), not from the user's answers — undermining trust. A profile model supports honest, user-computed matching and is consistent with the current 7-trait instrument.
- Alternatives rejected: DNA as label/archetype (MBTI-style single-type result).
- Status: accepted

## 2026-09-16 — Career DNA model & Find Your Jalur flow

- Decision: Career DNA is a **profile** (a mix of traits), not a single archetype label. Recommended paths are computed from the profile; archetype labeling is retired from the user-facing result. "Find Your Jalur" = a short ranked list of recommended paths, each linking to a career detail page.
- Rationale: label bucketing forced mixed profiles into the nearest stereotype; the displayed `/100` score came from a static pivot value (best career↔DNA match), not from the user's answers — undermining trust. A profile model supports honest, user-computed matching and is consistent with the current 7-trait instrument.
- Alternatives rejected: DNA as label/archetype (MBTI-style single-type result).
- Status: accepted