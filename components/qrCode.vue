<template>
  <qrcode-vue level="H" :value="value" :size="size"/>
</template>
<script>
import QrcodeVue from 'qrcode.vue'
export default {
  props: {
    value: Number | String,
    size: Number
  },
  components: {
    QrcodeVue,
  },
}
</script>
