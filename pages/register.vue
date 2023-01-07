<template>
  <v-row justify="center" align="center" class="mx-0">
    <v-form v-if="!loading" v-model="valid">
      <v-container>
        <v-row class="flex flex-column align-center justify-center black--text">
          <v-col cols="12" md="12">
            <v-text-field color="black" class="custom-label-color" type="text" v-model="role" :counter="6" label="роль" required></v-text-field>
            <v-text-field color="black" class="custom-label-color" type="text" :rules="usernameRules" v-model="username"  :counter="30" label="логин" required>
            </v-text-field>
            <v-text-field color="black" class="custom-label-color" v-model="password" :rules="passwordRules" :counter="30" label="пароль" type="password"
              required></v-text-field>
          </v-col>
          <v-btn id="custom-disabled" @click="handleRegister" :disabled="!valid" depressed color="green darken-1">
            регистрация
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
    <alert v-if="!loading" @alert="setAlert" :alert="alert" :text="'Успешно создан!'" />
    <preloader v-if="loading" />
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'register',
  data() {
    return {
      valid: false,
      role: '',
      username: '',
      confirm: '',
      alert: false,
      passwordRules: [(v) => !!v || 'обязательное поле'],
      usernameRules: [(v) => !!v || 'обязательное поле'],
    }
  },
  computed: {
    ...mapState(['authError', 'loading']),
    passwordConfirmationRule() {
      return () => this.password === this.confirm || 'Password must match'
    },
  },
  methods: {
    ...mapActions(['register']),
    handleRegister() {
      this.register({
        role: this.role.toLowerCase(),
        email: this.email.toLowerCase(),
        password: this.password,
        password_confirmation: this.confirm,
      })
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
    background-color: #2E7D32 !important;
}
</style>
