<template>
  <div>
    <el-header>
      <h1 style="font-size:30px ">部门管理</h1>
      <hr width="90%"/>
      <!-- 设置一条水平线 -->
    </el-header>
    <el-main>
      <p>
        <el-button  class="el-icon-plus" @click="showAddDepartmentView()">添加部门</el-button>
      </p>
      <!-- 显示部门表格 -->
      <el-table :data="department" v-loading="tableLoading" border stripe size="mini">
        <el-table-column
          prop="departName"
          v-model="department.departName"
          align="left"
          fixed="left"
          label="部门名称"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="branchName"
          v-model="department.branchName"
          align="left"
          label="机构名称"
          width="250"
        ></el-table-column>
        <el-table-column
          prop="principalUser"
          v-model="department.principalUser"
          align="left"
          label="负责人"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="connectTelNo"
          v-model="department.connectTelNo"
          align="left"
          label="联系电话"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="connectMobileTelNo"
          v-model="department.connectMobileTelNo"
          align="left"
          label="移动电话"
          width="200"
        ></el-table-column>
        <el-table-column
          align="left"
          prop="faxes"
          v-model="department.faxes"
          label="传真"
          width="200"
        ></el-table-column>
        <el-table-column align="left" label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button
              @click="showChangeDepartmentView(scope.row)"
              style="padding: 3px 4px 3px 4px;margin: 2px"
              size="mini"
            >修改</el-button>
            <el-button
              type="danger"
              style="padding: 3px 4px 3px 4px;margin: 2px"
              size="mini"
              @click="deleteDepartment(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex;justify-content: space-between;margin: 2px">
        <el-pagination
          background
          :page-size="10"
          :current-page="currentPage"
          layout="prev, pager, next"
          :total="totalCount"
        ></el-pagination>
      </div>
    </el-main>
    <el-form :model="departForm" :rules="rules" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <el-dialog
          :title="dialogTitle"
          style="padding: 0px;"
          :close-on-click-modal="false"
          :visible.sync="dialogVisible"
          width="60%"
        >
          <el-row>
            <el-col :span="10">
              <div>
                <el-form-item label="部门名称:" prop="departName">
                  <el-input
                    prefix-icon="el-icon-edit"
                    v-model="departForm.departName"
                    size="mini"
                    style="width: 200px"
                    placeholder="部门名称"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <div>
                <!-- <el-form-item label="负责人:" prop="principalUser">
                  <div class="block">
                    <span class="selectdepartment">选择负责人</span>
                    <el-cascader
                      v-model="value"
                      :options="options"
                      :props="{ expandTrigger: 'hover' }"
                      @change="handleChange"
                    ></el-cascader>
                  </div>
                </el-form-item>-->
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <div>
                <el-form-item label="联系电话:" prop="connectTelNo">
                  <el-input
                    prefix-icon="el-icon-edit"
                    v-model="departForm.connectTelNo"
                    size="mini"
                    style="width: 200px"
                    placeholder="联系电话"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="10">
              <div>
                <el-form-item label="移动电话:" prop="connectMobileTelNo">
                  <el-input
                    prefix-icon="el-icon-edit"
                    v-model="departForm.connectMobileTelNo"
                    size="mini"
                    style="width: 200px"
                    placeholder="移动电话"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <div>
                <el-form-item label="传真:" prop="faxes">
                  <el-input
                    prefix-icon="el-icon-edit"
                    v-model="departForm.faxes"
                    size="mini"
                    style="width: 200px"
                    placeholder="传真"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-form-item label="所属机构:" prop="branchName">
                  <el-select
                    v-model="departForm.branchName"
                    style="width: 120px"
                    size="mini"
                    placeholder="请选择所属机构"
                  >
                    <el-option
                      v-for="branch in branchs"
                      :key="branch.branchName"
                      :label="branch.branchName"
                      :value="branch.branchName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancelEdit">取 消</el-button>
            <el-button size="mini" type="primary" @click="addDepartment">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keywords: "",
      dialogTitle: "",
      currentPage: 1,
      totalCount: 1,
      tableLoading: false,
      dialogVisible: false,
      department: [],
      departForm: {
        departId: "",
        departName: "",
        principalUser: "",
        connectTelNo: "",
        connectTelNo: "",
        faxes: "",
        branchId: "",
        branchName: ""
      },
      idIsDisabled: 0,
      allDepartment: [],
      branchs: [],
      person: [],
      rules: {
        departName: [
          { required: true, message: "必填:部门名称", trigger: "blur" }
        ],
        principalUser: [
          { required: true, message: "必填:部门负责人", trigger: "blur" }
        ],
        connectTelNo: [
          { required: true, message: "必填:联系电话", trigger: "blur" }
        ],
        connectMobileTelNo: [
          { required: true, message: "必填：移动电话", trigger: "blur" }
        ],
        faxes: [{ required: true, message: "必填:传真", trigger: "blur" }],
        branchName: [
          { required: true, message: "必填:所属机构名称", trigger: "blur" }
        ]
      },
      loading: false
    };
  },
  mounted: function() {
    this.initData(); //加载所有部门信息
    this.getAllBranchMessage(); //加载所有机构信息
    this.getbraDepUserTree(); //加载机构部门用户树
  },
  methods: {
    initData() {
      var _this = this;
      var datas = {};
      this.ajaxRequest("GET", "/findAllDepart", datas).then(resp => {
        // console.log(resp);
        if (resp.data && resp.data.status === 200) {
          _this.department = resp.data.obj;
          console.log(_this.department)
        } else {
          alert("111");
        }
      });
    },
    //加载所有部门信息
    // LoadDepartmentMessage() {
    //   var _this = this;
    //   var datas = {};
    //   this.ajaxRequest("GET", "/findAllDepart", datas).then(resp => {
    //     console.log(resp);
    //     if (resp.data && resp.data.status === 200) {
    //       _this.department = resp.data.obj;
    //     } else {
    //       alert("111");
    //     }
    //   });
    // },
    //显示编辑部门信息的弹框
    showChangeDepartmentView(row) {
      console.log(row);
      this.dialogTitle = "编辑部门信息";
      this.departForm = row;
      this.departForm.departName = row.departName;
      this.departForm.principalUser = row.principalUser;
      this.departForm.connectTelNo = row.connectTelNo;
      this.departForm.connectMobileTelNo = row.connectMobileTelNo;
      this.departForm.faxes = row.faxes;
      this.departForm.branchId = row.branchId;
      this.departForm.branchName = row.branchName;
      this.dialogVisible = true;
      this.dialogType = "update";
    },
    //显示添加部门信息的弹框
    showAddDepartmentView() {
      this.dialogTitle = "添加部门信息";
      this.departForm.departName = "";
      this.departForm.principalUser = "";
      this.departForm.connectTelNo = "";
      this.departForm.connectMobileTelNo = "";
      this.departForm.faxes = "";
      this.departForm.branchId = "";
      this.departForm.branchName = "";
      this.dialogVisible = true;
      this.dialogType = "add";
    },
    //点击取消案按键之后 弹框消失
    cancelEdit() {
      this.dialogVisible = false;
    },
    //通过传递departId来删除部门信息
    deleteDepartment(row) {
      this.tableLoading = true;
      var _this = this;
      console.log(row);
      var datas = {
        id: row.departId
      };
      this.ajaxRequest("DELETE", "/deleteDepartById", datas).then(resp => {
        _this.tableLoading = false;
        if (resp && resp.status == 200) {
          var data = resp.data;
          this.$message({ type: "success", message: "删除成功！" });
          _this.initData();
        }
      });
    },
    //判断弹窗类型
    addDepartment() {
      if (this.dialogType == "add") {
        //添加部门信息
        var _this = this;
        this.dialogDepartFormVisible = false;
        _this.tableLoading = true;
        var datas = {
          departName: _this.departForm.departName,
          principalUser: _this.departForm.principalUser,
          connectTelNo: _this.departForm.connectTelNo,
          connectMobileTelNo: _this.departForm.connectMobileTelNo,
          faxes: _this.departForm.faxes,
          branchName: _this.departForm.branchName,
          branchId: _this.departForm.branchId
        };
        console.log(datas);
        _this.ajaxRequest("PUT", "/addDepart", datas).then(resp => {
          _this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;
            _this.dialogVisible = false;
            _this.emptyDepartmentMessage();
            _this.initData();
          }
        });
      }
      //修改部门信息
      else if (this.dialogType == "update") {
        var _this = this;
        _this.tableLoading = true;
        var datas = {
          departName: _this.departForm.departName,
          principalUser: _this.departForm.principalUser,
          connectTelNo: _this.departForm.connectTelNo,
          connectMobileTelNo: _this.departForm.connectMobileTelNo,
          faxes: _this.departForm.faxes,
          branchName: _this.departForm.branchName,
          branchId: _this.departForm.branchId,
          departId: _this.departForm.departId,
        };
        console.log(datas);
        _this.ajaxRequest("PUT", "/modifyDepartById", datas).then(resp => {
          _this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;
            _this.dialogVisible = false;
            _this.emptyDepartmentMessage();
            _this.initData();
          }
        });
      }
    },
    //将弹框信息置空
    emptyDepartmentMessage() {
      this.departForm = {
        departId: "",
        departName: "",
        principalUser: "",
        connectTelNo: "",
        connectTelNo: "",
        faxes: "",
        branchId: "",
        branchName: ""
      };
    },
    //获取所有机构信息
    getAllBranchMessage() {
      var _this = this;
      var datas = {};
      this.ajaxRequest("GET", "/findAllBranch", datas).then(resp => {
        console.log(resp);
        if (resp.data && resp.data.status === 200) {
          _this.branchs = resp.data.obj;
        } else {
          alert("111");
        }
      });
    },
    getbraDepUserTree() {
      var _this = this;
      var datas = {};
      this.ajaxRequest("GET", "/user/braDepUserTree", datas).then(resp => {
        console.log(resp);
        if (resp.data && resp.data.status === 200) {
          _this.braDepUser = resp.data.obj.vos;
        } else {
          // alert("111");
        }
      });
    }
    // getAllPersonByDepartId() {
    //   var _this = this;
    //   var datas = {
    //     id: _this.departForm.departId
    //   };
    //   this.ajaxRequest("PUT", "/findAllUserByDepartId", datas).then(resp => {
    //     console.log(resp);
    //     if (resp.data && resp.data.status === 200) {
    //       _this.person = resp.data.obj;
    //     } else {
    //       alert("111");
    //     }
    //   });
    // }
  }
};
</script>
<style>
.el-dialog__body {
  padding-top: 0px;
  padding-bottom: 0px;
}

.slide-fade-enter-active {
  transition: all 0.8s ease;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
 p{
  text-align: right;
}
</style>
