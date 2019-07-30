<template>
    <div :class="$options.name">
        <div class="clear">
            <ul class="shop-list pull-left">
                <li
                    class="item"
                    :class="{'active': active === key}"
                    v-for="(item, key) in goodsList"
                    :key="key"
                    @click="clickItem(item, key)">
                    {{item.goodsName}}
                </li>
            </ul>
            <div class="tabs-box">
                <el-tabs
                    v-model="activeName"
                    type="border-card">
                    <el-tab-pane label="企业信息" name="enterprise">
                        <enterprise
                            :hasEdit="detail.source.length === 0"
                            :goods-company="detail.goodsCompany"
                            @next="nextTab"
                            ref="enterpriseTemp"></enterprise>
                    </el-tab-pane>
                    <el-tab-pane label="产品信息" name="product">
                        <product-info
                            :hasEdit="detail.source.length === 0"
                            :goods-details="detail.goodsDetails"
                            :goods-name="detail.goodsName"
                            @success-add-detail="successAdd"
                            @save-detail="saveDetail"
                            @preview="preview"></product-info>
                    </el-tab-pane>
                    <el-tab-pane label="溯源码生成" name="origin">
                        <origin
                            :source="detail.source"
                            :goods-name="detail.goodsName"
                            :goods-details="detail.goodsDetails"
                            :source-init="detail.sourceOriginInitial"
                            :id="id"
                            @success-add-resouce="successAdd"></origin>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <el-dialog
            :visible.sync="previewFlag"
            :before-close="closePreview"
            :close-on-click-modal="false"
            width="375px"
            title="预览">
            <preview :detail="detail"></preview>
        </el-dialog>
    </div>
</template>

<script>
import Enterprise from '@/components/enterprise'
import Origin from '@/components/origin'
import ProductInfo from '@/components/productInfo'
import Preview from '@/components/preview'
import { api } from '@/config'
import { Loading } from '../assets/js/mixins'
export default {
    name: 'record',
    mixins: [Loading],
    data() {
        return {
            activeName: 'enterprise',
            goodsList: [],
            active: 0,
            previewFlag: false,
            detail: {
                source: [],
                goodsDetails: [],
                goodsName: '',
                createDate: 0,
                sourceOriginInitial: 0,
                goodsCompany: {
                    name: '',
                    details: '',
                    department: '',
                    payLink: ''
                }
            },
            id: ''
        }
    },
    components: {
        Enterprise,
        Origin,
        ProductInfo,
        Preview
    },
    methods: {
        clickItem(item, key) {
            this.getDetail(item.goodsName, item.id)
            this.id = item.id
            this.active = key
        },
        getUserList() {
            this.http.get(`${api.goods}/goods/list`)
                .then(res => {
                    if (res.data.result && res.data.data) {
                        this.goodsList = res.data.data
                        this.getDetail(this.goodsList[0].goodsName, this.goodsList[0].id)
                        this.id = this.goodsList[0].id
                    }
                })
                .catch(err => {
                    this.$message.error('请求出错')
                    console.error(err)
                })
        },
        getDetail(goodsName, id) {
            this.showLoading()
            this.http.post(`${api.goods}/goods/detailList`, {goodsName, id})
                .then(res => {
                    if (res.data && res.data.result) {
                        let {data} = res.data
                        let dataObj = data[0]
                        let {createDate, goodsDetails, goodsName, source, _id, sourceOriginInitial, goodsCompany} = dataObj
                        this.detail = Object.assign({}, this.detail, {
                            createDate,
                            goodsDetails,
                            goodsName,
                            source,
                            id: _id,
                            sourceOriginInitial: Number(sourceOriginInitial) || 1000000,
                            goodsCompany: goodsCompany || {name: '', details: '', department: '', payLink: ''}
                        })
                    } else {
                        this.$message.error(res.data.msg)
                    }
                    this.hideLoading()
                })
                .catch(err => {
                    this.$message.error('请求出错')
                    console.error(err)
                    this.hideLoading()
                })
        },
        successAdd({goodsName}) {
            this.getDetail(goodsName)
        },
        nextTab(type) {
            if (type) {
                this.activeName = 'product'
            }
        },
        checkTab() {
            if (this.$refs.enterpriseTemp.enterprise.name) {
                return true
            } else {
                this.$message.error('请输入企业信息')
                return false
            }
        },
        saveDetail(params) {
            if (this.checkTab()) {
                params = Object.assign({}, params, {
                    id: this.id,
                    goodsCompany: {
                        name: this.$refs.enterpriseTemp.enterprise.name,
                        details: this.$refs.enterpriseTemp.enterprise.details,
                        department: this.$refs.enterpriseTemp.enterprise.department,
                        payLink: this.$refs.enterpriseTemp.enterprise.payLink
                    }
                })
                this.http.post(`${api.goods}/goods/addDetail`, params)
                    .then(res => {
                        if (res.data && res.data.result) {
                            this.$message.success('保存成功')
                            this.$emit('success-add-detail', {goodsName: this.goodsName})
                            this.http.post(`${api.goods}/record/add`, {
                                type: `${this.goodsName} 添加商品信息`
                            })
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })
                    .catch(err => {
                        this.$message.error('请求出错')
                        console.error(err)
                    })
            }
        },
        preview() {
            this.previewFlag = true
            this.detail.goodsCompany = Object.assign({}, {
                name: this.$refs.enterpriseTemp.enterprise.name,
                details: this.$refs.enterpriseTemp.enterprise.details,
                department: this.$refs.enterpriseTemp.enterprise.department,
                payLink: this.$refs.enterpriseTemp.enterprise.payLink
            })
        },
        closePreview() {
            this.previewFlag = false
        }
    },
    created() {
        this.getUserList()
    }
}
</script>

<style lang="scss" scoped>
.record {
    .shop-list {
        width: 200px;
        padding: 0;
        margin: 0;
        border: 1px solid #ddd;
        border-radius: 6px;
        .item {
            line-height: 35px;
            font-size: 14px;
            cursor: pointer;
            padding: 0 10px;
            &:hover {
                color: #409EFF;
            }
            &.active {
                color: #409EFF;
            }
        }
    }
    .tabs-box {
        margin-left: 220px;
    }
}
</style>
