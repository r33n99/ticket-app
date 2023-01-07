<template>
  <div v-if="!loading">
    <qrCode class="mb-5" v-if="uuid" :size="300" :value="uuid" />
    <v-btn v-if="!uuid" class="mt-7" color="green darken-1" elevation="2" @click="generateQR">сгенерировать
      qr-code</v-btn>
    <span class="font-italic green--text" v-if="uuid">Ваш qr-code сгенерирован!</span>
  </div>
  <div v-else>
    <preloader />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: "qr-code-generate",
  data() {
    return {

    }
  },
  computed: {
    ...mapState(['uuid','loading'])
  },
  methods: {
    ...mapActions(['createSession', 'updateUser']),
    async generateQR() {
      await this.createSession()
      await this.updateUser()
    },
  }
}

</script>
