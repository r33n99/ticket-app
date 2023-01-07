<template>
  <v-app dark>
    <v-app-bar class="deep-orange accent-3" elevation="3"
 :clipped-left="clipped" absolute app>
      <div class="d-flex align-center" @click="$router.push('/')" style="cursor: pointer">
        <v-img
        :lazy-src="require('~/assets/ticket.png')"
        max-height="50"
        max-width="50"
        :src="require('~/assets/ticket.png')" ></v-img>
        <v-toolbar-title class="ml-2">{{title}}</v-toolbar-title>
      </div>
      <v-spacer />

      <v-btn @click="$router.push('/admin')" v-if="user?.role === 'admin' " icon>
        <v-icon>mdi-human-male</v-icon>
      </v-btn>

      <v-btn @click="$router.push('/register')" v-if="user?.role === 'admin' " icon>
        <v-icon>mdi-account-multiple-plus</v-icon>
      </v-btn>

      <v-btn @click="$router.push('/content')" icon>
        <v-icon>mdi-qrcode</v-icon>
      </v-btn>

      <v-btn @click="$router.push('/login')" v-if="!isAuth" icon>
        <v-icon>mdi-login</v-icon>
      </v-btn>

      <v-btn @click="log_out" v-if="isAuth" icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>

    </v-app-bar>
    <v-main class="d-flex align-center black--text white">
        <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      route: {
        admin: '/admin',
        login: '/login',
        content: '/content',
        user: '/user',
        home: '/',
      },
      items: [
        {
          icon: 'mdi-apps',
          title: 'content',
          to: '/content',
        },
        {
          icon: 'mdi-post',
          title: 'admin-panel',
          to: '/admin',
        },
      ],
      miniVariant: false,
      title: 'autoticket.kg',
    }
  },
  computed: { ...mapState(['isAuth', 'user']) },
  methods: {
    ...mapMutations(['logout', 'nuller', 'userToLocalStorage',
      'sessionToLocalStorage',
      'startTimetoLocalStorage'
    ]),
    ...mapActions(['getPrice']),
    log_out() {
      this.logout()
      this.nuller()
      this.$router.push('/login')
    },
  },
  mounted() {
    this.getPrice()
    this.userToLocalStorage(localStorage.getItem('user') || null)
    this.sessionToLocalStorage(localStorage.getItem('uuid') || 0)
  },
}
</script>
<style>
  .v-stepper__items .v-stepper__content{
    padding-top: 0;
    padding-bottom: 30;
  }
</style>
