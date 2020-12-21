<template>
  <div id="top-bar">
    <div style="background-color: black">
      <div id="top">
        <p v-show="!ifLogin" class="welcome">未登录，请先<router-link to="/login">登录</router-link></p>
        <p v-show="ifLogin" class="welcome">欢迎您，{{ getUsername }}<a href="/" @click="loginOut">退出</a></p>
        <router-link to="/register">注册</router-link>
        <div class="right">
          <router-link to="/">商城首页</router-link>
          <a @click="judgeLogin1()">
            <Avatar v-if="ifLogin" style="background-color: #87d068" icon="ios-person" />
            <Avatar v-if="!ifLogin" icon="ios-person" />个人中心
          </a>
          <a @click="judgeLogin2()">
            <Icon type="ios-cart" />
            <Badge :count="getShopCartNum" :offset="offset">购物车</Badge>
          </a>
          <a @click="judgeLogin3()" class="demo-badge">
            <Icon type="ios-notifications" />
            <Badge :count="getMsgNum" :offset="offset">消息通知</Badge>
          </a>
          <a @click="judgeLogin4()">
            <Icon type="ios-heart" />
            <Badge :count="getCollectNum" :offset="offset">收藏夹</Badge>
          </a>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="header">
        <div>
          <img src="/static/images/logo.png" alt="logo">
          <img src="/static/images/logo-by.jpg" alt="12.12">
          <Menu mode="horizontal" class="guide" active-name="1">
            <Submenu name="1">
              <template slot="title">
                菜单
              </template>
              <MenuGroup title="手机"><MenuItem name="1-1">
                <router-link to="/recommend">小米</router-link>
              </MenuItem>
              <MenuItem name="1-2">
                <router-link to="/discount">红米</router-link>
              </MenuItem>
              <MenuItem name="1-3">
                <router-link to="/fresh">黑鲨</router-link>
              </MenuItem>
              </MenuGroup>
              <MenuGroup title="家电">
                <MenuItem name="1-4">洗衣机</MenuItem>
                <MenuItem name="1-5">电视</MenuItem>
                <MenuItem name="1-6">吸尘器</MenuItem>
                <MenuItem name="1-7">冰箱</MenuItem>
                <MenuItem name="1-8">空调</MenuItem>
                <MenuItem name="1-9">牙刷</MenuItem>
              </MenuGroup>
            </Submenu>
            <MenuItem name="2">
              <router-link to="/">商城首页</router-link>
            </MenuItem>
            <MenuItem name="3">
              <router-link to="/recommend">今日推荐</router-link>
            </MenuItem>
            <MenuItem name="4">
              <router-link to="/discount">双十二大促销</router-link>
            </MenuItem>
            <MenuItem name="5">
              <router-link to="/fresh">新品尝鲜</router-link>
            </MenuItem>
            <!-- <MenuItem name="6">
              <a href="#flashbuy">小米闪购</a>
            </MenuItem> -->
          </Menu>
          <Input class="search" v-model="searchKey" suffix="ios-search" enter-button placeholder="搜索..." @on-enter="search" @on-blur="blur"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'top-bar',
  data () {
    return {
      offset: [14, -3],
      searchKey: '',
      goods: []
      // iflogo: true,
      // username: 'hzd',
      // user: []
    }
  },
  methods: {
    search () {
      this.$store.state.searchResults = []
      this.$store.state.searchKey = this.searchKey
      this.$axios.get('http://localhost:3000/goods').then((data) => {
        this.goods = data['data']
        if (this.searchKey === '') {
          this.$store.state.searchResults = this.goods
        } else {
          for (var i = 0; i < this.goods.length; i++) {
            if (this.goods[i].name.indexOf(this.searchKey) !== -1) {
              this.$store.state.searchResults.push(this.goods[i])
            }
          }
        }
      })
      this.$router.push('/search-results')
    },
    blur () {
      this.searchKey = ''
    },
    loginOut () {
      this.$store.state.ifLogin = false
      localStorage.setItem('iflogin', '0')
    },
    judgeLogin1 () {
      if (this.$store.state.ifLogin === false) {
        this.$router.push('/login')
      } else {
        this.$router.push('/personal')
      }
    },
    judgeLogin2 () {
      if (this.$store.state.ifLogin === false) {
        this.$router.push('/login')
      } else {
        this.$router.push('/shopcart')
      }
    },
    judgeLogin3 () {
      if (this.$store.state.ifLogin === false) {
        this.$router.push('/login')
      } else {
        this.$router.push('/message')
      }
    },
    judgeLogin4 () {
      if (this.$store.state.ifLogin === false) {
        this.$router.push('/login')
      } else {
        this.$router.push('/collect')
      }
    }
  },
  computed: {
    ifLogin () {
      return this.$store.state.ifLogin
    },
    getUsername () {
      return this.$store.state.currentUser.username
    },
    getShopCartNum () {
      if (!this.$store.state.ifLogin) {
        return 0
      }
      return this.$store.state.currentUser.shopcart.length
    },
    getCollectNum () {
      if (!this.$store.state.ifLogin) {
        return 0
      }
      return this.$store.state.currentUser.collect.length
    },
    getMsgNum () {
      if (!this.$store.state.ifLogin) {
        return 0
      }
      var count = 0
      for (var i = 0; i < this.$store.state.currentUser.msgid.length; i++) {
        if (this.$store.state.currentUser.msgid[i].ifread === 0) {
          count++
        }
      }
      return count
    }
  }
}
</script>

<style scoped>
* {
padding: 0px;
margin: 0px;
}
#top-bar{
  color: #b0b0b0;
}
#top {
  width: 1226px;
  height: 56px;
  margin: auto;
  font-size: 14px;
  line-height: 56px;
}
.welcome{
  display: inline;
}
a{
  margin-left: 7px;
  color: #b0b0b0;
}
.right{
  float: right;
}
.container{
  width: 1226px;
  margin: auto;
}
.header{
  margin-top: 10px;
}
.search{
  width: 450px;
  float: right;
  margin-top: 17px;
}
.guide{
  display: inline-block;
}
.sub{
  width: 500px;
}
a:hover{
  color: #ff6700;
}
</style>
