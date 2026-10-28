<script lang="ts">
  import update from '#lib/data/engineering-4471.json';
  import reports from '#lib/data/reports-4471.json';
  import { uniqueById, groupByCause, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';

  const groups = groupByCause(uniqueById(reports as Report[]).filter(r => r.mergedInto === update.ticket), tenantOf);
</script>

<p><a href={update.source}>Course engineering update</a> · #{update.ticket} closed {update.closedOn} · checked {update.observedOn}.</p>
<table>
  <thead><tr><th>problem</th><th>exported reports</th><th>outcome</th><th>engineering evidence</th><th>our ticket</th></tr></thead>
  <tbody>
    {#each update.outcomes as outcome (outcome.cause)}
      <tr>
        <td>{outcome.cause}</td>
        <td>{groups.find(g => g.cause === outcome.cause)?.reports.length ?? 'unknown'}</td>
        <td>{outcome.status}</td>
        <td>{outcome.evidence}</td>
        <td><a href={`https://github.com/Korred/mega-dev-tasks/issues/${outcome.issue}`}>#{outcome.issue}</a></td>
      </tr>
    {/each}
  </tbody>
</table>
