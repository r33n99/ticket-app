<template>
  <div v-if="totalValue" class="py-2">
  <h3>Чек #{{Math.round((Math.random() * 10000))}}</h3>
<div class="mt-3 d-flex">
  <div class="mr-5 text-left text-uppercase">
    <p>id стоянки: {{uuid}}</p>
    <p>место: {{Math.round((Math.random() * 100))}}</p>
    <p>прошло времени: {{seconds > 60 ? (minutes > 60 ? `${hours} ч.` : `${minutes} мин.`) : `${seconds} сек.`}}</p>
    <p>к оплате: {{totalPrice}} сом</p>
  </div>
  <qrCode v-if="totalValue" :size="200" :value="totalValue" />
</div>
<div class="mt-2 d-flex justify-space-between align-center">
  <v-btn id="btn-pay" :disabled="!totalPrice" @click="handlePayTicket" color="green">оплатить</v-btn>
  <div  class="mr-3 d-flex flex-column justify-center">
    <button g:savetoandroidpay jwt="JWT" onsuccess="successHandler" onfailure="failureHandler">
      <v-img max-height="50"
max-width="200" :src="require('~/assets/googleWAllet.svg')"></v-img>
    </button>
    <!-- <g:savetoandroidpay jwt="JWT" onsuccess="successHandler" onfailure="failureHandler" /> -->

      <!-- <v-img g:savetoandroidpay jwt="JWT" onsuccess="successHandler" onfailure="failureHandler" max-height="50"
max-width="200" :src="require('~/assets/googleWAllet.svg')"></v-img> -->

    <button>
      <v-img max-height="50"
max-width="200" :src="require('~/assets/googleWallet.svg')"></v-img>
    </button>

    <!-- <g:savetoandroidpay jwt="JWT" onsuccess="successHandler" onfailure="failureHandler" /> -->
    <!-- <apple-pay-button buttonstyle="black" type="buy" locale="el-GR">
      <v-img max-height="50"
max-width="200" :src="require('~/assets/appleWAllet.svg')"></v-img>
    </apple-pay-button> -->

  </div>
</div>
</div>
<div v-else class="my-auto">
  <h2  style="color:#E53935" >ДЛЯ НАЧАЛА РАССЧИТАЙТЕ СТОИМОСТЬ</h2>
</div>

</template>

<script>
import { mapMutations, mapState } from 'vuex';

  export default {
    head: {
      script:[
        {
          src: 'https://applepay.cdn-apple.com/jsapi/v1/apple-pay-sdk.js'
        }
      ]
    },
    name:"pay-card",
    props:{
      toStart: Function
    },
    computed:{
      ...mapState(['uuid','totalPrice','totalValue','seconds','minutes','hours'])
  },
    methods:{
      ...mapMutations(['nuller','setTotalValue','setOverTime']),
      handlePayTicket() {  // здесь после удачной оплаты можно по uuid сессии удалять ее из бд и завершать её
      alert(`Сессия ${this.uuid} оплачена в ${new Date()}`)

      this.setOverTime({seconds:0,minutes:0,hours:0})
      this.setTotalValue("")
      this.nuller()
      this.toStart()
      localStorage.clear()
    },
    }
  }
</script>

<style>
  #btn-pay.v-btn--disabled {
    background-color: rgb(21, 107, 23) !important;
}
apple-pay-button {
  --apple-pay-button-width: 140px;
  --apple-pay-button-height: 30px;
  --apple-pay-button-border-radius: 5px;
  --apple-pay-button-padding: 5px 0px;
}
</style>
