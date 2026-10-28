**Reports covered: 33 distinct reports** from #4471 in the 4 October 2026 export.

For day-first tenants on booking-v3, the form prints `MM/DD/YYYY`, but reads input in the tenant's day-first order. People following that hint can therefore get the wrong date. Changing the shared month-first parser alone will not correct the instruction shown by this form.

Affected tenant/form configuration: Alder Physio (`de-DE`, booking-v3), Copper Studio (`es-ES`, booking-v3), Pale Harbour (`pt-PT`, booking-v3). Only reports through the form channel enter this group.

Evidence: R-41230 (Copper Studio, form) reports 6 January becoming 1 June. R-41241 (Alder Physio, form) reports 6 August becoming 8 June. R-41251 (Pale Harbour, form) reports 7 January becoming 1 July. The tenant configuration plus `DATE_HINT` and `causeOf` in `src/lib/kb/causes.ts` distinguish this path from the shared parser problem.

Reproduction to verify against the product: open a booking-v3 form for a day-first tenant, observe the `MM/DD/YYYY` hint, and enter `01/06/2026` intending 6 January as instructed. Expected: 6 January, with hint and interpretation agreeing. The reported/modelled failure is 1 June. The export contains no running product, so this is a reproduction request rather than a completed live test.

Seen 17 April–22 September 2026 across three tenants. The count uses unique report IDs and tenant locale/form plus channel, not browser locale or intake tags: 15 of these reports were tagged `parser`, 18 `hint`. Align the hint, validation and actual interpretation, then verify ambiguous and unambiguous dates and supported locales. Keep a separate fix and verification from the parser issue.

Full report IDs: [report-assignments.json](https://github.com/Korred/mega-dev-tasks/blob/main/S01E03/report-assignments.json), group `hint`. Reproduce counts with `npm run check` in `S01E03/support-kb`.

## Closure evidence

The [course engineering update](https://hq.mega.dev/challenges/what-it-shows), checked on 28 October, states that #4471 closed on 5 October and the hint outcome is **won't fix**: **booking-v3 form retired**. Close this ticket as **not planned**, not completed or fixed. Retirement is the stated disposition; it does not establish that historical bookings were corrected. The parser issue has a separate fixed outcome.
