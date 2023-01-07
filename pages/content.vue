<template>
  <v-row class="d-flex justify-center text-center flex-column mx-0">
    <v-stepper class="white elevation-0" v-model="e1">
      <div class="grey lighten-2 white--text py-3">
        <v-container>
          <PriceTicket />
          <v-stepper-header class="elevation-0">
            <v-stepper-step color="green" :complete="e1 > 1" step="1">
              <span class="green--text">
                создать qr-code
              </span>
            </v-stepper-step>

            <v-divider class="green"></v-divider>

            <v-stepper-step color="green" :complete="e1 > 2" step="2">
              <span class="green--text">
                рассчитать стоимость
              </span>
            </v-stepper-step>

            <v-divider class="green"></v-divider>

            <v-stepper-step color="green" step="3">
              <span class="green--text">
                оплата
              </span>
            </v-stepper-step>
          </v-stepper-header>
        </v-container>
      </div>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="d-flex align-center justify-center flex-column black--text elevation-0" color="white"
            height="510">
            <qrgenerate-card />
          </v-card>
          <v-btn color="green" @click="e1 = 2">
            <span>дальше</span>
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="d-flex align-center justify-center flex-column black--text elevation-0" color="white"
            height="510">
          <pricegenerate-card  />

          </v-card>


          <div style="max-width:900px;margin:auto" class="d-flex align-center justify-space-around ">
            <v-btn color="red" @click="e1 = 1">
            <span>назад</span>
          </v-btn>
          <v-btn class="ml-12" color="green" @click="e1 = 3">
            <span>дальше</span>
          </v-btn>
          </div>


        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="d-flex align-center flex-column black--text elevation-0" color="white" height="510">
            <pay-card :toStart="toStart" />
          </v-card>

          <v-btn color="red" @click="e1 = 2">
            <span>назад</span>
          </v-btn>

        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-row>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'main-content',
  data() {
    return {
      e1: 1,
    }
  },
  computed: {
    ...mapState(['uuid','startTime','totalPrice', 'priceHour', 'priceMin', 'user']),
  },
  methods: {
    ...mapActions(['getPrice', 'getSession']),
    ...mapMutations(['setTotalPrice', 'nuller']),
    toStart(){
      this.e1 = 1
    }
  },
  mounted() {
    this.getPrice()
  }
}
</script>
