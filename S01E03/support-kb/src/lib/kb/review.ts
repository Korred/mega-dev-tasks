import { groupByCause, uniqueById, type Report, type Tenant } from './causes.ts';

// Keep the exported desk accounting; flag contradictory evidence without silently reassigning it.
// Investigation IDs identify follow-ups inside that accounting, not additional reports.
export function reviewReports(rows: Report[], tenantOf: (r: Report) => Tenant | undefined, unresolvedIds: readonly string[]) {
  const reports = uniqueById(rows).filter(r => r.mergedInto === 4471);
  const held = new Set(unresolvedIds);
  return {
    reports,
    groups: groupByCause(reports, tenantOf),
    unresolved: reports.filter(r => held.has(r.id)),
  };
}
