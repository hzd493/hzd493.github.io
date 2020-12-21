<template>
  <div id="home-body">
    <!-- 轮播部分 -->
    <div class="container">
      <div class="menu" @mouseover="ifDisplay=true" @mouseout="ifDisplay=false">
        <ul>
          <router-link to="/login" v-for="(item, index) in menuName" :key="index">
            <li @mouseover="child(index)">
              <p>{{ item.name }}<Icon type="ios-arrow-dropright" size="24"/></p>
            </li>
          </router-link>
        </ul>
        <div class="hidemenu" v-show="ifDisplay">
          <div v-for="(item,index) in hidelist" :key="index">
            <router-link to="/product-details"><img :src="item.url[1]" @click="deliverDetails(index)"></router-link>
          </div>
        </div>
      </div>
      <div class="light" @mouseover="stop()" @mouseout="goon()">
          <Carousel autoplay-speed:40000 v-bind:autoplay="ifAuto" loop>
            <CarouselItem>
              <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8e66b78810fa8ce7c40259cafaad0258.jpg?thumb=1&w=1533&h=575&f=webp&q=90" @click="product1">
            </CarouselItem>
            <CarouselItem>
              <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9ebff5f5c1f52f2dbdd611897adbefd4.jpg?thumb=1&w=1533&h=575&f=webp&q=90" @click="product4">
            </CarouselItem>
            <CarouselItem>
              <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/d01b4f4d20d1c909454b296f34143004.jpg?thumb=1&w=1533&h=575&f=webp&q=90" alt="">
            </CarouselItem>
            <CarouselItem>
              <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0ef4160c861b998239bce9adb82341e7.jpg?thumb=1&w=1533&h=575&f=webp&q=90" @click="product6">
            </CarouselItem>
            <CarouselItem>
              <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/ec39b7eb802279eb693520915afdfa07.jpg?thumb=1&w=1533&h=575&f=webp&q=90" alt="">
            </CarouselItem>
            <CarouselItem>
              <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/ca9f53f40b08b09d9254f7b6b79c34e2.jpg?thumb=1&w=1533&h=575&f=webp&q=90" @click="product5">
            </CarouselItem>
          </Carousel>
      </div>
    </div>
    <div class="subcontainer">
      <div class="sub">
        <div class="left">
          <ul id="list">
            <li>
              <router-link to="/miss">
                <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/82abdba456e8caaea5848a0cddce03db.png?w=48&h=48" alt=""><br>
                小米秒杀
              </router-link>
            </li>
            <div class="line1"></div>
            <li>
              <router-link to="/miss">
                <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/806f2dfb2d27978e33fe3815d3851fa3.png?w=48&h=48" alt=""><br>
                企业团购
              </router-link>
            </li>
            <div class="line1"></div>
            <li>
              <router-link to="/miss">
                <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/eded6fa3b897a058163e2485532c4f10.png?w=48&h=48" alt=""><br>
                F码通道
              </router-link>
            </li>
            <div class="line2"></div>
            <div class="line2"></div>
            <div class="line2"></div>
            <li>
              <router-link to="/miss">
                <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/43a3195efa6a3cc7662efed8e7abe8bf.png?w=48&h=48" alt=""><br>
                米粉卡
              </router-link>
            </li>
            <div class="line1"></div>
            <li>
              <router-link to="/miss">
                <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/f4846bca6010a0deb9f85464409862af.png?w=48&h=48" alt=""><br>
                以旧换新
              </router-link>
            </li>
            <div class="line1"></div>
            <li>
              <router-link to="/miss">
                <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9a76d7636b08e0988efb4fc384ae497b.png?w=48&h=48" alt=""><br>
                话费充值
              </router-link>
            </li>
          </ul>
        </div>
        <div class="subimg">
          <a>
            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8a43378b96501d7e227a9018fe2668c5.jpg?w=632&h=340" @click="product1">
          </a>
        </div>
        <div class="subimg">
          <a>
            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/793913688bfaee26b755a0b0cc8575fd.jpg?w=632&h=340" @click="product2">
          </a>
        </div>
        <div class="subimg">
          <a>
            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e5f20a62c3d5b3d6806bd51ab6c5dd12.jpg?w=632&h=340" @click="product3">
          </a>
        </div>
      </div>
      <h1>小米闪购</h1>
      <!-- <router-link to="/flash" class="more" style="float: right;margin-top: 20px">更多...</router-link> -->
      <flash-buy></flash-buy>
      <h2>今日推荐</h2>
      <router-link to="/recommend" class="" style="float: right;margin-top: 15px">更多...</router-link>
      <div class="goods">
        <recommend></recommend>
      </div>
      <h2>双十二大促销</h2>
      <router-link to="/discount" class="" style="float: right;margin-top: 15px">更多...</router-link>
      <div class="goods">
        <discount></discount>
      </div>
      <h2>新品尝鲜</h2>
      <router-link to="/fresh" class="" style="float: right;margin-top: 15px">更多...</router-link>
      <div class="goods">
        <fresh></fresh>
      </div>
    </div>
  </div>
