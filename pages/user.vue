<!-- <template>
  <v-row justify="center" align="center" class="d-flex flex-column text-center">
    <div v-if="overTimeSeconds > 60" class="text-center">
      <h3 v-if="totalValue">
        прошло времени :
        {{
          overTimeHours < 1 ? `${overTimeMinutes} мин.` : `${overTimeHours} ч.`
        }}
      </h3>

      <p v-if="totalValue">стоимость парковки : {{ totalPrice }} сом</p>
      <qrCode v-if="totalValue" :value="totalValue" />
    </div>
    <div v-if="overTimeSeconds < 60" class="d-flex flex-column">
      {{
        !overTimeMinutes
          ? 'нажмите кнопку рассчитать стоимость'
          : `Прошло всего ${overTimeSeconds} секунд, подождите.`
      }}
    </div>

    <v-btn
      id="custom-disabled"
      class="mt-7"
      color="secondary"
      elevation="2"
      @click="getTotalPrice"
      >рассчитать стоимость</v-btn
    >
    <div class="d-flex align-center justify-center">
      <button class="mr-2">
      <img src="../assets/ru_add_to_google_wallet_wallet-button.svg" alt="">
    </button>
    <button>
      <img src="../assets/RU_Add_to_Apple_Wallet_RGB_102121.svg" alt="">
    </button>
    </div>
  </v-row>
</template>

<script>
import moment from 'moment'
import { mapState, mapMutations, mapActions } from 'vuex'


export default {
  name: 'user',
  data() {
    return {
      overTimeHours: 0,
      overTimeMinutes: 0,
      overTimeSeconds: 0,
      totalValue: '',
    }
  },
  computed: {
    ...mapState(['startTime', 'totalPrice', 'priceHour', 'priceMin', 'user']),
  },
  methods: {
    ...mapMutations(['setTotalPrice', 'nuller']),
    ...mapActions(['getSession','getPrice']),
    async getTotalPrice() {
        await this.getSession()
        await this.handleGetDif()
    },
    handleGetDif() {
      let trackStartTime = this.startTime
      if (trackStartTime) {
        let trackEndTime = moment().format('YYYY-MM-DD HH:mm:ss.SS Z')

        let overDiffHours = moment
          .duration(
            moment(trackEndTime, 'YYYY-MM-DD HH:mm:ss.SS Z').diff(
              moment(trackStartTime, 'YYYY-MM-DD HH:mm:ss.SS Z')
            )
          )
          .asHours()
        let overDiffMinutes = moment
          .duration(
            moment(trackEndTime, 'YYYY-MM-DD HH:mm:ss.SS Z').diff(
              moment(trackStartTime, 'YYYY-MM-DD HH:mm:ss.SS Z')
            )
          )
          .asMinutes()
        let overDiffSeconds = moment
          .duration(
            moment(trackEndTime, 'YYYY-MM-DD HH:mm:ss.SS Z').diff(
              moment(trackStartTime, 'YYYY-MM-DD HH:mm:ss.SS Z')
            )
          )
          .asSeconds()
        this.overTimeHours = overDiffHours.toFixed(2)
        this.overTimeMinutes = overDiffMinutes.toFixed()
        this.overTimeSeconds = overDiffSeconds.toFixed()
        this.setTotalPrice({
          hour: this.overTimeHours,
          min: this.overTimeMinutes,
        })
      }
      this.getterValue()
    },
    getterValue() {
      this.totalValue = `
      Начало парковки : ${this.startTime}.
      Прошло времени ${
        this.overTimeHours < 1
          ? `${this.overTimeMinutes} мин`
          : `${this.overTimeHours} ч.`
      }.
      Итоговая стоимость парковки составляет: ${this.totalPrice} сом`
    },
  },
}
</script>
<style scoped>
#custom-disabled.v-btn--disabled.theme--light {
  background-color: red !important;
}
#custom-disabled.v-btn--disabled.theme--dark {
  background-color: rgb(203, 106, 31) !important;
}
</style> -->
