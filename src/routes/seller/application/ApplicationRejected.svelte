<script lang="ts">
  export let remark: string;
</script>

<p>Youre application is rejected.</p>
<p>REMARK: {remark}</p>
<form method="post" action="?/reapply">
  <button type="submit" class="variant-filled btn mt-4 w-full">Reapply</button>
</form>
