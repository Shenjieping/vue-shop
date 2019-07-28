<template>
    <div :class="$options.name">
        <el-form ref="addForm" :model="formAdd">
            <el-form-item
                label="产品名称："
                prop="name"
                :rules="[{required: true, message: '请输入产品名称', trigger: 'blur'}]">
                <el-input v-model="formAdd.name"></el-input>
                <!-- <el-button type="primary" @click="add">新增</el-button> -->
            </el-form-item>
            <el-form-item
                label="产品信息：">
                <el-button type="primary" @click="add">新增</el-button>
            </el-form-item>
            <el-form-item
                v-for="(item, k) in formAdd.domain"
                :prop="'domain.' + k + '.key'"
                :key="k"
                :rules="[{required: true, message: '请输入值', trigger: 'blur'}]">
                <el-input
                    :prop="'domain.' + k + '.name1'"
                    placeholder="请输入名称"
                    v-model="item.key"></el-input>
                <el-input
                    :prop="'domain.' + k + '.name2'"
                    placeholder="请输入值"
                    v-model="item.val"></el-input>
                <el-button
                    type="primary"
                    @click="deleteInput(k)">删除</el-button>
            </el-form-item>
            <el-form-item label="上传图片">
                <div class="image-list">
                    <figure
                        v-for="(item ,i) in imageList"
                        :key="i">
                        <img :src="item.url" alt="">
                        <span
                            class="el-item-delete"
                            @click="handleRemove(i)">
                            <i class="el-icon-delete"></i>
                        </span>
                    </figure>
                    <el-upload
                        class="avatar-uploader"
                        action="/upload/uploadImage"
                        accept="image/gif, image/jpeg, image/jpg, image/png, image/webp"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        v-if="imageList.length < 3"
                        :before-upload="beforeAvatarUpload">
                        <!-- <div slot="file" slot-scope="{file}">
                            <img
                                class="el-upload-list__item-thumbnail"
                                :src="file.url" alt="">
                        </div> -->
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
            </el-form-item>
            <el-form-item class="sure-btn">
                <el-button type="primary" @click="sure('addForm')">暂存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
/**
* @file editor.vue
* @author shenjp@founder.com
* @date 2019-07-20 16:41:35
*/
export default {
    name: 'editor',
    data() {
        return {
            formAdd: {
                name: '',
                domain: [
                    {
                        key: '',
                        val: ''
                    }
                ]
            },
            imageList: []
        }
    },
    props: {
        goodsName: {
            type: String,
            default: ''
        },
        goodsDetails: {
            type: Object,
            default() {
                return {
                    goodsListName: '',
                    goodsNaturePics: {},
                    goodsNatures: []
                }
            }
        },
        isAdd: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        isAdd: {
            handler(val) {
                // 修改
                if (!val) {
                    console.log(this.goodsDetails)
                    let {goodsListName, goodsNaturePics, goodsNatures} = this.goodsDetails
                    this.formAdd.name = goodsListName
                    this.formAdd.domain = [...goodsNatures]
                }
            },
            immediate: true
        }
    },
    methods: {
        add() {
            this.formAdd.domain.push({
                key: '',
                val: ''
            })
        },
        deleteInput(k) {
            this.formAdd.domain.splice(k, 1)
        },
        handleAvatarSuccess(res, file) {
            // 上传成功的回调
            // this.imageList.push({
            //     url: res.result.data,
            //     name: file.name
            // })
        },
        beforeAvatarUpload(file) {
            console.log('....', file)
        },
        handleRemove(key) {
            this.imageList.splice(key, 1)
        },
        sure(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let {name, domain} = this.formAdd
                    let params = {
                        goodsListName: name,
                        goodsNatures: [...domain],
                        goodsNaturePics: {
                            goodsNaturePicsName: '',
                            goodsNaturePics: []
                        }
                    }
                    this.$emit('sure-editor', params)
                } else {
                    return false
                }
            })
        }
    }
}
</script>

<style lang="scss">
.editor {
    .el-input {
        width: 35%;
    }
    .avatar-uploader {
        display: inline-block;
        vertical-align: middle;
        .el-upload {
            height: 100px;
            width: 100px;
            border: 1px solid #ccc;
            border-radius: 4px;
            line-height: 30px;
            .avatar-uploader-icon {
                font-size: 30px;
                margin-top: 20px;
            }
        }
    }
    .image-list {
        figure {
            height: 100px;
            width: 100px;
            margin: 0;
            display: inline-block;
            vertical-align: middle;
            margin-right: 20px;
            position: relative;
            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
            .el-item-delete {
                position: absolute;
                top: 0;
                right: 0;
                .el-icon-delete {
                    font-size: 20px;
                    color: #409EFF;
                    cursor: pointer;
                }
            }
        }
    }
    .sure-btn {
        text-align: right;
    }
    .el-button {
        padding: 10px 20px;
    }
}
</style>
