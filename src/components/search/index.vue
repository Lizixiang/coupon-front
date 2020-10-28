<template>
  <div>
    <form action="/">
      <van-search v-model="keyword" placeholder="请输入搜索关键词"
                  clearable
                  input-align="center"
                  :show-action="showAction"
                  @focus="show"
                  @search="onSearch"
                  @blur="hide"
                  @cancel="onCancel"/>
    </form>
    <div class="page__ft j_bottom">
      DESIGN BY ZIXIANG
    </div>
  </div>

</template>

<script>
export default {
  name: "index",
  data() {
    return{
      keyword: '',
      showAction: false
    }
  },
  methods: {
    show() {
      this.showAction = true;
    },
    hide() {
      this.showAction = false;
    },
    onSearch() {
      this.$router.push({path:'/search/list', query:{keyword: this.keyword}});
    },
    onCancel() {
      this.showAction = false;
    }
  }
}
</script>

<style scoped>
.page__ft.j_bottom {
  position: absolute;
  bottom: 0;
  left: 35%;
  color: lightgrey;
  font-size: 12px;
}
</style>