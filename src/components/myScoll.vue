<template>
  <div>
    <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto" ref="list">
      <li v-for="i in count" class="infinite-list-item" :key="i">{{ i }}</li>
    </ul>
  </div>

</template>

<script>

export default {
  name: "myScoll",
  data() {
    return {
      count: 100
    }
  },

  methods: {
    load(){
      this.$nextTick(() => {
        this.$refs.list.scrollTop = this.$refs.list.scrollHeight;
        console.log(this.$refs.list.scrollTop)
      });
    }
  },
};
</script>



