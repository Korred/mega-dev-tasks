import fs from 'node:fs';
import { reviewReports } from '../src/lib/kb/review.ts';

const root = new URL('../src/lib/data/', import.meta.url);
const read = path => JSON.parse(fs.readFileSync(new URL(path, root), 'utf8'));
const tenants = fs.readdirSync(new URL('tenants/', root)).map(file => read(`tenants/${file}`));
const reviewed = reviewReports(read('reports-4471.json'), r => tenants.find(t => t.handle === r.tenant), read('desk-notes.json').oneDayMove);
const groups = [...reviewed.groups.map(g => ({ group: g.cause, count: g.reports.length, reportIds: g.reports.map(r => r.id).sort() })), ...reviewed.unresolved.map(r => ({ group: `investigate-${r.id}`, count: 1, reportIds: [r.id] }))];
fs.writeFileSync(new URL('../../report-assignments.json', import.meta.url), JSON.stringify({ snapshot: '2026-10-04', ticket: 4471, total: reviewed.reports.length, groups }, null, 2) + '\n');
console.log('Report assignments exported');
