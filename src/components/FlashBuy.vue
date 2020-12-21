<template>
  <div id="flashbuy">
    <div class="backwards">
      <img src="/static/images/flash.png" alt="">
      <p>距离结束还有：</p>
      <span>{{backwards.hour}} : {{backwards.minute}} : {{backwards.second}}</span>
    </div>
    <div class="flash">
      <ul id="light" v-bind:style="{marginLeft:left+'px'}">
        <template v-for="(item, index) in goods">
          <router-link to="/product-details" :key="index">
          <li @click="deliverDetails(index)">
            <img :src="item.url[0]">
            <h5>
              {{item.name}}
            </h5>
            <span class="price">{{ item.price-item.discount }}元</span><p v-show="item.discount>0" class="linethrough">{{ item.price }}元</p>
          </li>
        </router-link>
        </template>
      </ul>
      <!-- <ul id="light" v-bind:style="{marginLeft:left+'px'}">
        <a href="">
          <li>
            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0b15efc342a60b6016c6c1092884f49d.png?thumb=1&w=250&h=250&f=webp&q=90" alt="">
            <h5>
              小米笔记本Air 12.5 2019款
            </h5>
            <p>像杂志一样随身携带</p>
            <span>3999元</span><p class="linethrough">4299元</p>
          </li>
        </a>
        <a href="">
          <li>
            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8a5313c45132daa64096f9885be9fb20.png?thumb=1&w=250&h=250&f=webp&q=90" alt="">
            <h5>
              小米笔记本Air 12.5 2019款
            </h5>
            <p>像杂志一样随身携带</p>
            <span>3999元</span><p class="linethrough">4299元</p>
          </li>
        </a>
        <a href="">
          <li>
            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/3f9dd493c0ded83d46a60c962af1b44b.png?thumb=1&w=250&h=250&f=webp&q=90" alt="">
            <h5>
              小米笔记本Air 12.5 2019款
            </h5>
            <p>像杂志一样随身携带</p>
            <span>3999元</span><p class="linethrough">4299元</p>
          </li>
        </a>
        <a href="">
          <li>
            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7e66564fa6d2f150288b4f194599b222.png?thumb=1&w=250&h=250&f=webp&q=90" alt="">
            <h5>
              小米笔记本Air 12.5 2019款
            </h5>
            <p>像杂志一样随身携带</p>
            <span>3999元</span><p class="linethrough">4299元</p>
          </li>
        </a>
        <a href="">
          <li>
            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/99382cf58e48687706f1bfa50d2832f9.png?thumb=1&w=250&h=250&f=webp&q=90" alt="">
            <h5>
              小米笔记本Air 12.5 2019款
            </h5>
            <p>像杂志一样随身携带</p>
            <span>3999元</span><p class="linethrough">4299元</p>
          </li>
        </a>
        <a href="">
          <li>
            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/99c5e5ef421647a065691b36121bf786.png?thumb=1&w=250&h=250&f=webp&q=90" alt="">
            <h5>
              小米笔记本Air 12.5 2019款
            </h5>
            <p>像杂志一样随身携带</p>
            <span>3999元</span><p class="linethrough">4299元</p>
          </li>
        </a>
        <a href="">
          <li>
            <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/9953b19d3627e5900a807eb98761222b.png?thumb=1&w=250&h=250" alt="">
            <h5>
              小米笔记本Air 12.5 2019款
            </h5>
            <p>像杂志一样随身携带</p>
            <span>3999元</span><p class="linethrough">4299元</p>
          </li>
        </a>
      </ul> -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'flashbuy',
  data () {
    return {
      left: 0,
      goods: [],
      backwards: {
        hour: 1,
        minute: 9,
        second: 5
      }
    }
  },
  methods: {
    init () {
      var Ul = document.getElementById('light')
      Ul.innerHTML += Ul.innerHTML
    },
    move () {
      this.left -= 2
      if (this.left < -1736) {
        this.left = 0
      }
    },
    deliverDetails (index) {
      this.$store.state.currentGood = this.goods[index]
      // console.log(this.goods[index])
    },
    counts () {
      setInterval(() => {
        this.backwards.second--
        if (this.backwards.second === 0) {
          this.backwards.minute--
          this.backwards.second = 59
        }
        if (this.backwards.minute < 0) {
          this.backwards.minute = 59
          this.backwards.hour--
        }
      }, 1000)
    }
  },
  mounted () {
    // eslint-disable-next-line no-labels
    getGoods: {
      this.$axios.get('http://localhost:3000/goods?id_gte=28&id_lte=34').then((data) => {
        this.goods = data['data']
      })
    }
    this.counts()
    this.init()
    setInterval(this.move, 100)
  }
}
</script>
<style scoped>
.flash{
  width: 978px;
  height: 340px;
  float: left;
  overflow: hidden;
}
#flashbuy{
  margin-top: 50px;
  margin-bottom: 30px;
  height: 340px;
  width: 1226px;
  background-color: #f5f5f5;
}
.backwards{
  width: 234px;
  height: 340px;
  background-color: #f1eded;
  float: left;
  text-align: center;
}
.backwards img{
  height: 100px;
  width: 80px;
  margin-top: 70px;
}
.backwards p{
  margin-top: 20px;
}
.backwards span{
  top: 40px;
  font-size: 30px;
  background-color: #605751;
  color: white;
}
#flashbuy ul{
  list-style-type: none;
  height: 340px;
  width: 3940px;
  text-align: center;
}
#flashbuy li{
  height: 340px;
  margin-left: 14px;
  width: 234px;
  float: left;
  background-color: white;
}
#flashbuy li img{
  height: 260px;
  width: 234px;
}
a:hover{
  color: #ff6700;
}
.linethrough{
  text-decoration: line-through;
  display: inline;
  margin-left: 10px;
}
a{
  color: #b0b0b0;
}
</style>
