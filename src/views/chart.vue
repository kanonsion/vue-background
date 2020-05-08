<template>
  <div>
    <div class="sec sec1">
      <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
    </div>
    <div class="sec sec2">
      <ve-pie :data="pieData"></ve-pie>
    </div>
  </div>
</template>

<script>
import { getTags, getAritices } from "@/api/chart";
export default {
  data() {
    return {
      pieData: {},
      chartData: {},
      chartSettings: {
        labelMap: {},
      },
    };
  },
  methods: {
    async _getTags() {
      this.pieData = await getTags();
    },
    async _getAritices() {
      let res = await getAritices();
      let chartData = {},
        labelMap = {};
      chartData.columns = Object.keys(res[0]);
      chartData.rows = res;
      labelMap[chartData.columns[0]] = "日期";
      labelMap[chartData.columns[1]] = "新文章数量";
      this.chartSettings.labelMap = labelMap;
      this.chartData = chartData;
    },
  },
  created() {
    this._getAritices();
    this._getTags();
  },
};
</script>

<style lang="scss" scoped>
.sec {
  box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.1);
  padding-top: 20px;
  margin-bottom: 30px;
  transition: all .3s;
  &:hover {
    box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.2);
  }
}
</style>
