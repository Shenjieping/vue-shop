<template>
    <div :class="$options.name">
        <div class="header-btn">
            <el-button type="primary" @click="showAdd = true">新增</el-button>
            <el-button type="warning">修改</el-button>
            <el-button type="danger">删除</el-button>
        </div>
        <el-dialog
            :visible.sync="showAdd"
            :before-close="closeAdd"
            title="新增">
            <editor></editor>
        </el-dialog>
    </div>
</template>

<script>
import Editor from '@/components/editor';
export default {
    name: 'enterprise',
    data() {
        return {
            showAdd: false
        };
    },
    components: {
        Editor
    },
    methods: {
        closeAdd() {
            this.showAdd = false;
        }
    }
};
</script>

<style lang="scss" scoped>

</style>