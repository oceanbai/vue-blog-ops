<template>
  <div>
    <div class="mb10">
      <el-input class="w200 mr10" v-model="searchFrom.tagName"
                placeholder="请输入标签名称" @keydown.13.native="apiGetTagList" @keydown.229="()=>{}"></el-input>
      <el-button class="mr10" type="primary" @click="apiGetTagList">搜索</el-button>
      <el-button type="primary" @click="addTag">新增</el-button>
    </div>
    <el-table border stripe :data="tagList" style="width: 100%">
      <el-table-column prop="tagName" label="标签名" width="180"></el-table-column>
      <el-table-column prop="linkArticleCount" label="排序" width="180"></el-table-column>
      <el-table-column prop="sortNumber" label="关联的文章数量"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="total"
                   @current-change="handleCurrentChange"
                   :current-page.sync="searchFrom.page" :page-size="searchFrom.pageSize">
    </el-pagination>
  </div>
</template>

<script>
  import * as tagApi from '@/api/tag'

  export default {
    name: "articleTag",
    data() {
      return {
        tagList: [],
        searchFrom: {
          page: 1,
          pageSize: 10,
          tagName: ''
        },
        total: 0
      }
    },
    created() {
      this.apiGetTagList();
    },
    methods: {
      apiGetTagList() {
        tagApi.tgaList(this.searchFrom).then(res => {
          this.tagList = res.list;
          this.total = res.total;
        })
      },
      addTag() {
        this.$router.push('/article/addArticleTag')
      },
      handleEdit(row) {
        this.$router.push('/article/editArticleTag/' + row.id);
      },
      handleDelete(row) {
        this.$alert('确认删除？').then(() => {
          tagApi.deleteTag({tagId: row.id}).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.searchFrom.page = 1;
            this.apiGetTagList();
          })
        })
      },
      handleCurrentChange(current) {
        this.searchFrom.page = current;
        this.apiGetTagList();
      }
    }
  }
</script>

<style scoped>

</style>
