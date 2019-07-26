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
                <el-tabs v-model="activeName" type="border-card">
                    <el-tab-pane label="企业信息" name="enterprise">
                        <enterprise></enterprise>
                    </el-tab-pane>
                    <el-tab-pane label="产品信息" name="product">产品</el-tab-pane>
                    <el-tab-pane label="溯源码生成" name="origin">
                        <origin></origin>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import Enterprise from '@/components/enterprise'
import Origin from '@/components/origin'
import { api } from '@/config'
export default {
    name: 'record',
    data() {
        return {
            activeName: 'enterprise',
            goodsList: [],
            active: 0
        }
    },
    components: {
        Enterprise,
        Origin
    },
    methods: {
        clickItem(item, key) {
            this.getDetail(item.goodsName)
            this.active = key
        },
        getUserList() {
            this.http.get(`${api.goods}/goods/list`)
                .then(res => {
                    if (res.data.result && res.data.data) {
                        this.goodsList = res.data.data
                        this.getDetail(this.goodsList[0].goodsName)
                    }
                })
                .catch(err => {
                    console.error(err)
                })
        },
        getDetail(goodsName) {
            this.http.post(`${api.goods}/goods/detailList`, {goodsName})
                .then(res => {
                    console.log(',,,,', res)
                })
                .catch(err => {
                    console.error(err)
                })
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
