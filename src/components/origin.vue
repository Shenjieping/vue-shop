<template>
    <div :class="$options.name">
        <div>
            <el-button type="primary" @click="showCode = true">生成溯源码</el-button>
        </div>
        <el-table
            :data="originList"
            style="width: 100%">
            <el-table-column
                type="index"
                label="编号">
            </el-table-column>
            <el-table-column
                prop="id"
                label="id">
            </el-table-column>
            <el-table-column
                prop="startCount"
                label="溯源码起始值">
            </el-table-column>
            <el-table-column
                prop="endCount"
                label="溯源码结束值">
            </el-table-column>
            <el-table-column
                width="100px">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="small"
                        @click="download(scope.row)">下载溯源码</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
            :visible.sync="showCode"
            title="生成溯源码"
            :before-close="closeCode"
            width="400px">
            <el-form
                ref="codeForm"
                :model="codeFrom"
                :rules="rules"
                label-width="80px">
                <el-form-item
                    label="起始值">
                    <span>10000220</span>
                </el-form-item>
                <el-form-item
                    prop="count"
                    label="数量">
                    <el-input v-model="codeFrom.count" placeholder="请输入数量"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addOrigin">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'origin',
    data() {
        let checkCount = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('年龄不能为空'));
            } else if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'));
            } else {
                callback();
            }
        }
        return {
            originList: [
                {
                    id: 123,
                    startCount: '1000000000',
                    endCount: '1000001000'
                }
            ],
            codeFrom: {
                count: ''
            },
            showCode: false,
            message: '',
            rules: {
                count: [
                    { validator: checkCount, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        closeCode() {
            this.showCode = false;
        },
        download(row) {
            console.log('.....', row);
        },
        addOrigin() {
            let {count} = this.codeFrom;
            if (!/^[0-9]+$/g.test(count)) {
                this.message = '请输入正确的数字';
                return;
            }
            this.message = '';
            let originArr = [];
            // for (let i = 0; i < count; i ++)
        }
    }
};
</script>

<style lang="scss">
.origin {
    .el-input__inner {
        width: 200px;
    }
    .error {
        line-height: 1;
        color: #f66;
    }
}
</style>