<template>
  <div>
    <el-container>
      <el-header>
        <h1>机构管理</h1>
        <hr />
      </el-header>
      <el-main>
        <el-form :model="branchForm" ref="branchForm" :rules="rules" style="width:80%;margin:0 auto">
          <el-row>
            <el-col :span="6" style="margin-left:100px">
              <el-form-item label="机构名称" :label-width="formLabelWidth" prop="branchName">
                <el-input v-model="branchForm.branchName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="机构简称" :label-width="formLabelWidth" prop="branchShortName">
                <el-input v-model="branchForm.branchShortName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" :disabled="addButton" @click="addBranch()">添加</el-button>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" :disabled="conserveEdit" @click="updateBranch()">保存修改</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-table
          :data="branchs"
          border
          style="width: 85%;margin:20px auto"
          v-loading="tableLoading"
        >
          <el-table-column
            prop="branchName"
            align="center"
            v-model="branchs.branchName"
            label="机构名称"
            width="300px"
          ></el-table-column>
          <el-table-column
            prop="branchShortName"
            align="center"
            v-model="branchs.branchShortName"
            label="机构简称"
            width="300px"
          ></el-table-column>
          <el-table-column align="left" label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button
                @click="editBranch(scope.row)"
                style="padding: 3px 4px 3px 4px;margin: 2px"
                size="mini"
              >修改</el-button>
              <el-button
                type="danger"
                style="padding: 3px 4px 3px 4px;margin: 2px"
                size="mini"
                @click="doDeleteBranch(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="display: flex;justify-content: space-between;">
          <el-pagination
            background
            :page-size="6"
            :current-page="currentPage"
            @current-change="currentChange"
            layout="prev, pager, next"
            :total="totalCount"
          ></el-pagination>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      branchForm: {
        branchId: "",
        branchName: "",
        branchShortName: ""
      },
      branchs: [], // 存放机构信息列表
      formLabelWidth: "120px",
      addButton: false,
      conserveEdit: true,
      tableLoading: false,
      totalCount: -1,
      currentPage: 1,
      rules: {
        branchName: [
          {
            required: true,
            message: "必填:机构名称",
            trigger: "blur"
          }
        ],
        branchShortName: [
          {
            required: true,
            message: "必填:机构简称",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted: function() {
    this.loadBranchInfo(); // 加载机构信息
  },
  methods: {
    currentChange: function(currentChange) {
      this.currentPage = currentChange;
      this.loadBranchInfo();
    },
    emptyBranchForm: function() {
      this.branchForm.branchName = "";
      this.branchForm.branchShortName = "";
    },
    // 加载机构信息
    loadBranchInfo: function() {
      var _this = this;
      var datas = {
        size: "6",
        start: (this.currentPage - 1) * 6
      };
      this.tableLoading = true;
      // 调用获取所有机构信息的API接口
      this.ajaxRequest("GET", "/findAllBranch", datas).then(resp => {
        this.tableLoading = false;
        if (resp.data && resp.status === 200) {
          var data = resp.data.obj;
          _this.branchs = data;
          // _this.totalCount = resp.data.obj.listCount;
        }
      });
    },
    // 添加机构信息
    addBranch: function() {
      var _this = this;
      this.$refs["branchForm"].validate(valid => {
        if (valid) {
          this.tableLoading = true;
          // 调用添加机构信息的API接口
          this.ajaxRequest("PUT", "/addBranch", this.branchForm).then(resp => {
            _this.tableLoading = false;
            if (resp && resp.status === 200) {
              _this.emptyBranchForm();
              _this.loadBranchInfo();
            }
          });
        } else {
          return false;
        }
      });
    },
    editBranch: function(row) {
      this.branchForm.branchId = row.branchId;
      this.branchForm.branchName = row.branchName;
      this.branchForm.branchShortName = row.branchShortName;
      this.addButton = true;
      this.conserveEdit = false;
    },
    // 修改机构信息
    updateBranch: function() {
      var _this = this;
      this.tableLoading = true;
      this.$refs["branchForm"].validate(valid => {
        if (valid) {
          // 调用修改机构信息的API接口
          this.ajaxRequest("PUT", "/modifyBranchById", this.branchForm).then(
            resp => {
              _this.tableLoading = false;
              if (resp && resp.status === 200) {
                _this.emptyBranchForm();
                _this.loadBranchInfo();
                this.addButton = false;
                this.conserveEdit = true;
              }
            }
          );
        } else {
          return false;
        }
      });
    },
    // 删除机构信息方法
    doDeleteBranch: function(row) {
      this.tableLoading = true;
      var _this = this;
      var datas = {
        id: row.branchId
      };
      // 调用删除机构信息的API接口
      this.ajaxRequest("DELETE", "/deleteBranchById", datas).then(resp => {
        _this.tableLoading = false;
        if (resp && resp.status === 200) {
          // var data = resp.data
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          _this.loadBranchInfo();
        }
      });
    }
  }
};
</script>
<style>
h1 {
  margin: 0 auto;
}
.colorRed {
  color: red;
}
</style>
