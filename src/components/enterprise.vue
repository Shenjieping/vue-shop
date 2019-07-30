<template>
    <div :class="$options.name">
        <div class="enter-info">
            <el-form
                ref="enterprise"
                :model="enterprise"
                :rules="rules"
                label-width="80px">
                <el-form-item
                    prop="name"
                    label="企业名称">
                    <el-input v-model="enterprise.name" placeholder="请输入企业名称" v-if="hasEdit"></el-input>
                    <span v-else>{{enterprise.name}}</span>
                </el-form-item>
                <el-form-item
                    label="企业描述"
                    prop="details">
                    <el-input v-model="enterprise.details" placeholder="请输入企业描述" v-if="hasEdit"></el-input>
                    <span v-else>{{enterprise.details}}</span>
                </el-form-item>
                <el-form-item
                    label="监管部门"
                    prop="department">
                    <el-input v-model="enterprise.department" placeholder="请输入监管部门" v-if="hasEdit"></el-input>
                    <span v-else>{{enterprise.department}}</span>
                </el-form-item>
                <el-form-item
                    label="购买链接"
                    prop="payLink">
                    <el-input v-model="enterprise.payLink" placeholder="请输入购买链接" v-if="hasEdit"></el-input>
                    <span v-else>{{enterprise.payLink}}</span>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="next('enterprise')">下一步</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import Editor from '@/components/editor'
export default {
    name: 'enterprise',
    data() {
        return {
            showAdd: false,
            enterprise: {
                name: '',
                details: '',
                department: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入企业名称', trigger: 'blur' },
                    { max: 30, message: '请输入小于30字', trigger: 'blur' }
                ],
                details: [
                    { max: 30, message: '请输入小于30字', trigger: 'blur' }
                ],
                department: [
                    { required: true, message: '请输入监管部门', trigger: 'blur' },
                    { max: 30, message: '请输入小于30字', trigger: 'blur' }
                ],
                payLink: [
                    { type: 'url', message: '请输入正确的链接', trigger: 'blur' }
                ]
            }
        }
    },
    props: {
        goodsCompany: {
            type: Object,
            default() {
                return {
                    name: '',
                    details: '',
                    department: '',
                    payLink: ''
                }
            }
        },
        hasEdit: {
            type: Boolean,
            default: true
        }
    },
    watch: {
        goodsCompany: {
            handler(val) {
                this.enterprise = Object.assign({}, val)
            },
            immediate: true
        }
    },
    components: {
        Editor
    },
    methods: {
        closeAdd() {
            this.showAdd = false
        },
        next(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$emit('next', true)
                } else {
                    this.$message.error('请填写企业名称和监管部门')
                    return false
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
