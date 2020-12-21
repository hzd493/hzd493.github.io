<template>
  <div id="discount">
    <ul>
      <template v-for="(item, index) in goods">
        <router-link to="/product-details" :key="index">
          <li @click="deliverDetails(index)" :key="index">
            <img :src="item.url[0]">
            <h5>
              {{item.name}}
            </h5>
            <!-- <p>{{item.introduce}}</p> -->
            <span class="price">{{ item.price-item.discount }}元</span><p v-show="item.discount>0" class="linethrough">{{ item.price }}元</p>
          </li>
        </router-link>
      </template>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'discount',
  data () {
    return {
      goods: []
    }
  },
  methods: {
    deliverDetails (index) {
      this.$store.state.currentGood = this.goods[index]
      // console.log(this.goods[index])
    }
  },
  mounted () {
    // eslint-disable-next-line no-labels
    getGoods: {
      this.$axios.get('http://localhost:3000/goods?id_gte=13&id_lte=24').then((data) => {
        this.goods = data['data']
      })
    }
  }
}
</script>
<style scoped>
#discount{
  width: 1226px;
  margin: auto;
  margin-top: 20px;
}
#discount ul{
  width: 1226px;
  list-style-type: none;
  float: left;
  text-align: center;
  background-color: #f5f5f5;
}
#discount ul li{
  height: 300px;
  width: 234px;
  margin-left: 9px;
  margin-bottom: 7px;
  margin-top: 7px;
  float: left;
  background-color: white;
}
#discount ul li img{
  height: 234px;
  width: 234px;
}
.price,a:hover{
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
