<template>
  <div id="shop-cart">
    <h1>
      我的购物车<Icon type="ios-cart" />
    </h1>
    <h6>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</h6>
    <Table ref="selection" :columns="columns" :data="lists">
      <template slot-scope="{ row, index }" slot="select">
        <input type="checkbox" v-model="choosed" :value="index" @change="watch" :key="index">
      </template>
      <template slot-scope="{ row, index }" slot="version">
        {{ row.version[shopcart[index].version] }}
      </template>
      <template slot-scope="{ row, index }" slot="color">
        {{ row.color[shopcart[index].color] }}
      </template>
      <template slot-scope="{ row, index }" slot="num">
        <Button size="small" @click="minus(index)">-</Button>
        {{ row.num }}
        <Button size="small" @click="plus(index)">+</Button>
      </template>
      <template slot-scope="{ row, index }" slot="price">
        {{ row.price+100*shopcart[index].version - row.discount }}
      </template>
      <template slot-scope="{ row, index }" slot="total">
        {{ row.num*(row.price+100*shopcart[index].version - row.discount) }}
      </template>
      <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">详情</Button>
          <Button type="error" size="small" @click="remove(index)">删除</Button>
      </template>
    </Table>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    全选：<input type="checkbox" style="margin-top:15px" v-model="selectAll" @change="select">
    <div class="clear">
      <router-link to="/">继续购物</router-link>
      共<span>{{total}}</span>件商品，已选择<span>{{ choosed.length }}</span>件，
      <span>合计：<h3>{{ getTotalPrice }}</h3>元</span>
      <Button shape="circle" @click="buy()">结算</Button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'shop-cart',
  data () {
    return {
      count: 0,
      totalPrice: 0,
      selectAll: false,
      lists: [],
      choosed: [],
      shopcart: [],
      columns: [
        {
          title: '选择',
          slot: 'select',
          align: 'center'
        },
        {
          title: '商品名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '单价',
          slot: 'price',
          align: 'center'
        },
        {
          title: '数量',
          slot: 'num',
          align: 'center'
        },
        {
          title: '小计',
          slot: 'total',
          align: 'center'
        },
        {
          title: '版本',
          slot: 'version',
          align: 'center'
        },
        {
          title: '颜色',
          slot: 'color',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ]
    }
  },
  methods: {
    watch () {
      if (this.choosed.length === this.lists.length) {
        this.selectAll = true
      } else {
        this.selectAll = false
      }
    },
    select () {
      if (this.selectAll === true) {
        if (this.lists.length === 0) {
          this.selectAll = false
          // eslint-disable-next-line no-undef
          swal('失败', '当前无商品', 'error')
          return
        }
        var temp = []
        for (var i = 0; i < this.lists.length; i++) {
          temp[i] = i
        }
        this.choosed = temp
      } else {
        this.choosed = []
      }
    },
    update () {
      var id = JSON.parse(localStorage.getItem('user')).id
      localStorage.setItem('user', JSON.stringify(this.$store.state.currentUser))
      this.$axios.patch(
        'http://localhost:3000/users/' + id,
        this.$store.state.currentUser
      )
    },
    show (index) {
      this.$Modal.info({
        title: '商品详情',
        content: `商品名称：${this.lists[index].name}<br> 商品数量：${this.lists[index].num}<br> 商品单价：${this.lists[index].price}<br> 商品介绍：${this.lists[index].introduce}<br>`
      })
    },
    remove (index) {
      this.lists.splice(index, 1)
      this.$store.state.currentUser.shopcart.splice(index, 1)
      this.update()
    },
    minus (index) {
      if (this.lists[index].num === 0) {
        return
      }
      this.lists[index].num--
      this.$store.state.currentUser.shopcart[index].num--
      this.update()
    },
    plus (index) {
      this.lists[index].num++
      this.$store.state.currentUser.shopcart[index].num++
      this.update()
    },
    getLists () {
      var list = []
      var shopcart = this.$store.state.currentUser.shopcart
      shopcart = JSON.parse(JSON.stringify(shopcart))
      this.shopcart = shopcart
      this.$axios.get('http://localhost:3000/goods').then((data) => {
        list = data['data']
        for (var i = 0; i < shopcart.length; i++) {
          list[shopcart[i].id - 1].num = shopcart[i].num
          this.lists.push(list[shopcart[i].id - 1])
        }
      })
    },
    buy () {
      if (this.choosed.length === 0) {
        // eslint-disable-next-line no-undef
        swal('失败', '请先勾选商品', 'error')
        return
      }
      // eslint-disable-next-line no-undef
      swal(
        {
          title: '确定要购买吗?',
          type: 'warning',
          showCancelButton: true,
          cancelButtonText: '取消',
          confirmButtonColor: '#DD6B55',
          confirmButtonText: '购买!',
          closeOnConfirm: false
        },
        () => {
          // eslint-disable-next-line no-undef
          swal(
            {
              title: '支付中...',
              type: 'info',
              confirmButtonText: '正在支付，请稍等...',
              timer: 2000
            },
            () => {
              // eslint-disable-next-line no-undef
              swal(
                {
                  title: '购买成功!',
                  type: 'success',
                  confirmButtonColor: '#3e76f6',
                  confirmButtonText: '确定'
                }
              )
              this.selectAll = false
              for (var i = 0; i < this.choosed.length; i++) {
                this.lists.splice(this.choosed[i], 1)
                this.shopcart.splice(this.choosed[i], 1)
                for (var j = i; j < this.choosed.length; j++) {
                  if (this.choosed[j] > this.choosed[i]) {
                    this.choosed[j]--
                  }
                }
              }
              var newShopcart = []
              for (i = 0; i < this.lists.length; i++) {
                var temp = {
                  id: this.lists[i]['id'],
                  num: this.lists[i]['num'],
                  version: this.shopcart[i].version,
                  color: this.shopcart[i].color
                }
                newShopcart.push(temp)
              }
              this.choosed = []
              this.$store.state.currentUser.shopcart = newShopcart
              this.update()
              // this.$router.push('/')
            }
          )
        }
      )
    }
  },
  mounted () {
    if (this.$route.path === '/shopcart') {
      this.getLists()
    }
  },
  computed: {
    total: function () {
      return this.lists.length
    },
    getTotalPrice: function () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.totalPrice = 0
      var len = this.choosed['length']
      for (var i = 0; i < len; i++) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.totalPrice += this.lists[this.choosed[i]].price * this.lists[this.choosed[i]].num
      }
      return this.totalPrice
    }
  }
}
</script>
<style scoped>
#shop-cart{
  width: 1226px;
  margin: auto;
}
h1,h6{
  text-align: center;
  margin-top: 20px;
}
h3{
  display: inline;
}
.clear{
  height: 50px;
  margin-top: 30px;
  line-height: 50px;
  background-color: #f5f5f5;
}
a{
  color: #b0b0b0;
}
a:hover{
  color: #ff6700;
}
span{
  color: #ff6700;
}
.ivu-btn-circle{
  width: 100px;
  background-color: #ff6700;
  float: right;
  margin-top: 9px;
}
</style>
