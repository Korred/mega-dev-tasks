import { groupByCause, uniqueById, type Report, type Tenant } from './causes.ts';

// Desk review can withhold a model assignment when the report's wording contradicts it.
// These IDs identify evidence to investigate; they do not establish a shared third cause.
export function reviewReports(rows: Report[], tenantOf: (r: Report) => Tenant | undefined, unresolvedIds: readonly string[]) {
  const reports = uniqueById(rows).filter(r => r.mergedInto === 4471);
  const held = new Set(unresolvedIds);
  return {
    reports,
    groups: groupByCause(reports.filter(r => !held.has(r.id)), tenantOf),
    unresolved: reports.filter(r => held.has(r.id)),
  };
}
