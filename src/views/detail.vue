<template>
    <div :class="$options.name">
        <div class="clear">
            <ul class="shop-list pull-left">
                <li
                    class="item"
                    v-for="(item, key) in shopList"
                    :key="key">
                    {{item.name}}
                </li>
            </ul>
            <div class="tabs-box">
                <el-tabs v-model="activeName" type="border-card">
                    <el-tab-pane label="企业信息" name="enterprise">
                        <enterprise></enterprise>
                    </el-tab-pane>
                    <el-tab-pane label="产品信息" name="product">产品</el-tab-pane>
                    <el-tab-pane label="成品包装" name="finished">成品</el-tab-pane>
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
export default {
    name: 'record',
    data() {
        return {
            activeName: 'enterprise',
            shopList: [{
                name: '香蕉'
            }, {
                name: '苹果22222'
            }]
        }
    },
    components: {
        Enterprise,
        Origin
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
        }
    }
    .tabs-box {
        margin-left: 220px;
    }
}
</style>
