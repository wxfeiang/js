<!--
 * @Author: wxfeiang
 * @Description: 产品推荐编辑
 * @Date: 2022-08-23 14:11:10
 * @LastEditTime: 2022-08-23 21:13:03
 * @FilePath: /js/element2-demo/com/index.vue
-->
<template>
  <div class="tab_box">
    <template v-for="(item ,index) in  newData.rows"   :key="index">
      <dy-table
        :tableData="item"
      
      />
    </template>
  </div>
</template>

<script>
import dyTable from './table.vue';
export default {
  name: 'recommendedDetail',
  components: {
    dyTable,
  },
  data() {
    return {
      rows: [
        {
          id: '1559839139432300546',
          weekNum: '1',
          weekDate: '2022-08-23 00:00:00',
          createTime: '2022-08-17 17:46:45',
          updateTime: null,
          moring: [
            {
              id: null,
              timeMeal: 'MOR',
              weekDateId: null,
              foodTypeId: null,
              foodName: '["早晨"]',
              createTime: null,
              updateTime: null,
              categoryName: '面点',
            },
          ],
          midday: [
            {
              id: null,
              timeMeal: 'MIDDAY',
              weekDateId: null,
              foodTypeId: null,
              foodName: '["早晨"]',
              createTime: null,
              updateTime: null,
              categoryName: '肉食',
            },
          ],
          night: [
            {
              id: null,
              timeMeal: 'NIGHT',
              weekDateId: null,
              foodTypeId: null,
              foodName: '["早晨"]',
              createTime: null,
              updateTime: null,
              categoryName: '面点',
            },
          ],
        },
        {
          id: '1559839139432300546',
          weekNum: '1',
          weekDate: '2022-08-23 00:00:00',
          createTime: '2022-08-17 17:46:45',
          updateTime: null,
          moring: [
            {
              id: null,
              timeMeal: 'MOR',
              weekDateId: null,
              foodTypeId: null,
              foodName: '["早晨"]',
              createTime: null,
              updateTime: null,
              categoryName: '面点',
            },
          ],
          midday: [
            {
              id: null,
              timeMeal: 'MIDDAY',
              weekDateId: null,
              foodTypeId: null,
              foodName: '["早晨"]',
              createTime: null,
              updateTime: null,
              categoryName: '肉食',
            },
          ],
          night: [
            {
              id: null,
              timeMeal: 'NIGHT',
              weekDateId: null,
              foodTypeId: null,
              foodName: '["早晨"]',
              createTime: null,
              updateTime: null,
              categoryName: '面点',
            },
            {
              id: null,
              timeMeal: 'NIGHT',
              weekDateId: null,
              foodTypeId: null,
              foodName: '["早晨"速度速度速度]',
              createTime: null,
              updateTime: null,
              categoryName: '面点',
            },
          ],
        },
      ],
      newData: {
        total: 15,
        rows: [
          {
            id: '1561936182330081282',
            weekNum: '2',
            weekDate: '2022-07-31 00:00:00',
            createTime: '2022-08-23 12:39:39',
            updateTime: null,
            moring: [
              {
                id: null,
                timeMeal: 'MOR',
                weekDateId: null,
                foodTypeId: null,
                foodName: '["早晨"]',
                createTime: null,
                updateTime: null,
                categoryName: '喵宝',
              },
              {
                id: null,
                timeMeal: 'MOR',
                weekDateId: null,
                foodTypeId: null,
                foodName: '["早晨"]',
                createTime: null,
                updateTime: null,
                categoryName: '面点',
              },
            ],
            midday: [
              {
                id: null,
                timeMeal: 'MIDDAY',
                weekDateId: null,
                foodTypeId: null,
                foodName: '["早晨"]',
                createTime: null,
                updateTime: null,
                categoryName: '肉食',
              },
            ],
            night: [
              {
                id: null,
                timeMeal: 'NIGHT',
                weekDateId: null,
                foodTypeId: null,
                foodName: '["早晨"]',
                createTime: null,
                updateTime: null,
                categoryName: '面点',
              },
            ],
          },
          {
            id: '1561959692913950721',
            weekNum: '0',
            weekDate: '2022-07-28 00:00:00',
            createTime: '2022-08-23 14:13:05',
            updateTime: null,
            moring: [
              {
                id: null,
                timeMeal: 'MOR',
                weekDateId: null,
                foodTypeId: null,
                foodName: '["早餐"]',
                createTime: null,
                updateTime: null,
                categoryName: '面点',
              },
              {
                id: null,
                timeMeal: 'MOR',
                weekDateId: null,
                foodTypeId: null,
                foodName: '["早餐"]',
                createTime: null,
                updateTime: null,
                categoryName: '肉食',
              },
            ],
            midday: [
              {
                id: null,
                timeMeal: 'MIDDAY',
                weekDateId: null,
                foodTypeId: null,
                foodName: '["午餐"]',
                createTime: null,
                updateTime: null,
                categoryName: '肉食',
              },
              {
                id: null,
                timeMeal: 'MIDDAY',
                weekDateId: null,
                foodTypeId: null,
                foodName: '["午餐"]',
                createTime: null,
                updateTime: null,
                categoryName: '面食',
              },
            ],
            night: [
              {
                id: null,
                timeMeal: 'NIGHT',
                weekDateId: null,
                foodTypeId: null,
                foodName: '["晚餐"]',
                createTime: null,
                updateTime: null,
                categoryName: '面食',
              },
              {
                id: null,
                timeMeal: 'NIGHT',
                weekDateId: null,
                foodTypeId: null,
                foodName: '["晚餐"]',
                createTime: null,
                updateTime: null,
                categoryName: '面点',
              },
            ],
          },
        ],
        code: 0,
        msg: null,
      },
    };
  },
};
</script>

<style >
.tab_box {
  border: 1px solid #ebeef5;
}

.h3 {
  display: flex;
  background: rgb(182, 89, 89);
  color: #fff;
}

.item-title {
  text-align: center;
  line-height: 40px;
  border-bottom: none;
}

.item1 {
  width: 270px;
  border-right: 1px solid #ebeef5;
}

.item2 {
  flex: 1;
}

.tag_box {
  display: flex;
  justify-content: center;
}

.tag_box span {
  display: inline-block;
  padding: 0 10px;
}
</style>

