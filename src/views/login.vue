<template>
    <div class="login-container">
        <div class="title white">商品管理</div>
        <div class="main">
            <el-form :model="user"
                :rules="rules"
                ref="loginForm">
                <el-form-item prop="name">
                    <el-input v-model="user.name"
                        placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="pwd">
                    <el-input v-model="user.pwd"
                        type="password"
                        placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                        plain
                        style="width: 100%;"
                        @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { api } from '@/config'
// import Store from 'store2'

export default {
    name: 'login',
    data() {
        return {
            user: {
                name: '',
                pwd: ''
            },
            rules: {
                name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        }
    },
    methods: {
        login() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.http.post(`${api.goods}/user/login`, {
                        name: this.user.name,
                        pwd: this.user.pwd
                    }).then(res => {
                        if (res.data.result) {
                            this.setCookie('userName', this.user.name, 1)
                            this.$router.push('/list')
                            this.http.post(`${api.goods}/record/add`, {
                                type: `${this.user.name} 用户登录`
                            })
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    }).catch(error => {
                        this.$message.error('登录失败')
                        console.error(error)
                    })
                }
            })
        },
        setCookie(cname, cvalue, exdays) {
            let d = new Date()
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
            let expires = 'expires=' + d.toUTCString()
            document.cookie = cname + '=' + cvalue + '; ' + expires
        },
        getCookie(cname) {
            let name = cname + '='
            let ca = document.cookie.split(';')
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i]
                while (c.charAt(0) === ' ') c = c.substring(1)
                if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
            }
            return ''
        }

    },
    created() {
        if (this.getCookie('userName')) {
            this.$router.push('/list')
        }
    }
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .title {
    font-family: "Times New Roman", Times, serif;
    font-weight: bolder;
    letter-spacing: 4px;
    margin-bottom: 50px;
    font-size: 36px;
  }
  .main {
    width: 30%;
    margin: 0 auto;
    padding: 40px;
    // background-color: rgba(10, 10, 10, 0.77);
    // border: 2px ridge rgba(238, 238, 238, 0.13);
    border-radius: 5px;
    -moz-box-shadow: 0 -5px 10px 1px rgba(16, 16, 16, 0.57);
    -webkit-box-shadow: 0 -5px 10px 1px rgba(16, 16, 16, 0.57);
    box-shadow: 0 -5px 10px 1px rgba(16, 16, 16, 0.57);
    border-bottom: none;
  }
}
</style>
