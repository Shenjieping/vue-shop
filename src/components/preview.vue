<template>
    <div :class="$options.name">
        <div class="header">
            <div class="title">
                <div>{{detail.goodsCompany && detail.goodsCompany.name}}</div>
                <div>{{detail.goodsCompany && detail.goodsCompany.details}}</div>
            </div>
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
    // border: 1px solid #ccc;
    .header {
        height: 200px;
        background-color: #01582d;
        position: relative;
        border-radius: 6px;
        div {
            text-align: center;
            &.title {
                // height: 200px;
                font-size: 22px;
                color: #fff;
                position: absolute;
                top: 50%;
                left: 0;
                padding: 0 20px;
                line-height: 2;
                transform: translateY(-50%);
                width: 100%;
                box-sizing: border-box;
            }
        }
    }
    .list {
        margin-top: 10px;
        border: 1px solid #01582d;
        border-radius: 6px;
        overflow: hidden;
        padding-bottom: 10px;
        .total {
            background-color: #01582d;
            font-size: 16px;
            color: #fff;
            line-height: 40px;
            padding: 0 10px;
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
                        // width: 78px;
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
    }
}
</style>
