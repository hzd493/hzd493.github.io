<template>
  <div id="app">
    <!-- <Test></Test> -->
    <top-bar></top-bar>
    <router-view></router-view>
    <foot></foot>
  </div>
</template>

<script>
import TopBar from './components/TopBar'
import Foot from './components/Footer'
export default {
  name: 'App',
  components: {
    TopBar,
    Foot
  },
  methods: {
    init () {
      if (JSON.parse(localStorage.getItem('iflogin')) === 0) {
        this.$store.state.ifLogin = false
      } else {
        this.$store.state.ifLogin = true
      }
      // this.$store.state.ifLogin = JSON.parse(localStorage.getItem("iflogin"))
      this.$store.state.currentUser = JSON.parse(localStorage.getItem('user'))
    }
  },
  mounted () {
    this.init()
    // if (this.$route.path !== '/') {
    //   this.$router.push('/')
    // }
  }
}
</script>

<style scoped>

</style>
