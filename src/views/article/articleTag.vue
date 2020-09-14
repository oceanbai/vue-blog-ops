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
    <el-dialog
      :title="tagId ? '编辑标签' : '添加标签'"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form :model="addTagFrom" :rules="rules" ref="addTagFrom" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标签名称" prop="tagName">
          <el-input v-model="addTagFrom.tagName"></el-input>
        </el-form-item>
        <el-form-item label="标签排序" prop="sortNumber">
          <el-input-number v-model="addTagFrom.sortNumber" :controls="false" :precision="0"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitFrom">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as tagApi from '@/api/tag'

export default {
  name: 'ArticleTag',
  data() {
    return {
      tagList: [],
      searchFrom: {
        page: 1,
        pageSize: 10,
        tagName: ''
      },
      total: 0,
      dialogVisible: true,
      tagId: '',
      addTagFrom: {},
      rules: {
        tagName: [
          { required: true, message: '请输入标签名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        sortNumber: [
          { required: true, message: '请填写顺序', trigger: 'blur' },
          { type: 'number', min: 1, max: 200, message: '排序必须大于1，且小于200', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.apiGetTagList()
  },
  methods: {
    apiGetTagList() {
      console.log(this.searchFrom)
      tagApi.tagList(this.searchFrom).then(res => {
        this.tagList = res.list
        this.total = res.total
      })
    },
    addTag() {
      // this.$router.push('/article/addArticleTag')
      this.dialogVisible = true
    },
    cancel() {
    },
    handleEdit(row) {
      this.$router.push('/article/editArticleTag/' + row.id)
    },
    handleDelete(row) {
      this.$alert('确认删除？').then(() => {
        tagApi.deleteTag({ tagId: row.id }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.searchFrom.page = 1
          this.apiGetTagList()
        })
      })
    },
    handleCurrentChange(current) {
      this.searchFrom.page = current
      this.apiGetTagList()
    },
    submitFrom() {
      this.$refs['addTagFrom'].validate((valid) => {
        console.log('---------', valid)
        if (valid) {
          tagApi.addAndUpdateTag(this.addTagFrom).then(() => {
            this.apiGetTagList()
            this.dialogVisible = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
