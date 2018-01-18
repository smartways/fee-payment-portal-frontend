<template>
    <div class="app flex-row align-items-center">
        <div class="container">
            <b-row class="justify-content-center">
                <b-col md="8">
                    <b-card-group>
                        <b-card no-body class="p-4">
                            <b-card-body>
                                <h1>Login</h1>
                                <p class="text-muted">Sign In to your account</p>
                                <form @submit.prevent="loginUser">
                                    <div class="input-group mb-3">
                                        <span class="input-group-addon"><i class="icon-user"></i></span>
                                        <input type="email" name="username" class="form-control" placeholder="Username"
                                               v-validate="'required|email'" v-model="user.username">

                                    </div>
                                    <div class="help-block alert alert-danger" v-show="errors.has('username')">
                                        {{ errors.first('username') }}
                                    </div>
                                    <div class="input-group mb-4">
                                        <span class="input-group-addon"><i class="icon-lock"></i></span>
                                        <input type="password" name="password" class="form-control"
                                               placeholder="Password"
                                               v-validate="'required|min:4|max:10'" v-model="user.password">

                                    </div>
                                    <div class="help-block alert alert-danger" v-show="errors.has('password')">
                                        {{ errors.first('password') }}
                                    </div>
                                    <b-row>
                                        <b-col cols="6">
                                            <input type="submit" class="btn btn-primary" value="Login">
                                        </b-col>

                                    </b-row>
                                    <b-col cols="10" class="text-right">
                                        <a href="#" class="pull-right">Forgot password?</a>
                                    </b-col>
                                </form>
                            </b-card-body>
                        </b-card>
                        <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
                            <b-card-body class="text-center">
                                <div>
                                    <h2>Fee Payment Portal</h2>
                                    <p>
                                        Welcome</p>
                                </div>
                            </b-card-body>
                        </b-card>
                    </b-card-group>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        user: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      loginUser () {
        this.$validator.validateAll().then((result) => {
          if (result === true) {
            let token = 'markochieng'
            let expiration = '123456789'
            this.$auth.setToken(token, expiration)
            this.$router.push('/dashboard')
          }
        })
      }
    }
  }
</script>
