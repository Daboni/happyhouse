<template>
  <div style="width:150px;text-align:center;padding:6px 0;">
    <div>
      {{name}}
    </div>

  </div>
</template>

<script>
export default {
  name: "InfoWindow",
  props:{
    name: String,
  },

}
</script>

<style scoped>

</style>
