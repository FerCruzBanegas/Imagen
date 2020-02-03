<template>
  <b-modal
    v-model="visible"
    title="Modal Variants"
    :header-bg-variant="'secondary'"
    size="lg"
    no-close-on-backdrop
  >
    <template v-slot:modal-header="{ close }">
      <h5>Nuevo Cliente</h5>
      <pre>{{formVal}}</pre>
      <b-button squared size="sm" variant="outline-primary" @click="onClose">X</b-button>
    </template>
    <slot :onForm="onForm" />
    <template v-slot:modal-footer>
      <div class="w-100">
        <small>Los campos con (*) son obligatorios.</small>
        <b-button squared variant="primary" size="sm" class="float-right" @click="submit">REGISTRAR</b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
export default {
  props: {
    visible: Boolean
  },

  data() {
    return {
      formVal: null
    };
  },
  methods: {
    onForm(val) {
      this.formVal = val
      console.log(val)
    },

    submit() {
      this.$bus.$emit('submitForm')
    },

    onClose() {
      this.$emit("hide");
    }
  }
};
</script>
