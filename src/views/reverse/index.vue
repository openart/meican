<template>
    <div>
      <div class="container">
        <el-form ref="form" :model="form" label-width="40px">
          <el-form-item label="日期">
            <el-radio-group v-model="form.date">
              <el-radio-button v-for="(v, k) in dateList" :key="k" :label="v.k">{{v.v}}</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="餐厅">
            <el-radio-group v-model="form.dish">
              <el-radio-button v-for="(v, k) in dishList" :key="k" :label="v.id">{{v.name}}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="搜索">
          <el-input v-model="form.search"></el-input>
          </el-form-item>
        </el-form>
        <el-table :data="foodList" border style="width: 100%" ref="multipleTable">
          <el-table-column prop="name" label="餐品">
          </el-table-column>ss
          <el-table-column prop="dish_name" label="餐厅">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" @click="submitOrderReverse(scope.row)">预约</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">收藏</el-button>
            </template>
          </el-table-column>
      </el-table>
      </div>
    </div>
</template>
<script>
import index from './index'
export default index
</script>