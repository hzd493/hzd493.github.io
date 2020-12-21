<template>
  <div id="search-results">
    <ul>
      <template v-for="(item, index) in getResults">
        <router-link to="/product-details" :key="index">
          <li @click="deliverDetails(index)">
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
  name: 'search-results',
  data () {
    return {
    }
  },
  methods: {
    deliverDetails (index) {
      this.$store.state.currentGood = this.$store.state.searchResults[index]
    }
  },
  computed: {
    getResults: function () {
      return this.$store.state.searchResults
    }
  }
}
</script>
<style scoped>
#search-results{
  width: 1226px;
  margin: auto;
  margin-top: 20px;
}
#search-results ul{
  width: 1226px;
  list-style-type: none;
  float: left;
  text-align: center;
  background-color: #f5f5f5;
}
#search-results ul li{
  height: 300px;
  width: 234px;
  margin-left: 9px;
  margin-bottom: 7px;
  margin-top: 7px;
  float: left;
  background-color: white;
}
#search-results ul li img{
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
