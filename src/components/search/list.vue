<template>
  <div>
    <form action="/">
      <van-search v-model="keyword" placeholder="请输入搜索关键词"
                  clearable
                  style="position: fixed;z-index: 1000;top: 0;left: 0;right: 0"
                  input-align="center"
                  :show-action="showAction"
                  @focus="show"
                  @search="onSearch"
                  @blur="hide"
                  @cancel="onCancel">
        <template #left>
          <van-icon name="arrow-left" size="20px" color="lightgrey" style="margin: 0px 10px 0px -5px" @click="back"/>
        </template>
      </van-search>
    </form>
    <van-list
        style="position: relative;top: 55px;"
        v-model="loading"
        :finished="finished"
        :immediate-check="immcheck"
        finished-text="没有更多了"
        @load="getJson">
      <div class="coupons">
        <div v-for="item in list" :key="item.id" class="three_coupon" ylcouponinfo="[object Object]" ylresourceinfo="[object Object]">
          <div class="left">
            <div class="inner">
              <div class="coupon_title pt18">{{item.title}}</div>
<!--              <p class="use-time">-->
<!--                {{item.beginTime}} - {{item.endTime}}-->
<!--              </p>-->
              <div class="tags"></div>
              <div class="products pt28">
                <div v-for="value in item.skuList" :key="value.skuId" class="item">
                  <img :src="value.skuImg" alt="" srcset="" />
                  <div class="prize"><span class="prize_s">¥</span> <span class="prize_v">{{ value.price }}</span></div>
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="discount">
              <span v-if="item.couponType === 1" class="r_s">¥</span>
              <span class="r_v">{{item.discount}}</span>
              <span v-if="item.couponType === 3" class="r_z">折</span>
            </div>
            <div class="door">{{item.quota}}</div>
            <a v-if="item.couponKind === 1" :href="'https://so.m.jd.com/list/couponSearch.action?couponbatch=' + item.batchId" class="btn">立即领取</a>
            <a v-if="item.couponKind === 2 || item.couponKind === 3" :href="'https://shop.m.jd.com/?shopId=' + item.shopInfo.shopId" class="btn">立即进店</a>
          </div>
          <div v-if="item.ynPlus === 1" class="plus"></div>
          <div v-if="item.fansTag === 1" class="fans"></div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: "list",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      showAction: false,
      current: 0,
      size: 10,
      status: 0,
      keyword: '',
      immcheck: false
    };
  },
  methods: {
    getJson() {
      axios.post('/coupon/coupon/data/get', {
        "current": this.current,
        "size": this.size,
        "order": "",
        "orderType": "",
        "status": 0,
        "title": this.keyword
      }).then(response => {
        this.loading = false;
        if (response.data.success) {
          if (response.data.data.current >= response.data.data.pages) {
            this.finished = true;
          }
          this.current++;
          response.data.data.records.forEach(item => {
            this.list.push(item);
          })
        } else {
          // Toast.fail(response.data.message);
        }
      })
    },
    show() {
      this.showAction = true;
    },
    hide() {
      this.showAction = false;
    },
    onSearch() {
      this.list = [];
      this.current = 0;
      this.finished = false;
      this.loading = true;
      this.getJson();
      this.$router.replace({path:'/search/list', query:{keyword: this.keyword}});
    },
    onCancel() {
      this.showAction = false;
    },
    back() {
      //返回上一层
      this.$router.go(-1);
    }
  },
  mounted() {
    this.keyword = this.$route.query.keyword;
    var _that = this;
    this.$nextTick(function () {
      _that.getJson();
    });
  }
}
</script>

<style scoped>
.coupons .three_coupon {
  position: relative;
  margin: 0 auto;
  width: 21.25rem;
  height: 6.75rem;
  background-image: url(https://img11.360buyimg.com/jdphoto/s730x270_jfs/t1/65502/34/14234/3197/5db99578Edb719e4b/9bc039e58cbcbc71.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.coupons .three_coupon .left {
  position: absolute;
  left: .25rem;
  top: .25rem;
  width: 12.75rem;
  height: 6.25rem;
}
.coupons .three_coupon .left .inner {
  padding: 0 1rem 1rem;
}
.coupons .three_coupon .left .inner .coupon_title {
  font-size: .8rem;
  color: #252525;
  padding-top: .55rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 700;
}
.coupons .three_coupon .left .inner .tags {
  margin-top: -.2rem;
  margin-bottom: .1rem;
  white-space: nowrap;
  overflow: hidden;
}
.coupons .three_coupon .left .inner .products {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}
.coupons .three_coupon .left .inner .item {
  width: 3rem;
}
.coupons .three_coupon .left .inner .item img {
  display: block;
  width: 3rem;
  height: 3rem;
}
.coupons .three_coupon .left .inner .item .prize {
  text-align: center;
  font-family: JDZhengHei-01-Regular;
  color: #555;
}
.coupons .three_coupon .left .inner .item .prize_s {
  margin-right: -.15rem;
  font-size: .55rem;
}
.coupons .three_coupon .left .inner .item .prize_v {
  font-size: .6rem;
}
.coupons .three_coupon .right {
  position: absolute;
  top: .25rem;
  right: .25rem;
  width: 5rem;
  height: 6.25rem;
  text-align: center;
  color: #f2270c;
}
.coupons .three_coupon .right .discount {
  font-family: JDZhengHei-01-Bold;
  padding-top: 1rem;
}
.coupons .three_coupon .right .door {
  margin-top: .5rem;
  font-size: .65rem;
}
.coupons .three_coupon .right .btn {
  position: absolute;
  width: 7rem;
  height: 2.5rem;
  line-height: 2.5rem;
  background-image: -webkit-linear-gradient(225deg,#f2140c,#f2270c 70%,#f24d0c);
  background-image: linear-gradient(-135deg,#f2140c,#f2270c 70%,#f24d0c);
  border-radius: 2.5rem;
  font-size: 1.2rem;
  color: #fff;
  box-shadow: 0 0.1rem 0.15rem rgba(243,13,13,.3);
  -webkit-transform: translateX(-50%) scale(.5);
  transform: translateX(-50%) scale(.5);
  left: 50%;
}
.pt28 {
  padding-top: .7rem!important;
}
.coupons .three_coupon .right .r_z {
  font-size: .75rem;
  font-weight: 700;
  margin-left: .2rem;
}
.coupons .three_coupon .plus {
  background: url(//wq.360buyimg.com/wxsq_project/promote/couponcenter_m_v2/images/plus_9920ad36.png) no-repeat;
  background-size: 100% 100%;
}
.coupons .three_coupon .fans, .coupons .three_coupon .plus {
  position: absolute;
  width: 1.35rem;
  height: 1.35rem;
  top: .75rem;
  left: -.25rem;
}
.coupons .three_coupon .fans, .coupons .three_coupon .plus {
  position: absolute;
  width: 1.35rem;
  height: 1.35rem;
  top: .75rem;
  left: -.25rem;
}
.coupons .three_coupon .fans {
  background: url(//wq.360buyimg.com/wxsq_project/promote/couponcenter_m_v2/images/fans_3bb1ff6b.png) no-repeat;
  background-size: 100% 100%;
}
.use-time {
  font-size: .5rem;
  color: #999;
}
</style>