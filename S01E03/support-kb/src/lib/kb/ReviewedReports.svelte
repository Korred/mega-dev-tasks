<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { tenantOf } from '#lib/kb/locales';
  import { reviewReports } from '#lib/kb/review';
  import type { Report } from '#lib/kb/causes';

  const reviewed = reviewReports(reports as Report[], tenantOf, notes.oneDayMove);
</script>

<p><strong>{reviewed.reports.length}</strong> distinct reports · <strong>{reports.length - reviewed.reports.length}</strong> repeated export rows removed.</p>
<table>
  <thead><tr><th>reviewed group</th><th>reports</th><th>status</th></tr></thead>
  <tbody>
    {#each reviewed.groups as group (group.cause)}
      <tr><td>{group.cause === 'parser' ? 'Shared parser (exported desk group)' : 'Booking-v3 form hint'}</td><td>{group.reports.length}</td><td>Exported classification; cause is not proved for every report</td></tr>
    {/each}
    {#each reviewed.unresolved as report (report.id)}
      <tr><td>Investigate {report.id}</td><td>1</td><td>Included in parser count; cause unconfirmed</td></tr>
    {/each}
  </tbody>
</table>

<p>The two desk groups cover every distinct report once. Each investigation follows up a report already included in the exported parser count; do not add those counts to the total.</p>
