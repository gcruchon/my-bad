<script>
  export let persist;
</script>

<div>Mock User Not Logged In</div>
<slot name="before" />
<slot name="signed-out" />
{#if false}
  <slot user={{}} auth={{}} />
{/if}
<slot name="after" />
