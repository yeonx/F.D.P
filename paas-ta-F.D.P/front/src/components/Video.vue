<template>
  <div>
      <video muted
        ref="hello"
        autoPlay></video>
  </div>
</template>

<script>
export default {
  props:["stream"],
  mounted(){
    this.$refs.hello.srcObject=this.stream;
  }
}
</script>

<style>

</style>