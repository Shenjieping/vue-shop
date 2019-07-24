<template>
    <div :class="$options.name">
        <div class="header">
            <div class="title">上海智辉农业专业合作社产品追溯系统</div>
        </div>
        <div class="content">
            <div
                class="content-block"
                v-for="(nav, key) in detailList"
                :key="key">
                <div class="title">{{nav.title}}</div>
                <ul class="list-item">
                    <li
                        v-for="(info, i) in nav.itemBus"
                        :key="i">
                        <span class="name1">{{info.name1}}：</span>
                        <span class="name2">{{info.name2}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
/**
* @file detail.vue
* @author shenjp@founder.com
* @date 2019-07-23 13:41:33
*/
export default {
    name: 'mobile-detail',
    data() {
        return {
            detailList: [
                {
                    title: '产品介绍',
                    itemBus: [
                        {
                            name1: '产品名称',
                            name2: '测试111'
                        },
                        {
                            name1: '产品商标',
                            name2: '测试111'
                        },
                        {
                            name1: '采摘周期',
                            name2: '测试111'
                        },
                        {
                            name1: '产品名称',
                            name2: '测试111'
                        }
                    ]
                },
                {
                    title: '单位详情',
                    itemBus: [
                        {
                            name1: '产品名称',
                            name2: '测试111'
                        },
                        {
                            name1: '产品商标',
                            name2: '测试111'
                        },
                        {
                            name1: '采摘周期',
                            name2: '测试111'
                        },
                        {
                            name1: '产品名称',
                            name2: '测试111'
                        }
                    ]
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.mobile-detail {
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
        }
    }
    ul, li {
        padding: 0;
        margin: 0;
    }
    .content {
        .content-block {
            margin-top: 20px;
            .title {
                color: #fff;
                font-size: 14px;
                padding: 0 10px;
                background-color: #0ba69b;
                line-height: 32px;
            }
            ul {
                li {
                    height: 32px;
                    line-height: 32px;
                    font-size: 14px;
                    padding: 0 10px;
                    border-bottom: 1px solid #eee;
                    span {
                        display: inline-block;
                        vertical-align: middle;
                        &.name1 {
                            color: #000;
                            width: 78px;
                        }
                        &.nam2 {
                            color: #999;
                        }
                    }
                }
            }
        }
    }
}
</style>
