<template>
    <div class="users-container container">
        <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/users' }">用户管理</el-breadcrumb-item>
        </el-breadcrumb> -->
        <div class="header">
            <el-button type="primary"
                plain
                @click="showAddModal">添加商品</el-button>
        </div>
        <div class="content">
            <el-table :data="goodsList"
                stripe
                style="width: 100%"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column label="序号"
                    width="80">
                    <template slot-scope="scope">
                        {{scope.$index + 1}}
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="_id"
                    label="商品id">
                </el-table-column> -->
                <el-table-column prop="goodsName"
                    label="商品名称">
                </el-table-column>
                <!-- <el-table-column prop="desc"
                    label="商品描述">
                </el-table-column> -->
                <el-table-column
                    label="创建时间">
                    <template slot-scope="scope">
                        <span>{{setTime(scope.row.createDate)}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="80"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="text"
                            @click="del(scope.row.goodsName)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="添加用户"
            :visible.sync="addModal"
            v-if="addModal"
            width="35%">
            <el-form :model="user"
                :rules="rules"
                ref="userForm">
                <el-form-item prop="name">
                    <el-input v-model="user.name"
                        placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <!-- <el-form-item prop="pwd">
                    <el-input v-model="user.pwd"
                        type="password"
                        placeholder="请输入密码"></el-input>
                </el-form-item> -->
            </el-form>
            <span slot="footer"
                class="dialog-footer">
                <el-button @click="hideAddModal">取 消</el-button>
                <el-button type="primary"
                    @click="addUser">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { api } from '@/config'
import { Loading } from '../assets/js/mixins'
import * as Util from '@/assets/js/utils.js'

export default {
    name: 'users',
    mixins: [Loading],
    data() {
        return {
            user: {
                name: '',
                pwd: ''
            },
            goodsList: [],
            addModal: false,
            rules: {
                name: [{ required: true, message: '请输入商品名', trigger: 'blur' }]
            }
        }
    },
    methods: {
        showAddModal() {
            this.addModal = true
        },
        hideAddModal() {
            this.addModal = false
        },
        setTime(time) {
            time = Number(time)
            return Util.dateFormat(time, 'YYYY-MM-DD H:M')
        },
        getUserList() {
            this.http.get(`${api.goods}/goods/list`)
                .then(res => {
                    if (res.data.result && res.data.data) {
                        this.goodsList = res.data.data
                    }
                })
                .catch(err => {
                    console.error(err)
                })
        },
        addUser() {
            this.$refs.userForm.validate((valid) => {
                if (valid) {
                    this.http.post(`${api.goods}/goods/add`, {
                        goodsName: this.user.name
                    }).then(res => {
                        if (res.data.result) {
                            this.$message.success('添加成功')
                            this.getUserList()
                            this.addModal = false
                            this.http.post(`${api.goods}/record/add`, {
                                type: `添加商品 ${this.user.name}`
                            })
                        } else {
                            this.$message.error(`添加失败:${res.data.msg}`)
                        }
                    }).catch(err => {
                        this.$message.error(err)
                    })
                }
            })
        },
        del(goodsName) {
            this.$confirm(`确认删除 ${goodsName} 吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.http.post(`${api.goods}/goods/del`, { goodsName })
                    .then(res => {
                        if (res.data.result) {
                            this.$message.success('删除成功')
                            this.getUserList()
                            this.http.post(`${api.goods}/record/add`, {
                                type: `删除商品 ${goodsName}`
                            })
                        } else {
                            this.$message.error('删除失败')
                        }
                    }).catch((error) => {
                        this.$message.error(error)
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                })
            })
        }
    },
    created() {
        this.getUserList()
    }
}
</script>

<style lang="scss" scoped>

</style>
