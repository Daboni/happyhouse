<template>
     <option class="bg-white dropdown-item" :value="codeName" > {{ name }}</option>




</template>

<script>
export default {
  name: "MapItem.vue",
  props:{
    type: String,
    name: String,
    code: String
  },
  computed:{
    codeName: function (){
      return this.code+"|"+this.name;
    }
  },
  methods:{
  }
}
</script>

<style scoped>

</style>
