<template>
    <div class="users-container container">
        <div class="content">
            <el-table :data="wishesList"
                stripe
                style="width: 100%"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column
                    label="序号"
                    width="80"
                    align="center">
                    <template slot-scope="scope">
                        {{scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="操作方式"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="操作时间"
                    align="center">
                    <template slot-scope="scope">
                        <span>{{setTime(scope.row.createDate)}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { api } from '@/config'
import { Loading } from '../assets/js/mixins'
import * as Util from '@/assets/js/utils.js'

export default {
    name: 'wishes',
    mixins: [Loading],
    data() {
        return {
            wishesList: []
        }
    },
    methods: {
        getWishesList() {
            this.showLoading()
            this.http.get(`${api.goods}/record/list`)
                .then(res => {
                    if (res.data.result) {
                        this.wishesList = res.data.data
                    } else {
                        this.$message.error(res.data.msg)
                    }
                    this.hideLoading()
                }).catch(err => {
                    this.hideLoading()
                    console.error(err)
                    this.$message.error('加载失败')
                })
        },
        setTime(time) {
            time = Number(time)
            return Util.dateFormat(time, 'YYYY-MM-DD H:M')
        }
    },
    created() {
        this.getWishesList()
    }
}
</script>

<style lang="scss" scoped>

</style>
