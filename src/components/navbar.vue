<template>
    <div class="nav-container">
        <header>
            <ul>
                <li class="title fl"
                    @click="toIndex">商品管理系统</li>
                <li class="user-name fs-16">
                    <span style="font-weight: normal;">您好: </span>{{username}}</li>
                <li class="log-out fs-14"
                    @click="logOut">退出</li>
            </ul>
        </header>
    </div>
</template>
<script>
// import Store from 'store2'

export default {
    name: 'navbar',
    data() {
        return {
            username: ''
        }
    },
    methods: {
        toIndex() {
            this.$router.push('/')
        },
        logOut() {
            this.$confirm('确认退出？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.clearCookie('userName')
                this.$router.push('/login')
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                })
            })
        },
        clearCookie(name) {
            this.setCookie(name, '', -1)
        },
        setCookie(cname, cvalue, exdays) {
            var d = new Date()
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
            var expires = 'expires=' + d.toUTCString()
            document.cookie = cname + '=' + cvalue + '; ' + expires
        },
        getCookie(cname) {
            var name = cname + '='
            var ca = document.cookie.split(';')
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i]
                while (c.charAt(0) === ' ') c = c.substring(1)
                if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
            }
            return ''
        }
    },
    mounted() {
        this.username = this.getCookie('userName')
    }
}
</script>
<style lang="scss" scoped>
@import "../assets/css/variable.scss";

.nav-container {
  header {
    ul {
      padding: 0 20px;
      text-align: right;
      li {
        display: inline-block;
      }
      .title {
        font-weight: bold;
        font-size: 18px;
        cursor: pointer;
        color: $main-color;
      }
      .user-name {
        font-weight: 500;
      }
      .log-out {
        margin-left: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
