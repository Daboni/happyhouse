<template>
  <b-card no-body>
    <b-card-header class="border-0">
      <div style="display:flex; justify-content: space-between;align-items: center;">
        <h3 class="mb-0">글수정</h3>
      </div>
    </b-card-header>
    <b-card>
      <editor type = "modify"/>
    </b-card>
  </b-card>
</template>
<script>

import Editor from "@/components/toastui/smartui"

export default {
  name: "postUpdate",
  components: {
    Editor,
  },
}
</script>

<style scoped>

</style>
