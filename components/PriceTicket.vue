<template>
  <div class="d-flex flex-column text-uppercase">
    <h4>За час <span class="font-weight-black deep-orange--text">{{ priceHour }}</span> сом</h4>
    <h4>За минуту <span class="font-weight-black deep-orange--text">{{ priceMin }}</span>  сом</h4>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'price',
  computed: { ...mapState(['priceHour', 'priceMin']) },
}
</script>
