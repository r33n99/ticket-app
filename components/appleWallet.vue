<template>
    <apple-pay-button buttonstyle="white-outline" type="plain" locale="ru-RU"></apple-pay-button>
</template>

<script>
  export default {
    head: {
      script:[
        {src:'https://applepay.cdn-apple.com/jsapi/v1/apple-pay-sdk.js'}
      ]
    }
  }
</script>

<style scoped>
  apple-pay-button {
  --apple-pay-button-width: 150px;
  --apple-pay-button-height: 30px;
  --apple-pay-button-border-radius: 3px;
  --apple-pay-button-padding: 0px 0px;
  --apple-pay-button-box-sizing: border-box;
}
</style>
