<template>
  <div>
    <div
        ref="scrollContainer"
        style="height: 200px; overflow-y: auto"
        v-infinite-scroll="load"
    >
      <ul>
        <li v-for="item in list" :key="item">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      list: ['消息1', '消息2', '消息3']
    }
  },
  methods: {
    load() {
      // 模拟加载更多数据
      setTimeout(() => {
        this.list.push(`消息${this.list.length + 1}`)
        this.$nextTick(() => {
          this.$refs.scrollContainer.scrollTop = this.$refs.scrollContainer.scrollHeight
        })
      }, 1000)
    }
  }
}
</script>

