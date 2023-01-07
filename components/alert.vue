<template>
  <div class="text-center">
    <v-snackbar
      v-model="alert"
      absolute
      centered
      top
      tile
      :color="authError ? 'red' : 'green'"
    >
      {{ authError ? 'Неверный email или пароль' : text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="closeAlert">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['authError']),
  },
  props: {
    alert: Boolean,
    text: String,
  },
  methods: {
    ...mapMutations(['setError']),
    closeAlert() {
      this.$emit('alert', false)
      this.setError('')
    },
  },
}
</script>
