<template>
  <el-form :inline="true" :model="filters">
          <el-form-item>
             <el-select v-model="filters.value1" clearable placeholder="请选择" @change="getRole($event)">
                <el-option
                v-for="item in select1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="filters.value2" filterable
            placeholder="请输入查询内容" :loading="loading" @change="getList($event)">
                <el-option
                  v-for="item in select2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="fetchData('filters')"  icon="el-icon-search">查询</el-button>
          </el-form-item>
        </el-form>
        
</template>

<script>
// let select1= [
// {value: 'role', label: '角色'},
//  { value: 'version', label: '角色版本号'},
//  {value: 'env', label: '环境'}
// ]
// let allrole= [
//   {pro:'role',label: 'pub'},{pro: 'role',label: 'core'},
//   {pro:'env',label: 'test'},{pro: 'pro',label: 'pro'},
//   {pro:'version',label: '1.1.2'},{pro: 'version',label: '1.1.1'}
// ]
export default {
  data () {
    return {
      select1:[
{value: 'role', label: '角色'},
 { value: 'version', label: '角色版本号'},
 {value: 'env', label: '环境'}
],
allrole: [
  {pro:'role',label: 'pub'},{pro: 'role',label: 'core'},
  {pro:'env',label: 'test'},{pro: 'env',label: 'pro'},
  {pro:'version',label: '1.1.2'},{pro: 'version',label: '1.1.1'}
],
      loading: false,
      filters: {
        value1: '',
        value2: ''
      },
      select2:[]
    }
  },
  methods: {
    getRole (prov) {
        console.log(prov)
      let roles = []
    //   this.select2= []
      for (var val of this.allrole) {
        if (prov===val.pro) {
        //   console.log(val)
          roles.push({label: val.label,value: val.label})
        }
        this.select2 = roles
      }
    },
    // getList (opt) {
    //   console.log(opt)
    // }
  }
}
</script>

<style>

</style>