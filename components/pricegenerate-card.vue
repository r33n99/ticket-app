<template>
  <div v-if="!loading">
    <div v-if="uuid">
    <qrCode v-if="totalValue" :size="300" :value="totalValue" />

<h3 v-if="totalPrice">
  прошло времени :
  {{
  overTimeHours < 1 ? `${overTimeMinutes} мин.` : `${overTimeHours} ч.`
  }}

</h3>

    <p v-if="totalPrice">стоимость парковки : {{ totalPrice }} сом</p>
    <div v-if="overTimeSeconds < 60" class="d-flex flex-column">
      {{
      !overTimeMinutes
      ? 'нажмите кнопку чтобы рассчитать стоимость'
      : `Прошло всего ${overTimeSeconds} секунд, подождите...`
      }}
    </div>
    <v-btn id="custom-disabled" class="mt-4" color="light-blue accent-4" elevation="2"
      @click="getTotalPrice">рассчитать
      стоимость</v-btn>
  </div>
  <h2 v-else >
    для начала сгенерируйте qr-code
  </h2>
  </div>
  <div v-else>
    <preloader />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import moment from 'moment'

export default {
  name: "price-generate-card",
  data() {
    return {
      overTimeSeconds: 0,
      overTimeMinutes: 0,
      overTimeHours: 0,
    }
  },
  computed: {
    ...mapState(['uuid','totalPrice','startTime','totalValue','loading'])
  },
  methods: {
    ...mapActions(['getSession']),
    ...mapMutations(['setTotalPrice','setOverTime','setTotalValue']),
    handleSetValue() {
      this.setTotalValue(this.overTimeSeconds < 60 ? "Прошло слишком мало времени, подождите хотя-бы минуту" : `
      Начало парковки : ${this.startTime}.
      Прошло времени ${this.overTimeHours < 1
          ? `${this.overTimeMinutes} мин`
          : `${this.overTimeHours} ч.`
        }.
      Итоговая стоимость парковки составляет: ${this.totalPrice} сом`)
    },
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
        if (this.overTimeSeconds > 60) {
          this.setTotalPrice({
            hour: this.overTimeHours,
            min: this.overTimeMinutes,
          })
        }
      }
      this.setOverTime({seconds:this.overTimeSeconds,minutes:this.overTimeMinutes,hours:this.overTimeHours})
      this.handleSetValue()
    },
  }
}

</script>
