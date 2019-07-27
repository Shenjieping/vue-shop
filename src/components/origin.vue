<template>
    <div :class="$options.name">
        <div>
            <el-button type="primary" @click="showCodeHandle">生成溯源码</el-button>
        </div>
        <el-table
            :data="source"
            style="width: 100%">
            <el-table-column
                type="index"
                align="center"
                label="编号">
            </el-table-column>
            <!-- <el-table-column
                prop="id"
                label="id">
            </el-table-column> -->
            <el-table-column
                prop="sourceOriginBegin"
                align="center"
                label="溯源码起始值">
            </el-table-column>
            <el-table-column
                prop="sourceOriginNum"
                align="center"
                label="溯源码数量">
            </el-table-column>
            <el-table-column
                align="center"
                label="创建时间">
                <template slot-scope="scope">
                    <span>{{setTime(scope.row.sourceOriginCreateDate)}}</span>
                </template>
            </el-table-column>
            <el-table-column
                width="100px">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="small"
                        @click="download(scope.row)">下载溯源码</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
            :visible.sync="showCode"
            title="生成溯源码"
            :before-close="closeCode"
            width="400px">
            <el-form
                ref="codeForm"
                :model="codeFrom"
                :rules="rules"
                label-width="80px">
                <el-form-item
                    label="起始值">
                    <span>{{originBegin}}</span>
                </el-form-item>
                <el-form-item
                    prop="count"
                    label="数量">
                    <el-input v-model.number="codeFrom.count" placeholder="请输入数量"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addOrigin('codeForm')">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import * as Util from '@/assets/js/utils.js'
import { api } from '@/config'
export default {
    name: 'origin',
    data() {
        return {
            codeFrom: {
                count: ''
            },
            showCode: false,
            rules: {
                count: [
                    {required: true, message: '不能为空'},
                    {type: 'number', message: '必须为数字值'}
                ]
            }
        }
    },
    props: {
        source: {
            type: Array,
            default() {
                return []
            }
        },
        goodsDetails: {
            type: Array,
            default() {
                return []
            }
        },
        goodsName: {
            type: String,
            default: ''
        },
        sourceInit: {
            type: Number,
            default: 1000000000
        }
    },
    computed: {
        originBegin() {
            // if (this.source.length) {
            //     let {sourceOriginBegin, sourceOriginNum} = this.source[this.source.length - 1]
            //     return Number(sourceOriginBegin) + Number(sourceOriginNum)
            // }
            return this.sourceInit
        }
    },
    methods: {
        showCodeHandle() {
            if (!this.goodsDetails.length) {
                this.$message.error('请先输入企业信息和产品信息')
            } else {
                this.showCode = true
            }
        },
        closeCode() {
            this.showCode = false
        },
        download(row) {
            console.log('.....', row)
        },
        addOrigin(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let paramsSource = {
                        goodsName: this.goodsName,
                        sourceOriginNum: this.codeFrom.count,
                        sourceOriginBegin: this.originBegin,
                        sourceOriginCreateDate: new Date().getTime()
                    }
                    this.http.post(`${api.goods}/goods/addSource`, paramsSource)
                        .then(res => {
                            if (res.data && res.data.result) {
                                this.$message.success('添加成功')
                                this.$emit('success-add-resouce', {goodsName: this.goodsName})
                                this.closeCode()
                            } else {
                                this.$message.error(res.data.msg || '添加失败')
                            }
                        })
                        .catch(err => {
                            this.$message.error(err || '添加失败')
                            console.error(err)
                        })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        setTime(time) {
            time = Number(time)
            return Util.dateFormat(time, 'YYYY-MM-DD H:M')
        }
    }
}
</script>

<style lang="scss">
.origin {
    .el-input__inner {
        width: 200px;
    }
    .error {
        line-height: 1;
        color: #f66;
    }
}
</style>
