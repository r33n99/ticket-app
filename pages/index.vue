<template>
  <v-row justify="center" align="center" class="px-8 mx-0" >
    <v-container class="mt-3 justify-center align-center text-center d-flex flex-column">
      <div  style="color:#757575;font-style:italic" class="mb-5">Это приложение по созданию парковочных билетов<v-spacer/>чтобы начать нажмите на иконку <v-icon class="deep-orange accent-2">mdi-qrcode</v-icon> затем кнопку
        <span class="text-decoration-underline deep-orange--text text-accent-2 ">сгенерировать qr-code</span>
      </div>
    <v-img
    max-height="400"
    max-width="350"
    :src="require('~/assets/Valet-parking-illustration.jpg')"></v-img>
    </v-container>
  </v-row>
</template>

<script>
export default {
  name: 'home',
}
</script>
