<template>
    <div class="slider-container">
        <el-menu :default-active="activeIndex"
            class="el-menu-vertical-demo"
            mode="vertical"
            :router=true>
            <el-menu-item index="list"
                class="tc">商品列表</el-menu-item>
            <el-menu-item index="detail"
                class="tc">商品详情</el-menu-item>
            <el-menu-item index="record"
                class="tc">操作记录</el-menu-item>
        </el-menu>
    </div>
</template>
<script>
export default {
    name: 'slider',
    data() {
        return {
            activeIndex: 'list',
            pathMap: {
                List: 'list',
                Detail: 'detail',
                Record: 'record'
            }
        }
    },
    watch: {
        '$route.path'() {
            this.reset()
        }
    },
    computed: {
        path() {
            return this.$route.matched[0] && this.$route.matched[0].name
        }
    },
    methods: {
        reset() {
            const path = this.$route.path
            if (path) {
                this.activeIndex = this.pathMap[this.path]
            }
        }
    },
    created() {
        this.reset()
    }
}
</script>
<style lang="scss" scoped>
.slider-container {
  width: 200px;
  height: 100%;
  display: inline-block;
}
</style>
<style lang="scss">
.slider-container {
  .el-menu {
    height: 100%;
  }
}
</style>
