<template>
  <div id='foot'>
    <div class="container">
      <router-link to="/miss"><img src="/static/images/foot.jpg"></router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'foot'
}
</script>
<style scoped>
.container{
  height: 500px;
  margin-top: 100px;
}
img{
  margin-top: 100px;
  height: 500px;
  width: 100%;
}
</style>
