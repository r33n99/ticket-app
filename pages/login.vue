<template>
  <v-row justify="center" align="center" class="mx-0">
    <v-form v-if="!loading" v-model="valid">
      <v-container>
        <v-row class="d-flex flex-column align-center justify-center black--text">
          <v-col cols="12" md="12">
            <v-text-field
              class="custom-label-color"
              v-model="username"
              :counter="30"
              :rules="usernameRules"
              label="логин"
              required
              color="black"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="12">
            <v-text-field
              class="custom-label-color"
              v-model="password"
              :rules="passwordRules"
              :counter="30"
              label="пароль"
              type="password"
              required
              color="black"
            ></v-text-field>
          </v-col>
          <v-btn class="mt-5" id="custom-disabled" @click="onLogin" :disabled="!valid" depressed color="deep-orange lighten-1">
            войти
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
    <preloader v-if="loading" />
    <alert
      v-if="!loading"
      :text="'Добро пожаловать!'"
      @alert="setAlert"
      :alert="alert"
    />
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'login',
  data() {
    return {
      valid: false,
      username: '',
      password: '',
      alert: false,
      passwordRules: [(v) => !!v || 'обязательное поле'],
      usernameRules:[(v) => !!v || 'обязательное поле']
    }
  },
  computed: {
    ...mapState(['loading','uuid']),
  },
  methods: {
    ...mapActions(['login', 'getSession']),
    onLogin() {
      this.login({
        username: this.username.toLowerCase(),
        password: this.password,
      })
      if(this.uuid){
        this.getSession()
      }
      if (!this.authError) {
        this.alert = true
      }
    },
    setAlert(data) {
      this.alert = data
    },
  },
}
</script>
<style>
.custom-label-color .v-label {
  color: black;
  opacity: 1;
}

.custom-label-color .v-counter {
  color: black;
  opacity: 1;
}

.custom-label-color input{
  color: black!important;
  border-bottom: 1px solid black!important;
}

#custom-disabled.v-btn--disabled.theme--dark {
    background-color: #FF5722  !important;
}
</style>
