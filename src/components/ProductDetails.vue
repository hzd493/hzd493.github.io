<template>
  <div id="product-details">
    <h1>商品详情</h1>
    <div class="container">
      <vue-photo-zoom-pro class="img" :url="currentUrl" :scale=3 :width=200 :height=200 :out-zoomer=true></vue-photo-zoom-pro>
      <ul class="list">
        <li v-for="(item,index) in good.url" @click="chooseUrl(index)" :style="{border:activeUrl[index]}" :key="index">
          <img :src="item" @click="changeUrl(index)">
        </li>
      </ul>
      <h2 style="margin-top:100px">相关推荐</h2>
      <ul class="recommend">
        <template v-for="(item, index) in recommend">
          <router-link to="/product-details" :key="index">
            <li @click="deliverDetails(index)">
              <img :src="item.url[0]">
              <h5>
                {{item.name}}
              </h5>
              <span class="price">{{ item.price-item.discount }}元</span><p v-show="item.discount>0" style="text-decoration: line-through">{{ item.price }}元</p>
            </li>
          </router-link>
        </template>
      </ul>
      <Card style="width:450px">
        <p slot="title">
          <Icon type="ios-list-box-outline" />
          用户评论
        </p>
        <a href="#" slot="extra">
          <Icon type="ios-loop-strong"></Icon>
          <Button size="small" @click="comtentModal=true">发表评论</Button>
        </a>
        <ul class="comtent">
          <li v-for="(item,index) in comtents" :key="index">
            {{ item.username }}
            <span>
              <Icon type="ios-star" v-for="n in 4" :key="n"></Icon><Icon type="ios-star" v-if="item.rate >= 9.5"></Icon><Icon type="ios-star-half" v-else></Icon>
              {{ item.rate }}
            </span>
            <p>{{ item.comtent }}</p>
            <hr>
          </li>
        </ul>
      </Card>
      <Modal v-model="comtentModal" @on-ok="comtentOk" @on-cancel="comtentCancel">
        <p>请您发表评论：</p>
        <Input v-model="newComtent.comtent" type="textarea" :autosize="{minRows: 3,maxRows: 7}" placeholder="请输入"></Input><br><br>
        <Input v-model="newComtent.rate" placeholder="请输入"></Input>
      </Modal>
    </div>
    <div class="details">
      <h3>商品名称&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ good.name }}</h3><br>
      <h4>商品详情介绍</h4>
      <p class="introduce">{{ good.introduce }}</p>
      <br><h2 class="price">{{ discountPrice }}元</h2><p class="linethrough" v-show="good.discount>0">{{ price }}元</p><br>
      <h4>选择版本</h4>
      <ul class="version">
        <li v-for="(item,index) in good.version" @click="chooseVersion(index)" :style="{border:activeVersion[index]}" :key="index">
          {{ item }}
        </li>
      </ul>
      <h4>选择配色</h4>
      <ul class="color">
        <li v-for="(item,index) in good.color" @click="chooseColor(index)" :style="{border:activeColor[index]}" :key="index">
          {{ item }}
        </li>
      </ul>
      <h4>选择物流公司</h4>
      <ul class="company">
        <li v-for="(item,index) in companies" @click="chooseDeliver(index)" :style="{border:activeDeliver[index]}" :key="index">
          {{ item }}
        </li>
      </ul>
      <h4>选择地址</h4>
      <Button size="small" style="margin-bottom:10px" @click="modal = true">添加地址</Button>
      <Modal v-model="modal" @on-ok="ok" @on-cancel="cancel">
        <p>请添加新地址：</p>
        <Input v-model="newAddress" type="textarea" :autosize="{minRows: 3,maxRows: 7}" placeholder="请输入"></Input>
      </Modal>
      <ul class="address">
        <li v-for="(item,index) in address" @click="chooseAddress(index)" :style="{border:activeAddress[index]}" :key="index">
          {{ item }}
          <!-- <input type="radio" name="address"> -->
        </li>
      </ul>
      <div class="subdetails">
        <h3 style="padding-top:60px;margin-left:50px;text-align:center">
          {{ good.name }}&nbsp;&nbsp;&nbsp;&nbsp;{{ currentVersion }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ currentColor }}
        </h3>
        <h1 style="color:#ff6700">{{ discountPrice }}元</h1>
      </div>
      <div class="add">
        <Icon v-show="display" class="fly" type="ios-cart" size="20" :style="{marginTop:top+'px',marginLeft:left+'px'}"/>
        <Button @click="addToCart" type="warning" style="width:200px">加入购物车</Button>
        <Icon v-show="collectDisplay" class="fly" type="ios-heart" size="20" :style="{marginTop:collectTop+'px',marginLeft:collectLeft+'px'}"/>
        <Button @click="addToCollect" type="warning" style="width:200px">加入收藏夹</Button>
      </div>
      <ul class="aftersale">
        <router-link to="/miss">
          <li v-for="(item,index) in aftersale" :key="index">
            <Icon type="md-checkmark-circle-outline" size="20"/>{{ item }}
          </li>
        </router-link>
      </ul>
    </div>
    <div class="pictures">
      <ul class="pic">
        <li v-for="(item,index) in good.url" :key="index">
          <img :src="item">
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'product-details',
  data () {
    return {
      good: {},
      recommend: [],
      comtents: [],
      newComtent: {
        username: '',
        comtent: '',
        rate: 0
      },
      currentUrl: '',
      price: 0,
      discountPrice: 0,
      currentVersion: '',
      currentColor: '',
      versionIndex: 0,
      colorIndex: 0,
      address: [],
      display: false,
      top: 0,
      left: 0,
      collectDisplay: false,
      collectTop: 0,
      collectLeft: 0,
      modal: false,
      comtentModal: false,
      newAddress: '',
      aftersale: [
        '小米发货',
        '7天无理由退货',
        '运费说明',
        '企业信息',
        '售后服务政策',
        '7天价格保护'
      ],
      companies: [
        '顺丰',
        '邮政',
        '中通',
        '申通',
        '百世',
        '菜鸟'
      ],
      activeVersion: [
        '3px solid #ff6700',
        '1px solid #757575',
        '1px solid #757575'
      ],
      activeColor: [
        '3px solid #ff6700',
        '1px solid #757575',
        '1px solid #757575'
      ],
      activeDeliver: [
        '1px solid #757575',
        '1px solid #757575',
        '1px solid #757575',
        '1px solid #757575',
        '1px solid #757575',
        '1px solid #757575'
      ],
      activeUrl: [
        '3px solid #ff6700',
        '',
        ''
      ],
      activeAddress: [
        '1px solid #757575',
        '1px solid #757575',
        '1px solid #757575',
        '1px solid #757575',
        '1px solid #757575',
        '1px solid #757575',
        '1px solid #757575',
        '1px solid #757575'
      ]
    }
  },
  methods: {
    // test () {
    // },
    chooseVersion (index) {
      this.activeVersion = [
        '1px solid #757575',
        '1px solid #757575',
        '1px solid #757575'
      ]
      this.activeVersion[index] = '3px solid #ff6700'
      this.price = this.good.price + 100 * index
      this.discountPrice = this.price - this.good.discount
      this.currentVersion = this.good.version[index]
      this.versionIndex = index
    },
    chooseColor (index) {
      this.activeColor = [
        '1px solid #757575',
        '1px solid #757575',
        '1px solid #757575'
      ]
      this.activeColor[index] = '3px solid #ff6700'
      this.currentColor = this.good.color[index]
      this.colorIndex = index
    },
    chooseAddress (index) {
      this.activeAddress = [
        '1px solid #757575',
        '1px solid #757575',
        '1px solid #757575',
        '1px solid #757575',
        '1px solid #757575',
        '1px solid #757575',
        '1px solid #757575',
        '1px solid #757575'
      ]
      this.activeAddress[index] = '3px solid #ff6700'
    },
    chooseDeliver (index) {
      this.activeDeliver = [
        '1px solid #757575',
        '1px solid #757575',
        '1px solid #757575',
        '1px solid #757575',
        '1px solid #757575',
        '1px solid #757575'
      ]
      this.activeDeliver[index] = '3px solid #ff6700'
    },
    chooseUrl (index) {
      this.activeUrl = [
        '',
        '',
        ''
      ]
      this.activeUrl[index] = '3px solid #ff6700'
    },
    changeUrl (index) {
      this.currentUrl = this.good.url[index]
    },
    ok () {
      if (this.newAddress.length === 0) {
        // eslint-disable-next-line no-undef
        swal('添加失败', '地址不能为空', 'error')
      } else {
        this.$store.state.currentUser.address.push(this.newAddress)
        this.update()
        // eslint-disable-next-line no-undef
        swal('添加成功', '新地址已经添加', 'success')
      }
      this.newAddress = ''
    },
    comtentOk () {
      if (JSON.parse(localStorage.getItem('iflogin')) === 0) {
        this.$store.state.ifLogin = false
        this.$router.push('/login')
        return 0
      }
      if (this.newComtent.comtent.length === 0) {
        // eslint-disable-next-line no-undef
        swal('评论失败', '评论不能为空', 'error')
      } else if (this.newComtent.rate === 0) {
        // eslint-disable-next-line no-undef
        swal('评论失败', '评分不能为0', 'error')
      } else {
        this.newComtent.username = this.$store.state.currentUser.username
        this.$store.state.currentGood.comtents.push(this.newComtent)
        this.updateGood()
        // eslint-disable-next-line no-undef
        swal('评论成功', '成功发表评论', 'success')
      }
      this.comtentCancel()
    },
    comtentCancel () {
      this.newComtent = {
        username: '',
        comtent: '',
        rate: 0
      }
    },
    cancel () {
      this.newAddress = ''
    },
    getCurrentGood () {
      this.good = this.$store.state.currentGood
      this.currentUrl = this.good.url[0]
      this.currentVersion = this.good.version[0]
      this.currentColor = this.good.color[0]
      this.address = this.$store.state.currentUser.address
      this.price = this.good.price
      this.discountPrice = this.price - this.good.discount
      // console.log(this.currentUrl)
      // console.log(this.good.url[0])
      // console.log(JSON.stringify(this.$store.state.currentGood))
      // console.log(this.good)
    },
    update () {
      var id = JSON.parse(localStorage.getItem('user')).id
      localStorage.setItem('user', JSON.stringify(this.$store.state.currentUser))
      this.$axios.patch(
        'http://localhost:3000/users/' + id,
        this.$store.state.currentUser
      )
    },
    // updateGood () {
    //   var id = this.$store.state.currentGood.id
    //   this.$axios.patch(
    //     'http://localhost:3000/goods/' + id,
    //     this.$store.state.currentGood
    //   )
    // },
    addToCart () {
      if (JSON.parse(localStorage.getItem('iflogin')) === 0) {
        this.$store.state.ifLogin = false
        this.$router.push('/login')
        return 0
      } else {
        var temp = this.$store.state.currentUser.shopcart
        for (var i = 0; i < temp.length; i++) {
          if (temp[i].id === this.good.id) {
            this.$router.push('/shopcart')
            return 0
          }
        }
        this.$store.state.currentUser.shopcart.push({
          id: this.good.id,
          num: 1,
          version: this.versionIndex,
          color: this.colorIndex
        })
        this.update()
        this.display = true
        var timer = setInterval(() => {
          this.left += 50
          this.top -= 159
          if (this.left === 500) {
            clearInterval(timer)
            this.top = 0
            this.left = 0
            this.display = false
          }
        }, 100)
      }
    },
    addToCollect () {
      if (JSON.parse(localStorage.getItem('iflogin')) === 0) {
        this.$store.state.ifLogin = false
        this.$router.push('/login')
        return 0
      } else {
        var temp = this.$store.state.currentUser.collect
        for (var i = 0; i < temp.length; i++) {
          if (temp[i].id === this.good.id) {
            this.$router.push('/collect')
            return 0
          }
        }
        this.$store.state.currentUser.collect.push({
          id: this.good.id,
          num: 1,
          version: this.versionIndex,
          color: this.colorIndex
        })
        this.update()
        this.collectDisplay = true
        var timer = setInterval(() => {
          this.collectLeft += 50
          this.collectTop -= 159
          if (this.collectLeft === 500) {
            clearInterval(timer)
            this.collectTop = 0
            this.collectLeft = 0
            this.collectDisplay = false
          }
        }, 100)
      }
    },
    deliverDetails (index) {
      this.$store.state.currentGood = this.recommend[index]
      if (this.$route.path === '/product-details') {
        this.$router.push('/recommend-details')
      } else {
        this.$router.push('/product-details')
      }
    },
    getRecommendList () {
      for (var i = 0; i < 6; i++) {
        var id = Math.floor(Math.random() * (50)) + 1
        this.$axios.get('http://localhost:3000/goods/' + id).then((data) => {
          // console.log(JSON.stringify(data["data"]))
          id = Math.floor(Math.random() * (50)) + 1
          this.recommend.push(data['data'])
        })
      }
    },
    getComtents () {
      this.comtents = this.$store.state.currentGood.comtents
    }
  },
  mounted () {
    this.getCurrentGood()
    this.getRecommendList()
    this.getComtents()
  }
}
</script>
<style scoped>
.comtent{
  list-style-type: none;
}
.comtent li{
  margin-bottom: 10px;
}
.comtent li span{
  float: right;
  color: #ff6700;
}
.recommend{
  width: 450px;
  height: 500px;
  list-style-type: none;
  margin-top: 10px;
}
.recommend li{
  width: 140px;
  height: 240px;
  float: left;
  margin-right: 5px;
  margin-left: 5px;
  margin-bottom: 10px;
  text-align: center;
}
.recommend li img{
  width: 140px;
  height: 160px;
}
.fly{
  position: absolute;
  color: #ff6700;
}
.aftersale li{
  margin-top: 20px;
  width: 200px;
  height: 30px;
  float: left;
  margin-right: 10px;
  color: #b0b0b0;
  line-height: 30px;
}
.add button{
  width: 400px;
  height: 40px;
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  line-height: 40px;
}
.subdetails{
  width: 700px;
  height: 200px;
  background-color: #f9f9fa;
}
.address li{
  width: 600px;
  height: 35px;
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 35px;
  text-align: center;
  float: left;
}
.version li,.color li{
  width: 200px;
  height: 50px;
  font-size: 14px;
  margin-bottom: 10px;
  text-align: center;
  line-height: 50px;
}
.company{
  list-style-type: none;
  height: 120px;
  margin-bottom: 40px;
}
.company li{
  height: 50px;
  width: 200px;
  border: 1px solid #757575;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  text-align: center;
  font-size: 14px;
  line-height: 50px;
}
.address,.color,.version,.aftersale{
  list-style-type: none;
  height: 230px;
}
.pic{
  list-style-type: none;
  height: 2400px;
}
.pic li{
  float: left;
}
.pictures{
  width: 800px;
  margin: auto;
}
.details{
  width: 700px;
  height: 1700px;
  float: right;
}
.list li img{
  width: 132px;
  height: 132px;
}
.list li{
  width: 138px;
  height: 138px;
  margin-left: 9px;
  float: left;
}
.list{
  list-style-type: none;
  width: 450px;
  height: 150px;
  margin: auto;
  margin-top: 30px;
}
.container{
  width: 450px;
  height: 1700px;
  float: left;
}
.img{
  width: 450px;
  height: 450px;
}
#product-details{
  width: 1226px;
  margin: auto;
  height: 4250px;
  background-color: #f5f5f5;
}
h3,h4{
  margin-bottom: 10px;
}
h1{
  text-align: center;
  margin-top: 20px;
  margin-bottom: 50px;
}
.introduce{
  color: #b0b0b0;
}
.price{
  color:  #ff6700;
}
.linethrough{
  text-decoration: line-through;
  margin-bottom: 10px;
  margin-top: 10px;
}
h2{
  font-size: 18px;
}
.price,a:hover{
  color: #ff6700;
}
a{
  color: #b0b0b0;
}
</style>
