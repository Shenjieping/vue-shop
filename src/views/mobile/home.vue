<template>
    <div :class="$options.name">
        <div class="header">
            <div class="title">
                <div>{{detailObj.goodsCompany && detailObj.goodsCompany.name}}</div>
                <div>{{detailObj.goodsCompany && detailObj.goodsCompany.details}}</div>
            </div>
        </div>
        <div class="info">
            <div class="product-code">
                <span class="name">产品编码：</span>
                <span class="code">{{detailObj.productCode}}</span>
            </div>
            <div class="count">
                已查询 <i>{{detailObj.transmit}}</i> 次
            </div>
        </div>
        <div
            class="list"
            v-for="(info, k) in detailObj.goodsDetails"
            :key="k"
            v-show="setMore(k)">
            <div class="total">{{info.goodsListName}}</div>
            <ul>
                <li
                    v-for="(item, key) in info.goodsNatures"
                    :key="key">
                    <span class="title">{{item.key}}：</span>
                    <span class="content">{{item.val}}</span>
                </li>
            </ul>
            <div class="image-box">
                <div class="img-title" v-if="info.goodsNaturePics.goodsNaturePicsName">{{info.goodsNaturePics.goodsNaturePicsName}}：</div>
                <figure
                    v-for="(img, m) in info.goodsNaturePics.goodsNaturePics"
                    :key="m">
                    <img :src="img" alt="" />
                </figure>
            </div>
        </div>
        <div class="foot-btn">
            <div class="more" @click="showMore" v-if="!showMoreFlag">更多溯源信息</div>
            <div
                class="play"
                :class="{'hide-more': showMoreFlag}">
                <a :href="detailObj.goodsCompany.payLink">立即购买</a>
            </div>
        </div>
        <div class="foot-title">{{detailObj.goodsCompany.department}}</div>
    </div>
</template>

<script>
/**
* @file home.vue
* @author shenjp@founder.com
* @date 2019-07-23 13:41:11
*/
import { api } from '@/config'
export default {
    name: 'mobile-home',
    data() {
        return {
            count: 1,
            detailObj: {
                createDate: '',
                goodsDetails: [],
                goodsName: '',
                source: [],
                transmit: 0, // 查询次数
                productCode: '',
                goodsCompany: {
                    name: '',
                    details: '',
                    payLink: '',
                    department: ''
                }
            },
            showMoreFlag: false
        }
    },
    methods: {
        showMore() {
            this.showMoreFlag = true
        },
        setMore(k) {
            if (this.showMoreFlag) {
                return true
            } else {
                return k === 0
            }
        },
        getDetail(num, id) {
            this.http.post(`${api.goods}/goods/detailpadList`, {
                num,
                id
            })
                .then(res => {
                    if (res.data && res.data.result) {
                        let {createDate, goodsDetails, goodsName, source, transmit, goodsCompany} = res.data.data[0]
                        this.detailObj = Object.assign({}, this.detailObj, {
                            createDate,
                            goodsDetails,
                            goodsName,
                            source,
                            transmit,
                            goodsCompany,
                            productCode: this.$route.query.num || ''
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
    created() {
        let {
            num,
            id
        } = this.$route.query
        if (!num || !id) {
            this.$message.error('商品名称错误')
        } else {
            this.getDetail(num, id)
        }
    }
}
</script>

<style lang="scss" scoped>
$THEME: #014d27;
.mobile-home {
    position: relative;
    min-height: 100%;
    box-sizing: border-box;
    padding-bottom: 30px;
    max-width: 800px;
    margin: 0 auto;
    padding: 4px 10px;
    box-sizing: border-box;
    .header {
        height: 200px;
        background-color: $THEME;
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
    .info {
        border: 1px solid $THEME;
        margin-top: 10px;
        border-radius: 4px;
        .product-code {
            line-height: 32px;
            text-align: center;
            font-size: 18px;
            .name {
                font-weight: 600;
                color: #000;
            }
            .code {
                color: #f66;
            }
        }
        .count {
            text-align: center;
            line-height: 32px;
            font-size: 16px;
            i {
                font-style: normal;
                color: #f66;
            }
        }
    }
    .list {
        margin-top: 10px;
        border: 1px solid $THEME;
        border-radius: 6px;
        overflow: hidden;
        padding-bottom: 10px;
        .total {
            background-color: $THEME;
            font-size: 16px;
            color: #fff;
            line-height: 40px;
            padding: 0 10px;
        }
        ul {
            padding: 0;
            margin: 0;
            li {
                line-height: 32px;
                padding: 0 10px;
                border-bottom: 1px solid #ddd;
                span {
                    line-height: 32px;
                    font-size: 14px;
                    &.title {
                        // width: 78px;
                        text-align: justify;
                        color: #000;
                        text-align-last: justify;
                    }
                    &.content {
                        color: #666;
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
    .foot-btn {
        display: flex;
        margin: 20px 10px;
        .more,
        .play {
            flex: 1;
            height: 44px;
            line-height: 44px;
            text-align: center;
            font-size: 18px;
            a {
                text-decoration: none;
                color: #000;
                display: block;
            }
        }
        .more {
            background-color: $THEME;
            border-radius: 4px 0 0 4px;
            color: #fff;
            border: 1px solid $THEME;
            border-right: none;
        }
        .play {
            border: 1px solid #aaa;
            border-radius: 0 4px 4px 0;
            border-left: none;
            &.hide-more {
                border-left: 1px solid #aaa;
                border-radius: 4px;
            }
        }
    }
    .foot-title {
        font-size: 12px;
        width: 100%;
        text-align: center;
    }
    .image-box {
        .img-title {
            margin: 5px 10px;
            font-size: 14px;
            color: #000;
        }
        figure {
            margin: 0 5px 20px;
            img {
                width: 100%;
            }
        }
    }
}
</style>
