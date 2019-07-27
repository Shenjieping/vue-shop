<template>
    <div :class="$options.name">
        <div class="header">
            <div class="title">{{detail.goodsCompany && detail.goodsCompany.name}}</div>
            <div class="title-bus">{{detail.goodsCompany && detail.goodsCompany.details}}</div>
        </div>
        <div
            class="list"
            v-for="(info, k) in detail.goodsDetails"
            :key="k">
            <div class="total">{{info.goodsListName}}</div>
            <ul>
                <li
                    v-for="(item, key) in info.goodsNatures"
                    :key="key">
                    <span class="title">{{item.key}}：</span>
                    <span class="content">{{item.val}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'preview',
    data() {
        return {
        }
    },
    props: {
        detail: {
            type: Object,
            default() {
                return {}
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.preview {
    border: 1px solid #ccc;
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
                color: #000;
                i {
                    color: #f00;
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
