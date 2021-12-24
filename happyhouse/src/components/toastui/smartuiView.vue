<template>
  <div >
    <Viewer ref="toastViewer" height="500px" />
  </div>
</template>

<script>
import { Viewer } from '@toast-ui/vue-editor'
import 'codemirror/lib/codemirror.css' // codemirror style
import '@toast-ui/editor/dist/toastui-editor.css' // Editor style

export default {
  name : 'smartuiView',

  components: {
    Viewer,
  },
  methods: {
    setContent(viewContent) {
      this.$refs.toastViewer.invoke('setMarkdown', viewContent)
    },
  },
}
</script>
