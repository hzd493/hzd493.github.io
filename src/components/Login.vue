<template>
  <div name='login'>
    <div class="container">
      <div class="body">
        <img src="https://account.xiaomi.com/static/res/349d9c1/account-static/respassport/acc-2014/img/milogo.png" alt="logo"><br>
        <h1>小米用户登录</h1><br>
        <b>还没账号？点击<router-link to="/register">&nbsp;&nbsp;注册</router-link></b>
        <div class="main">
          <p>账号</p>
          <Input v-model='loginUser.username' prefix="ios-people-outline" placeholder="手机号/邮箱/用户名" on-enter="abc()"/>
          <p>密码</p>
          <Input v-model='loginUser.password' prefix="ios-lock-outline" type="password" password placeholder="请输入密码" /><br><br>
          <p class="register"><Button type="warning" @click="login">登录</Button></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      loginUser: {
        username: 'admin',
        password: '123456'
      },
      users: []
    }
  },
  methods: {
    login () {
      this.$axios.get('http://localhost:3000/users').then((data) => {
        this.users = data['data']
        for (var i = 0; i < this.users.length; i++) {
          if ((this.loginUser.username === this.users[i].username || this.loginUser.username === this.users[i].phone || this.loginUser.username === this.users[i].email) && this.loginUser.password === this.users[i].password) {
            // eslint-disable-next-line no-undef
            swal(
              {
                title: '登录成功',
                type: 'success',
                confirmButtonColor: '#19be6b',
                confirmButtonText: '确认',
                closeOnConfirm: false
              }
            )
            this.loginUser.username = ''
            this.loginUser.password = ''
            localStorage.setItem('user', JSON.stringify(this.users[i]))
            localStorage.setItem('iflogin', '1')
            this.$store.state.currentUser = this.users[i]
            this.$store.state.ifLogin = true
            this.$router.push('/')
            return
          } else {
            // eslint-disable-next-line no-undef
            swal(
              {
                title: '登录失败',
                type: 'error',
                confirmButtonColor: '#DD6B55',
                confirmButtonText: '确认',
                closeOnConfirm: false
              }
            )
          }
        }
      })
    }
    // judge (user) {
    //   for (var i = 0;i < this.users.length;i++) {
    //     if (user.username === )
    //   }
    // }
  }
}
</script>
<style scoped>
img{
  padding-top: 20px;
}
.container{
  width: 1226px;
  margin: auto;
  margin-top: 20px;
}
.body{
  text-align: center;
  width: 854px;
  margin: auto;
  background-color: lightgray;
  opacity: 0.7;
}
.main{
  width: 400px;
  margin: auto;
  text-align: left;
}
p{
  margin-top: 10px;
}
.register{
  text-align: center;
  padding-bottom: 20px;
}
.ivu-btn{
  width: 200px;
}
a:hover{
  color: #ff6700;
}
</style>
