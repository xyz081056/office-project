<template>
  <div>
    <el-container>
      <el-header>
        <h1>用户管理</h1>
        <hr />
      </el-header>
      <el-main>
        <p>
          <el-button @click="dialogUserFormVisible = true" class="el-icon-s-custom">添加用户</el-button>
        </p>
        <!--显示用户信息的表格-->
        <el-table
          :data="users"
          border
          style="width: 90%;margin:20px auto"
          v-loading="tableLoading"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="id" type="selection" align="left" width></el-table-column>
          <el-table-column
            prop="userId"
            v-model="users.userId"
            align="center"
            label="用户ID"
            width="200px"
          ></el-table-column>
          <el-table-column
            prop="username"
            v-model="users.username"
            align="center"
            label="姓名"
            width="200px"
          ></el-table-column>
          <el-table-column
            prop="name"
            v-model="users.name"
            align="center"
            label="真实姓名"
            width="200px"
          ></el-table-column>
          <el-table-column
            prop="departmentName"
            v-model="users.departmentName"
            align="center"
            label="所在部门"
            width="200px"
          ></el-table-column>
          <el-table-column
            prop="roleDesc"
            v-model="role.roleDesc"
            align="center"
            label="角色"
            width="200px"
          ></el-table-column>
          <el-table-column
            prop="isBlocked"
            v-model="users.isBlocked"
            align="center"
            label="用户状态"
            width="200px"
          ></el-table-column>
          <el-table-column prop="avatar" v-model="users.avatar" label="用户详情" align="center">
            <template slot-scope="scope">
              <span class="colorBlue" @click="showUserDetail(scope.row)">详情</span>
            </template>
          </el-table-column>
          <el-table-column align="left" label="操作" width="200" fixed="right">
            <template slot-scope="scope">
              <el-button
                @click="editUser(scope.row)"
                style="padding: 3px 4px 3px 4px;margin: 2px"
                size="mini"
              >修改</el-button>
              <el-button
                type="danger"
                size="mini"
                v-if="users.length>0"
                :disabled="multipleSelection.length==0"
                @click="deleteManyEmployee"
              >删除选定项</el-button>
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
        <!--添加用户信息的模态框-->
        <el-dialog :title="dialogUserFormTitle" :visible.sync="dialogUserFormVisible">
          <el-form
            :model="userForm"
            :rules="rules"
            ref="userForm"
            style="margin-left:130px"
            label-position="left"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="用户ID"
                  :label-width="formLabelWidth"
                  prop="userId"
                  v-if="showUserId"
                >
                  <el-input
                    v-model="userForm.userId"
                    auto-complete="off"
                    disabled="disabled"
                    style="width:100%"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                  <el-input v-model="userForm.username" auto-complete="off" style="width:100%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                  <el-input
                    type="password"
                    v-model="userForm.password"
                    auto-complete="off"
                    style="width:100%"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="name">
                  <el-input v-model="userForm.name" style="width:100%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="所在部门" :label-width="formLabelWidth" prop="departmentId">
                  <el-select v-model="userForm.departmentId" placeholder="请选择部门" style="width:100%">
                    <el-option
                      v-for="item in departments"
                      :key="item.departId"
                      :label="item.departName"
                      :value="item.departId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
                  <el-radio-group v-model="userForm.gender" style="width:100%">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="0">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="角色" :label-width="formLabelWidth" prop="roleName">
                  <el-select v-model="userForm.roleName" placeholder="请选择角色" style="width:100%">
                    <el-option label="普通用户" value="ROLE_USER"></el-option>
                    <el-option label="管理员" value="ROLE_HR"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="用户状态"
                  :label-width="formLabelWidth"
                  prop="isBlocked"
                  v-if="showUserState"
                >
                  <el-select v-model="userForm.isBlocked" placeholder="请选择角色" style="width:100%">
                    <el-option label="被屏蔽" value="true"></el-option>
                    <el-option label="正常状态" value="flase"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div id="app">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-button @click="uploadPic()">上传</el-button>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel()">取 消</el-button>
            <el-button type="primary" @click="addUser()">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 显示员工信息详情的模态框 -->
        <el-dialog title="用户信息详情" :visible.sync="dialogTableVisible">
          <el-table :data="user">
            <el-table-column property="username" label="用户名" width="150px" align="center"></el-table-column>
            <el-table-column property="departmentName" label="所在部门" width="150px" align="center"></el-table-column>
            <el-table-column property="gender" label="性别" width="150px" align="center"></el-table-column>
            <el-table-column property="roleName" label="角色" width="150px" align="center"></el-table-column>
            <el-table-column property="isBlocked" label="用户状态" width="150px" align="center"></el-table-column>
          </el-table>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      users: [],
      departments: [],
      tableLoading: false,
      dialogUserFormVisible: false,
      dialogTableVisible: false,
      formLabelWidth: "120px",
      dialogUserFormTitle: "添加员工信息",
      showUserState: false,
      showUserId: false,
      userForm: {
        userId: "",
        username: "",
        password: "",
        departmentId: "",
        gender: "",
        roleName: "",
        isBlocked: "",
        avatar: "",
        name: ""
      },
      imageUrl: "",
      role: [],
      multipleSelection: [],
      user: [],
      varr: [],
      totalCount: -1,
      currentPage: 1,
      rules: {
        userId: [{ required: true, message: "必填:用户ID", trigger: "blur" }],
        username: [{ required: true, message: "必填:用户名", trigger: "blur" }],
        password: [{ required: true, message: "必填:密码", trigger: "blur" }],
        departmentId: [
          { required: true, message: "必填:所在部门", trigger: "blur" }
        ],
        gender: [{ required: true, message: "必填:性别", trigger: "blur" }],
        roleName: [{ required: true, message: "必填:角色", trigger: "blur" }],
        isBlocked: [
          { required: true, message: "必填:用户状态", trigger: "blur" }
        ]
      }
    };
  },
  mounted: function() {
    this.loadUserInfo(); // 获取所有的员工信息
    this.getAllDepartInfo(); // 获取所有的部门信息
  },
  methods: {
    currentChange: function(currentChange) {
      this.currentPage = currentChange;
      this.loadUserInfo();
    },
    emptyUserForm: function() {
      this.userForm = {
        username: "",
        password: "",
        departmentId: "",
        gender: "",
        roleName: "",
        isBlocked: "",
        name: ""
      };
    },
    // 获取所有部门的信息
    getAllDepartInfo: function() {
      var _this = this;
      var datas = {
        size: 100000,
        start: 0
      };
      this.ajaxRequest("GET", "/findAllDepart", datas).then(resp => {
        if (resp.data && resp.data.status === 200) {
          var data = resp.data.obj;
          _this.departments = data;
        }
      });
    },
    // 加载员工信息
    loadUserInfo: function() {
      var _this = this;

      var datas = {};
      // 调用获取所有员工信息的API接口
      this.ajaxRequest("POST", "/user/list", datas).then(resp => {
        if (resp.data && resp.data.status === 200) {
          var data = resp.data.obj.vos;
          var varr = resp.data.obj.vos;
          console.log(data);
          _this.users = data;
          var i = 0;
          for (i = 0; i < varr.length; i++) {
            _this.role[i] = varr[i].roles;
            console.log(_this.role[i]);
          }
          // _this.user.forEach(res => {
          //   console.log(res.roles);
          // });
          // var date = _this.users.slice(1);
          // console.log(date);
        }
      });
    },
    //添加员工信息
    addUser: function() {
      var _this = this;
      this.dialogUserFormVisible = false;
      this.$refs["userForm"].validate(valid => {
        if (valid) {
          // 修改用户信息
          if (this.userForm.userId) {
            this.tableLoading = true;
            this.userForm.gender = parseInt(this.userForm.gender);
            // 调用修改员工信息的API接口
            this.ajaxRequest("PUT", "/user/", this.userForm).then(resp => {
              _this.tableLoading = false;
              console.log(this.userForm);
              if (resp && resp.status === 200) {
                _this.loadUserInfo();
              }
            });
            _this.emptyUserForm();
            this.dialogUserFormTitle = "添加员工信息";
            this.showUserState = false;
            this.showUserId = false;
          } else {
            this.tableLoading = true;
            this.userForm.gender = parseInt(this.userForm.gender);
            // this.userForm.roleId = parseInt(this.userForm.roleId);
            console.log(typeof _this.userForm.gender);
            // this.userForm.roleId = parseInt(this.userForm.roleId)
            // 调用添加员工信息的API接口
            this.ajaxRequest("POST", "/user/", this.userForm).then(resp => {
              _this.tableLoading = false;
              console.log(this.userForm);
              if (resp && resp.status === 200) {
                _this.emptyUserForm();
                _this.loadUserInfo();
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    // 修改员工信息
    editUser: function(row) {
      this.dialogUserFormVisible = true;
      this.dialogUserFormTitle = "修改员工信息";
      this.showUserState = true;
      this.showUserId = true;
      this.userForm.userId = row.userId;
      this.userForm.username = row.username;
      this.userForm.password = row.password;
      this.userForm.departmentId = row.departmentId;
      this.userForm.gender = row.gender;
      this.userForm.roleName = row.roleName;
      this.userForm.isBlocked = row.isBlocked;
      this.userForm.name = row.name;
    },
    // 显示员工信息的详情
    showUserDetail: function(row) {
      this.dialogTableVisible = true;
      this.user = [];
      this.user.push({
        username: row.username,
        password: row.password,
        departmentName: row.departmentName,
        gender: row.gender,
        roleName: row.roleName,
        isBlocked: row.isBlocked
      });
    },
    // 删除员工信息的方法
    doDeleteUser: function(userId) {
      this.tableLoading = true;
      var _this = this;
      var datas = {};
      // 调用删除员工信息的API接口
      this.postRequest("/deleteUserInfo", datas).then(resp => {
        _this.tableLoading = false;
        if (resp && resp.status === 200) {
          // var data = resp.data
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          _this.loadUserInfo();
        }
      });
    },
    cancel: function() {
      this.dialogUserFormVisible = false;
      this.emptyUserForm();
      this.showUserState = false;
      this.showUserId = false;
    },
    //用户上传照片
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = (file.type === "image/jpeg") | (file.type === "image/png");
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 或者PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return isJPG && isLt2M;
    },
    //上传用户照片的接口
    uploadPic: function() {
      var _this = this;
      var datas = {
        imageUrl: ""
      };
      // 调用获取所有员工信息的API接口
      this.ajaxRequest("PUT", "/user/fileUpload", datas).then(resp => {
        if (resp.data && resp.data.status === 200) {
          var data = resp.data.obj.vos;
          console.log(data);
        }
      });
    },
    //批量删除/屏蔽选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deleteManyEmployee() {
      this.$confirm(
        "此操作将删除[" + this.multipleSelection.length + "]条数据, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          var Ids = [];
          for (var i = 0; i < this.multipleSelection.length; i++) {
            Ids.push(this.multipleSelection[i].userId);
          }
          this.doDeleteMultiPrize(Ids);
        })
        .catch(() => {});
    },
    doDeleteMultiPrize(Ids) {
      this.tableLoading = true;
      var _this = this;
      var datas = {
        ids: Ids
      };
      this.ajaxRequest("POST", "/user/delete", datas).then(resp => {
        _this.tableLoading = false;
        if (resp && resp.status == 200) {
          var data = resp.data;
          this.$message({ type: "success", message: "删除成功！" });
          _this.loadUserInfo();
        }
      });
    }
  }
};
</script>
<style>
h1 {
  margin: 20px auto;
}
p {
  text-align: right;
}
.colorBlue {
  color: blue;
}
.colorRed {
  color: red;
}
.el-input {
  width: 200px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
