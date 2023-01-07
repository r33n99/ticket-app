<template>
  <v-container
    v-if="user?.role === 'admin'"
    class="d-flex align-center justify-space-around text-center"
  >
    <v-col class="d-flex align-center flex-column">
      <span class="mb-4">стоимость парковки за час {{ hour }} сом</span>
      <v-btn @click="handleOpenPopup('hour')" color="red">изменить</v-btn>
    </v-col>
    <v-col class="d-flex align-center flex-column">
      <span class="mb-4">стоимость парковки за минуту {{ min }} сом</span>
      <v-btn @click="handleOpenPopup('min')" color="red">изменить</v-btn>
    </v-col>
    <Popup
      :open="openPopup"
      :close="handleClosePopup"
      :type="type"
      @price="handleGetPriceData"
    />
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'admin',
  data() {
    return {
      hour: null,
      min: null,
      openPopup: false,
      type: '',
    }
  },
  computed: {
    ...mapState(['priceHour', 'priceMin', 'user']),
  },
  methods: {
    ...mapActions(['updateHourPrice', 'updateMinPrice', 'getPrice']),
    upgradePrices() {
      this.hour = this.priceHour
      this.min = this.priceMin
    },
    handleOpenPopup(type) {
      this.type = type
      this.openPopup = true
    },
    handleClosePopup() {
      this.openPopup = false
    },
    handleGetPriceData(obj) {
      if (obj.type == 'hour') {
        this.hour = obj.price
        this.updateHourPrice(obj.price)
      } else if (obj.type == 'min') {
        this.min = obj.price
        this.updateMinPrice(obj.price)
      }
    },
  },
  mounted() {
    this.getPrice()
    this.upgradePrices()
  },
}
</script>
