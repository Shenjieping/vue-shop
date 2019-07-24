<template>
    <div :class="$options.name">
        <div class="header">
            <div class="title">上海智辉农业专业合作社产品追溯系统</div>
            <div class="title-bus" v-if="count === 0">首次查询，欢迎您购买松江牌大米</div>
            <div class="title-bus" v-else>该产品已被查询<i>{{count}}</i>次</div>
        </div>
        <div class="list">
            <div class="total">溯源总揽</div>
            <ul>
                <li
                    v-for="(item, key) in listItem"
                    :key="key">
                    <span class="title">{{item.name1}}：</span>
                    <span class="content">{{item.name2}}</span>
                </li>
            </ul>
            <div
                class="show-more"
                @click="showMore">点击查看更多</div>
        </div>
    </div>
</template>

<script>
/**
* @file home.vue
* @author shenjp@founder.com
* @date 2019-07-23 13:41:11
*/
export default {
    name: 'mobile-home',
    data() {
        return {
            count: 1,
            listItem: [
                {
                    name1: '产品名称',
                    name2: '测试2222'
                },
                {
                    name1: '产品名称',
                    name2: '测试2222'
                },
                {
                    name1: '产品名称',
                    name2: '测试2222'
                },
                {
                    name1: '产品名称',
                    name2: '测试2222'
                },
                {
                    name1: '产品名称',
                    name2: '测试2222'
                }
            ]
        }
    },
    methods: {
        showMore() {
            this.$router.push({
                name: 'MobileDetail'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.mobile-home {
    .header {
        height: 200px;
        background-color: #0ba69b;
        position: relative;
        div {
            text-align: center;
            &.title {
                height: 200px;
                line-height: 200px;
                font-size: 18px;
                color: #fff;
            }
            &.title-bus {
                position: absolute;
                width: 100%;
                bottom: 20px;
                i {
                    color: #f66;
                    font-style: normal;
                }
            }
        }
    }
    .list {
        margin-top: 20px;
        .total {
            background-color: #0ba69b;
            font-size: 16px;
            color: #fff;
            line-height: 32px;
            padding: 0 20px;
        }
        ul {
            padding: 0;
            margin: 0;
            li {
                height: 32px;
                line-height: 32px;
                padding: 0 10px;
                border-bottom: 1px solid #eee;
                span {
                    display: inline-block;
                    vertical-align: middle;
                    line-height: 32px;
                    font-size: 14px;
                    &.title {
                        width: 78px;
                        text-align: justify;
                        color: #000;
                        text-align-last: justify;
                    }
                    &.content {
                        color: #999;
                    }
                }
            }
        }
        .show-more {
            color: #fff;
            font-size: 14px;
            margin: 20px 20px 0;
            background-color: #409EFF;
            height: 32px;
            line-height: 32px;
            border-radius: 4px;
            text-align: center;
        }
    }
}
</style>
