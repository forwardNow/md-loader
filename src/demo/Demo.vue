<template>
  <div class="demo">
    <div class="demo__component">
      <slot name="component" />
    </div>
    <div class="demo_code">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Demo',
};
</script>
