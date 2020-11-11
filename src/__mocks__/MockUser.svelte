<script>
  export let persist;
</script>

<div>Mock User Logged In</div>
<slot name="before" />
<slot user={{ uid: 'toto' }} auth={{}} />
{#if false }
  <slot name="signed-out" />
{/if}
<slot name="after" />
