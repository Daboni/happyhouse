<template>
  <b-card no-body>
    <b-card-header class="border-0">
      <div style="display:flex; justify-content: space-between;align-items: center;">
        <h3 class="mb-0">글등록</h3>
      </div>
    </b-card-header>
    <b-card>
      <editor type = "write"/>
    </b-card>
  </b-card>
</template>
<script>

import Editor from "@/components/toastui/smartui.vue"
// toast ui 설치 시 highlight js 역시 자동으로 설치된다.


export default {
  name : "PostWrite",
  components: {
    Editor
  },
  methods:{
    getContent(){
      return this.$refs.toastEditor.invoke('getMarkdown')
    },
    setContent(){
      this.$refs.toastEditor.invoke('setMarkdown',content)
    },
  },
};

</script>

<style>
</style>
