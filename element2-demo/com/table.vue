<!--
 * @Author: wxfeiang
 * @Description: 产品推荐编辑
 * @Date: 2022-08-23 14:11:10
 * @LastEditTime: 2022-08-23 23:19:11
 * @FilePath: /js/element2-demo/com/table.vue
-->
<template>
  <div>
    <div class="h3">
      <div class="item-title item1">
        星期{{ handlerWeek()[tableData.weekNum]}}
      </div>
      <div class="item-title item2">
        {{tableData.createTime}}
      </div>
    </div>
    <el-table
      :data="tableData.list"
      border
      :show-header="false"
      style="width: 100%"
      :span-method="arraySpanMethod"
      :row-class-name="rowClassName"
    >

      <el-table-column
        prop="timeMeal"
        :formatter="handlerDaysT"
        align="center"
        sortable
        label="就餐时间"
        width="120px"
      >
      </el-table-column>
      <el-table-column
        prop="categoryName"
        align="center"
        sortable
        label="类别"
        width="150px"
      >
      </el-table-column>
      <el-table-column
        prop="foodName"
        align="center"
        sortable
        label="餐品"
      >
        <template slot-scope="scope">
          <div class="tag_box">
            <span
              class="tab_sapn"
              v-for="(item,index) in changeArr(scope.row.foodName)"
              :key="index"
            >
              {{item}}
            </span>
          </div>

        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  name: 'recommendedDetail',
  props: {
    tableData: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      needMergeArr: ['timeMeal', 'categoryName', 'foodName'], //需要进行合并的column的prop值
      rowMergeArrs: {}, //处理过后得到的每个column的合并规则
    };
  },
  created() {
    this.tableData = this.handleArr(this.tableData);

    this.rowMergeArrs = this.rowMergeHandle(this.needMergeArr, this.tableData.list); // 处理数据
  },
  methods: {
    handleArr(data) {
      data.list = [...data.moring, ...data.midday, ...data.night];
      // arr.forEach((item, index) => {
      //   item.flog = index;
      //   item.list = [...item.moring, ...item.midday, ...item.night];
      // });

      return data;
    },
    rowMergeHandle(needMergeArr, tableData) {
      if (!Array.isArray(needMergeArr) && !needMergeArr.length) return false;
      if (!Array.isArray(tableData) && !tableData.length) return false;
      let needMerge = {};
      needMergeArr.forEach(i => {
        needMerge[i] = {
          rowArr: [], //该数组用来记录在目前列中的每一行的cell应该向下合并几行还是应该被合并。如果对应数组的数据==0,则说明该cell应该被合并。
          rowMergeNum: 0, //用来记录在目前列的第几行的行数，rowNum
        };
        tableData.forEach((item, index) => {
          if (index === 0) {
            needMerge[i].rowArr.push(1);
            needMerge[i].rowMergeNum = 0;
          } else {
            if (item[i] === tableData[index - 1][i]) {
              needMerge[i].rowArr[needMerge[i].rowMergeNum] += 1;
              needMerge[i].rowArr.push(0);
            } else {
              needMerge[i].rowArr.push(1);
              needMerge[i].rowMergeNum = index;
            }
          }
        });
      });
      console.log(needMerge);
      return needMerge;
    },
    arraySpanMethod({ row, column, rowIndex }) {
      if (column.property === 'timeMeal') {
        return this.mergeAction('timeMeal', rowIndex);
      }
      //  else if (column.property === 'categoryName') {
      //   return this.mergeAction('categoryName', rowIndex);
      // }
      // else if (column.property === 'foodName') {
      //   return this.mergeAction('foodName', rowIndex);
      // }
    },
    mergeAction(val, rowIndex) {
      let _row = this.rowMergeArrs[val].rowArr[rowIndex];
      let _col = _row > 0 ? 1 : 0;
      return [_row, _col];
    },
    changeArr(str) {
      //TODO: 后端如果返回正常的数组类型 可不用此方法
      let newStr = JSON.parse(JSON.stringify(str)).replace(/(\'|\")/g, '');
      let arrt = newStr.substring(1, newStr.length - 1).split(',');
      return arrt;
    },
    handlerWeek() {
      return ['日', '一', '二', '三', '四', '五', '六'];
    },
    handlerDaysT(row, column, cellValue, index) {
      let day = '';
      switch (cellValue) {
        case 'MOR':
          day = '早餐';
          break;
        case 'MIDDAY':
          day = '午餐';
          break;
        case 'NIGHT':
          day = '晚餐';
          break;
        default:
          '未知';
      }
      return day;
    },
    rowClassName: function ({ row }) {
      if (row.categoryName === 'set') {
          return "showRow";
      } else {
          return
      }
  },
  },
};
</script>
<style>
.showRow{
  display: none;
}
</style>


