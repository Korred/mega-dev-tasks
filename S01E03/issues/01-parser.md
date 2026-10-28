**Reports covered: 379 distinct reports**, as counted by the desk's exported view of #4471 on 4 October 2026.

The shared parser reads month first for tenants whose locale uses day-first dates. This differs from the booking-v3 hint problem: the parser interprets input in the wrong order, whereas the hint prompts people to type an order the form does not expect.

Evidence: R-41200 (Harbour Dental, app) says a 7 April reminder went out on 4 July. R-41203 (Lantern Row, app) says a 2 December booking became 12 February. The tenant directory gives `en-GB` and `cs-CZ`, respectively. `src/lib/kb/causes.ts` documents the month-first parser and classifies these paths using tenant locale, form and channel.

Reproduction to verify against the product: for a day-first tenant, submit `07/04/2026` through the shared-parser path and compare stored booking, invite and displayed date. Expected: 7 April. Reported failure: 4 July. The product itself is not included in this export, so this is a reproduction request, not a claim that a live test was run.

The count deduplicates overlapping export rows by report ID, selects reports merged into #4471, and applies the desk's exported tenant-based classifier. This group has 356 intake tags of `parser` and 23 of `hint`; intake tags do not decide the assignment.

Five reports remain included in this exported count even though their wording does not establish this cause: R-41202, R-41209, R-41236, R-41344 and R-41620. Each has its own investigation issue (#3–#7). Those are follow-ups within the 379, not five extra reports or confirmed parser failures. Keep the exported accounting explicit rather than silently changing its group count; amend future assignments if evidence establishes another cause.

Seen 1 April–4 October 2026 across 11 tenants. Verify the shared parser uses the tenant's intended date order, with regression checks on app/email and booking-v2 paths and confirmation that the booking-v3 form-hint fix remains separate. Do not close the unresolved investigations merely because this fix ships.

Full report IDs: [report-assignments.json](https://github.com/Korred/mega-dev-tasks/blob/main/S01E03/report-assignments.json), group `parser`. Reproduce counts with `npm run check` in `S01E03/support-kb`.
