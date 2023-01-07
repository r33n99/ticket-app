<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="open" max-width="500px" persistent>
        <v-card>
          <v-card-title> изменить цену </v-card-title>
          <v-card-text>
            <v-text-field :rules="[numberRule]" v-model="value" />
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="close"> Close </v-btn>
            <v-spacer />
            <v-btn color="primary" v-if="value.length" text @click="hanldePushDataPrice">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      notifications: false,
      sound: true,
      widgets: false,
      value: '',
      numberRule: v => {
        if (!v.trim()) return true;
        if (!isNaN(parseFloat(v)) && v >= 0 && v <= 9999999) return true;
        return 'Number has to be between 0 and 9999999';
      },
    }
  },
  props: {
    open: Boolean,
    close: Function,
    type: String,
  },
  methods: {
    hanldePushDataPrice() {
      this.$emit('price', { price: this.value, type: this.type })
      this.value = ''
      this.close()
    },
  },
}
</script>
