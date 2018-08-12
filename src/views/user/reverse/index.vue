<template>
    <div>
      <div class="container">
        <el-table :data="list" border style="width: 100%" ref="multipleTable">
          <el-table-column prop="date" label="时间">
          </el-table-column>
          <el-table-column prop="dish_id" label="餐品ID">
          </el-table-column>
          <el-table-column prop="dish_name" label="餐品ID">
          </el-table-column>
      </el-table>
      </div>
    </div>
</template>
<script>
import index from './index'
export default index
</script>