</template>
<script>
import FlashBuy from './FlashBuy'
import Recommend from './Recommend'
import Discount from './Discount'
import Fresh from './Fresh'
export default {
  name: 'home-body',
  components: {
    FlashBuy,
    Recommend,
    Discount,
    Fresh
  },
  data () {
    return {
      ifAuto: true,
      ifDisplay: false,
      hidelist: [],
      menuName: [
        {
          name: '小米'
        },
        {
          name: '红米'
        },
        {
          name: '家电'
        },
        {
          name: '显示器'
        },
        {
          name: '电视'
        },
        {
          name: '穿戴'
        },
        {
          name: '笔记本'
        },
        {
          name: '路由器'
        },
        {
          name: '耳机'
        },
        {
          name: '办公用品'
        }
      ]
    }
  },
  methods: {
    deliverDetails (index) {
      this.$store.state.currentGood = this.hidelist[index]
      // console.log(this.goods[index])
    },
    child (index) {
      this.$axios.get('http://localhost:3000/goods?id_gte=' + (index * 5 + 1) + '&id_lte=' + (index * 5 + 5)).then((data) => {
        this.hidelist = data['data']
      })
    },
    stop () {
      this.ifAuto = false
    },
    goon () {
      this.ifAuto = true
    },
    product1 () {
      this.$axios.get('http://localhost:3000/goods/17').then((data) => {
        this.$store.state.currentGood = data['data']
      }).then(() => {
        this.$router.push('/product-details')
      })
    },
    product2 () {
      this.$axios.get('http://localhost:3000/goods/12').then((data) => {
        this.$store.state.currentGood = data['data']
      }).then(() => {
        this.$router.push('/product-details')
      })
    },
    product3 () {
      this.$axios.get('http://localhost:3000/goods/20').then((data) => {
        this.$store.state.currentGood = data['data']
      }).then(() => {
        this.$router.push('/product-details')
      })
    },
    product4 () {
      this.$axios.get('http://localhost:3000/goods/6').then((data) => {
        this.$store.state.currentGood = data['data']
      }).then(() => {
        this.$router.push('/product-details')
      })
    },
    product5 () {
      this.$axios.get('http://localhost:3000/goods/14').then((data) => {
        this.$store.state.currentGood = data['data']
      }).then(() => {
        this.$router.push('/product-details')
      })
    },
    product6 () {
      this.$axios.get('http://localhost:3000/goods/37').then((data) => {
        this.$store.state.currentGood = data['data']
      }).then(() => {
        this.$router.push('/product-details')
      })
    }
  }
}
</script>

<style scoped>
.hidemenu div{
  width: 234px;
  height: 234px;
  margin-left: 26px;
  margin-top: 26px;
  float: left;
}
.hidemenu div img{
  width: 234px;
  height: 234px;
}
/* .hidelist{
  list-style-type: none;
  width: 800px;
  height: 460px;
  background-color: #f5f5f5;
}
.hidelist li{
  position: absolute;
  width: 234px;
  height: 220px;
  float: left;
  border: 1px solid red;
  background-color: #f5f5f5;
} */
.goods{
  height: 648px;
  width:1226px;
  overflow: hidden;
  margin-bottom:50px
}
.container{
  position: relative;
  width: 1226px;
  height: 460px;
  margin: auto;
  margin-top: 10px;
}
.subcontainer{
  width: 1226px;
  margin: auto;
  margin-top: 10px;
}
.menu{
  height: 460px;
  float: left;
}
.menu ul{
  width: 234px;
  height: 460px;
  list-style-type: none;
  font-size: 18px;
  background-color:black;
  opacity: 0.3;
}
.menu ul li{
  width: 234px;
}
.menu ul li p{
  width: 160px;
  height: 46px;
  line-height: 46px;
  margin: auto;
}
.menu ul li:hover{
  background-color: #ff6700;
  color: black;
}
.ivu-icon-ios-arrow-dropright{
  float: right;
  line-height: 46px;
}
.hidemenu{
  height: 600px;
  width: 800px;
  background-color: #f5f5f5;
  position: absolute;
  top: 0px;
  left: 234px;
  z-index: 99;
}
.light{
  width: 992px;
  height: 460px;
  float: left;
}
img{
  width: 992px;
  height: 460px;
}
.sub{
  top: 20px;
  height: 170px;
  position: relative;
}
.left{
  height: 170px;
  width: 236px;
  float: left;
}
.subimg img{
  width: 316px;
  height: 170px;
  margin-left: 14px;
  float: left;
}
#list{
  height: 170px;
  list-style: none;
  background-color: #5F5750;
}
#list li{
  text-align: center;
  width: 76px;
  height: 82px;
  float: left;
  margin: 0px 2px 6px 0px;
}
#list li img{
  margin-top: 20px;
  width: 20px;
  height: 20px;
}
.line1{
  width: 1px;
  height: 72px;
  margin-top: 8px;
  background-color: lightgray;
  float: left;
  opacity: 0.3;
}
.line2{
  width: 70px;
  height: 1px;
  margin-left: 6px;
  background-color: lightgray;
  float: left;
  opacity: 0.3;
}
a{
  color: #b0b0b0;
}
h1,.more{
  position: relative;
  top: 40px;
  display: inline;
}
h2{
  display: inline;
}
/* #recommend,#discount,#fresh{
  margin-top: 15px;
  margin-bottom: 20px;
  height: 628px;
  width: 1226px;
  background-color: #f5f5f5;
} */
a:hover{
  color: #ff6700;
}
</style>
