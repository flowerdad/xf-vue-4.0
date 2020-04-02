<template>
  <div>
    <cardBlock tittle="测试模块4">
      <div slot="body">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
      </div>
    </cardBlock>
  </div>
</template>

<script>
import cardBlock from "@/components/card/cardCarrier/cardBlock.vue";
export default {
  components: {
    cardBlock
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "1"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "2"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "3"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "4"
        }
      ]
    };
  },
};
</script>
