<template>
  <div id="personal-center">
    <h1>
      我的个人中心<Icon type="ios-person" />
    </h1>
    <div class="container">
      <Card style="width:400px">
        <p slot="title">
            <Icon type="ios-person" />
            个人信息
        </p>
        <p slot="extra">
          <a><Button @click="edit" size="small">编辑</Button></a>
        </p>
        <h5>用户名:</h5>
        {{ user.username }}
        <h5>姓名:</h5>
        {{ user.name }}
        <h5>年龄:</h5>
        {{ user.age }}
        <h5>性别:</h5>
        {{ user.sex }}
        <h5>电话:</h5>
        {{ user.phone }}
        <h5>邮箱:</h5>
        {{ user.email }}
        <h5>地址:</h5>
        <p v-for="(item,index) in user.address" :key="index">
          {{ item }}
        </p>
        <h5>购物车商品种类:</h5>
        {{ shopcartLength }}
        <h5>消息数:</h5>
        {{ msgLength }}
      </Card>
      <!-- <p @click="test">123</p> -->
      <Modal v-model="modal" @on-ok="ok">
        <p>用户名:</p>
        <Input placeholder="请输入" v-model="tempUser.username"></Input>
        <p>姓名:</p>
        <Input placeholder="请输入" v-model="tempUser.name"></Input>
        <p>年龄:</p>
        <Input placeholder="请输入" v-model="tempUser.age"></Input>
        <p>性别:</p>
        <Input placeholder="请输入" v-model="tempUser.sex"></Input>
        <p>电话:</p>
        <Input placeholder="请输入" v-model="tempUser.phone"></Input>
        <p>邮箱:</p>
        <Input placeholder="请输入" v-model="tempUser.email"></Input>
      </Modal>
    </div>
  </div>
</template>
<script>
export default {
  name: 'personal-center',
  data () {
    return {
      modal: false,
      user: {},
      tempUser: {},
      shopcartLength: 0,
      msgLength: 0
    }
  },
  methods: {
    ok () {
      var error = []
      var index1 = this.tempUser.email.indexOf('@')
      var index2 = this.tempUser.email.indexOf('.')
      if (this.tempUser.username.length < 1) {
        error.push('wrong username\n')
      }
      if (this.tempUser.name.length < 1) {
        error.push('wrong name\n')
      }
      if (this.tempUser.age.length < 1) {
        error.push('wrong age\n')
      }
      if (this.tempUser.sex.length < 1) {
        error.push('wrong sex\n')
      }
      if (this.tempUser.phone.length < 1 || this.tempUser.phone.length !== 11) {
        error.push('wrong phone\n')
      }
      if (this.tempUser.email.length < 1) {
        error.push('wrong email\n')
      }
      if (index1 === -1 || index2 === -1 || index1 > index2) {
        error.push('wrong email format')
      }
      if (error.length > 0) {
        // eslint-disable-next-line no-undef
        swal('修改失败', error.splice(',').join(''), 'error')
        return
      }
      this.user.username = this.tempUser.username
      this.user.name = this.tempUser.name
      this.user.age = this.tempUser.age
      this.user.sex = this.tempUser.sex
      this.user.phone = this.tempUser.phone
      this.user.email = this.tempUser.email
      this.update()
      // eslint-disable-next-line no-undef
      swal('修改成功', '信息已经更新', 'success')
    },
    update () {
      var id = JSON.parse(localStorage.getItem('user')).id
      localStorage.setItem('user', JSON.stringify(this.$store.state.currentUser))
      this.$axios.patch(
        'http://localhost:3000/users/' + id,
        this.$store.state.currentUser
      )
    },
    init () {
      this.user = this.$store.state.currentUser
      this.tempUser.username = this.user.username
      this.tempUser.name = this.user.name
      this.tempUser.age = this.user.age
      this.tempUser.sex = this.user.sex
      this.tempUser.phone = this.user.phone
      this.tempUser.email = this.user.email
      this.shopcartLength = this.user.shopcart.length
      this.msgLength = this.user.msgid.length
    },
    edit () {
      this.tempUser.username = this.user.username
      this.tempUser.name = this.user.name
      this.tempUser.age = this.user.age
      this.tempUser.sex = this.user.sex
      this.tempUser.phone = this.user.phone
      this.tempUser.email = this.user.email
      this.modal = true
      // this.user = this.$store.state.currentUser
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style scoped>
h5{
  padding-top: 10px;
}
.container{
  width: 500px;
  margin: auto;
  background-color: #eee;
  padding: 50px;
  margin-top: 50px;
}
h1{
  text-align: center;
  margin-top: 20px;
}
</style>
