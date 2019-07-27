<template>
    <div :class="$options.name">
        <div class="product-box">
            <div>
                <el-button type="primary" @click="showAddHandle(true)" v-if="hasEdit">新增</el-button>
                <el-button type="primary" @click="preview()">预览</el-button>
            </div>
            <div
                class="product-box-list"
                v-for="(info, k) in detailList"
                :key="k">
                <div class="title">
                    <div class="product-name">
                        <span>产品名称：</span>
                        <span>{{info.goodsListName}}</span>
                    </div>
                    <div class="oper" v-if="hasEdit">
                        <el-button type="text" @click="showEditHandle(k)">修改</el-button>
                        <el-button type="text" @click="deleteHandle(k)">删除</el-button>
                    </div>
                </div>
                <div
                    class="nature-list"
                    v-for="(nat, i) in info.goodsNatures"
                    :key="i">
                    <span>{{nat.key}}：</span>
                    <span>{{nat.val}}</span>
                </div>
            </div>
            <el-button type="primary" @click="saveResult()" v-if="hasEdit">保存</el-button>
        </div>
        <el-dialog
            :visible.sync="showAdd"
            :before-close="closeAdd"
            :title="isAdd ? '新增' : '修改'">
            <editor
                v-if="showAdd"
                :goods-name="goodsName"
                :goods-details="detailList[index]"
                :is-add="isAdd"
                @sure-editor="sureEditor"></editor>
        </el-dialog>
    </div>
</template>

<script>
import Editor from '@/components/editor'
// import { api } from '@/config'
export default {
    name: 'product-info',
    data() {
        return {
            showAdd: false,
            isAdd: false,
            detailList: [],
            index: 0,
            previewFlag: false
        }
    },
    components: {
        Editor
    },
    props: {
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
        hasEdit: {
            type: Boolean,
            default: true
        }
    },
    watch: {
        goodsDetails: {
            handler(val) {
                this.detailList = val
            },
            immediate: true
        }
    },
    methods: {
        closeAdd() {
            this.showAdd = false
        },
        showAddHandle(type) {
            this.showAdd = true
            this.isAdd = type
        },
        showEditHandle(k) {
            this.showAdd = true
            this.isAdd = false
            this.index = k
        },
        sureEditor(params) {
            if (this.isAdd) {
                // 新增
                this.detailList.push(params)
            } else {
                // 修改
                this.detailList.splice(this.index, 1, params)
            }
            this.closeAdd()
            this.$message.success('数据已暂存，请点击保存')
        },
        saveResult() {
            let params = {
                goodsName: this.goodsName,
                goodsDetails: [...this.detailList]
            }
            this.$emit('save-detail', params)
        },
        deleteHandle(k) {
            this.index = k
            this.$confirm(`确认删除该数据吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.detailList.splice(this.index, 1)
                this.$message.success('已删除该数据，请点击保存')
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                })
            })
        },
        preview() {
            this.$emit('preview', true)
        }
    }
}
</script>

<style lang="scss" scoped>
.product-info {
    .product-box {
        .product-box-list {
            margin-bottom: 20px;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
            padding: 10px;
            .title {
                border-bottom: 1px solid #eee;
                display: flex;
                .product-name {
                    flex: 1;
                }
                .oper {
                    .el-button {
                        padding: 0;
                    }
                }
            }
            .title,
            .nature-list {
                line-height: 1.8;
                span {
                    &:first-child {
                        color: #333;
                    }
                    &:last-child {
                        color: #999;
                    }
                }
            }
        }
        .el-button--primary {
            margin-bottom: 20px;
        }
    }
}
</style>
