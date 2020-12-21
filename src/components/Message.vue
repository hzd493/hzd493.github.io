<template>
  <div id="msg">
    <h1>
      我的消息通知<Icon type="ios-notifications" />
    </h1>
    <Table ref="selection" :columns="columns" :data="msgs">
      <template slot-scope="{ row, index }" slot="content">
        {{ row.content }}<Badge v-show="row.ifread==0" color="red" />
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <!-- <Button type="primary" size="small" style="margin-right: 5px" @click="changeFlag(index)">阅读</Button> -->
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">详情</Button>
        <Button type="error" size="small" @click="remove(index)">删除</Button>
      </template>
    </Table>
  </div>
</template>
<script>
export default {
  name: 'msg',
  data () {
    return {
      msgs: [],
      columns: [
        {
          title: '消息',
          slot: 'content'
        },
        {
          title: '操作',
          slot: 'action',
          width: 200,
          align: 'center'
        }
      ]
    }
  },
  methods: {
    update () {
      var id = JSON.parse(localStorage.getItem('user')).id
      localStorage.setItem('user', JSON.stringify(this.$store.state.currentUser))
      this.$axios.patch(
        'http://localhost:3000/users/' + id,
        this.$store.state.currentUser
      )
    },
    show (index) {
      var flag = '已读'
      this.msgs[index].ifread = 1
      this.$store.state.currentUser.msgid[index].ifread = 1
      this.update()
      this.$Modal.info({
        title: '消息详情',
        content: `内容：${this.msgs[index].content}<br> 是否已读：${flag}<br>`
      })
    },
    remove (index) {
      this.msgs.splice(index, 1)
      this.$store.state.currentUser.msgid.splice(index, 1)
      this.update()
    },
    getMsgs () {
      var msg = []
      var msgid = this.$store.state.currentUser.msgid
      msgid = JSON.parse(JSON.stringify(msgid))
      this.$axios.get('http://localhost:3000/msgs').then((data) => {
        msg = data['data']
        for (var i = 0; i < msgid.length; i++) {
          msg[msgid[i].id - 1].ifread = msgid[i].ifread
          this.msgs.push(msg[msgid[i].id - 1])
        }
      })
    }
  },
  mounted () {
    this.getMsgs()
  }
}
</script>
<style scoped>
#msg{
  width: 1226px;
  margin: auto;
}
h1,h6{
  text-align: center;
  margin-top: 20px;
}
</style>
