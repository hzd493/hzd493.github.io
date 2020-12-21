<template>
  <div name='register'>
    <div class="container">
      <div class="body">
        <img src="https://account.xiaomi.com/static/res/349d9c1/account-static/respassport/acc-2014/img/milogo.png" alt="logo"><br>
        <h1>注册小米账号</h1><br>
        <b>已有账号？点击<router-link to="/login">&nbsp;&nbsp;登录</router-link></b>
        <div class="main">
          <p>国家/地区</p><span class="error" v-show="ifShow.ifShowCity">wrong country</span>
          <Select prefix="ios-locate-outline" v-model="country">
            <OptionGroup label="热门城市">
              <Option v-for="item in hotCities" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </OptionGroup>
            <OptionGroup label="其他城市">
              <Option v-for="item in otherCities" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </OptionGroup>
          </Select>
          <span style="color: red">成功注册帐号后，国家/地区将不能被修改</span>
          <p>输入手机号码</p><span class="error" v-show="ifShow.ifShowPhone">wrong phone</span>
          <Input v-model="newUser.phone" prefix="ios-phone-portrait" placeholder="请输入手机号" />
          <p>输入邮箱</p><span class="error" v-show="ifShow.ifShowEmail">wrong email</span>
          <Input v-model="newUser.email" prefix="ios-mail-outline" placeholder="请输入邮箱" />
          <p>用户名</p><span class="error" v-show="ifShow.ifShowUsername">wrong username</span>
          <Input v-model="newUser.username" prefix="ios-people-outline" placeholder="请输入用户名" />
          <p>密码</p><span class="error" v-show="ifShow.ifShowPass">wrong password</span>
          <Input v-model="newUser.password" prefix="ios-lock-outline" type="password" password placeholder="请输入密码" />
          <p>确认密码</p><span class="error" v-show="ifShow.ifShowPass">wrong password</span>
          <Input v-model="passwordcopy" prefix="ios-lock-outline" type="password" password placeholder="请再次输入密码" /><br><br>
          <p class="register"><Button type="warning" @click="register()">注册</Button></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'register',
  data () {
    return {
      country: '',
      passwordcopy: '',
      errors: [],
      ifShow: {
        ifShowUsername: false,
        ifShowPhone: false,
        ifShowEmail: false,
        ifShowPass: false,
        ifShowCity: false
      },
      newUser: {
        name: '',
        age: 0,
        sex: '男',
        username: '',
        password: '',
        phone: '',
        email: '',
        address: [],
        shopcart: [],
        collect: [],
        msgid: []
      },
      hotCities: [
        {
          value: '中国',
          label: '中国'
        },
        {
          value: '纽约',
          label: '纽约'
        },
        {
          value: '伦敦',
          label: '伦敦'
        },
        {
          value: '悉尼',
          label: '悉尼'
        }
      ],
      otherCities: [
        {
          value: '渥太华',
          label: '渥太华'
        },
        {
          value: '巴黎',
          label: '巴黎'
        },
        {
          value: '堪培拉',
          label: '堪培拉'
        }
      ]
    }
  },
  methods: {
    judge (user) {
      var error = []
      var users = []
      var index1 = user.email.indexOf('@')
      var index2 = user.email.indexOf('.')
      this.$axios.get('http://localhost:3000/users').then((data) => {
        users = data['data']
        for (var i = 0; i < users.length; i++) {
          if (user.username === users[i].username) {
            this.ifShow.ifShowUsername = true
            error.push('exised username\n')
            console.log(users[i].username)
            break
          }
        }
        if (this.country.length === 0) {
          this.ifShow.ifShowCity = true
          error.push('wrong country\n')
        }
        if (user.username.length === 0) {
          this.ifShow.ifShowUsername = true
          error.push('wrong username\n')
        }
        if (user.phone.length !== 11) {
          this.ifShow.ifShowPhone = true
          error.push('wrong phone\n')
        }
        if (user.password.length === 0 || this.passwordcopy.length === 0 || user.password !== this.passwordcopy) {
          this.ifShow.ifShowPass = true
          error.push('wrong password\n')
        }
        if (user.email.length === 0 || index1 === -1 || index2 === -1 || index1 > index2) {
          this.ifShow.ifShowEmail = true
          error.push('wrong email\n')
        }
        if (error.length > 0) {
          this.errors = error
          return 0
        }
        return 1
      }).then((res) => {
        if (res === 1) {
          this.$axios.post(
            'http://localhost:3000/users',
            this.newUser
          )
          // eslint-disable-next-line no-undef
          swal('注册成功', '注册成功，请前往登录', 'success')
          this.reset()
          this.$router.push('/login')
        }
      })
    },
    register () {
      this.ifShow = {
        ifShowUsername: false,
        ifShowPhone: false,
        ifShowEmail: false,
        ifShowPass: false,
        ifShowCity: false
      }
      this.judge(this.newUser)
    },
    reset () {
      this.newUser = {
        name: '',
        age: 0,
        sex: '男',
        username: '',
        password: '',
        phone: '',
        email: '',
        address: [],
        shopcart: [],
        collect: [],
        msgid: []
      }
    }
  }
}
</script>
<style scoped>
.error{
  color: red
}
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
