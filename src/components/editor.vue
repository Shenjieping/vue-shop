<template>
    <div :class="$options.name">
        <el-form ref="addForm" :model="formAdd">
            <el-form-item label="名称">
                <el-input v-model="formAdd.name"></el-input>
                <el-button type="primary" @click="add">新增</el-button>
            </el-form-item>
            <el-form-item
                v-for="(item, k) in formAdd.domain"
                :key="k">
                <el-input
                    :prop="'domain.' + k + '.name1'"
                    v-model="item.name1"></el-input>
                <el-input
                    :prop="'domain.' + k + '.name2'"
                    v-model="item.name2"></el-input>
                <el-button
                    type="primary"
                    @click="deleteInput(k)"
                    v-if="formAdd.domain.length > 1">删除</el-button>
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
                        action="/"
                        :limit="3"
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
                <el-button type="primary" @click="sure">确定</el-button>
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
                        name1: '',
                        name2: ''
                    }
                ]
            },
            imageList: [
                {
                    url: '//10.url.cn/qqcourse_logo_ng/ajNVdqHZLLDWoicvGibs2frpUgmg2FBF7BIU58EZT0Vm3aeGB3ZKc4S7WYauyfc4zL5BZmr1ibPL6o/356'
                },
                {
                    url: '//10.url.cn/qqcourse_logo_ng/ajNVdqHZLLDWoicvGibs2frpUgmg2FBF7BIU58EZT0Vm3aeGB3ZKc4S7WYauyfc4zL5BZmr1ibPL6o/356'
                }
            ]
        }
    },
    methods: {
        add() {
            this.formAdd.domain.push({
                name1: '',
                name2: ''
            })
        },
        deleteInput(k) {
            this.formAdd.domain.splice(k, 1)
        },
        handleAvatarSuccess(res, file) {

        },
        beforeAvatarUpload(file) {
            console.log('....', file);
        },
        handleRemove(key) {
            this.imageList.splice(key, 1);
        },
        sure() {
            console.log(this.formAdd);
            let {name, domain} = this.formAdd;
            let params = {
                info: name,
                list: domain,
                imageList: this.imageList
            };
            this.$emit('sure-editor', params);
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
}
</style>
