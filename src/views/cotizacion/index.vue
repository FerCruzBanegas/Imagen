<template>
  <div>
    <b-card no-body header-bg-variant="light">
      <template v-slot:header>
        <router-link :to="{path: '/servicios/cotizaciones/nuevo'}">
          <button
            type="button"
            class="btn btn-primary btn-with-addon mr-auto text-nowrap pull-right"
          >
            <span class="btn-addon">
              <i class="btn-addon-icon fe fe-plus-circle" />
            </span>
            Nueva Cotización
          </button>
        </router-link>
      </template>
      <b-tabs v-model="tabIndex" card active-nav-item-class="font-weight-bold text-uppercase text-black">
        <b-tab title="General" :title-link-class="linkClass(0)">
          <grid-general></grid-general>
        </b-tab>
        <b-tab title="Pendientes" :title-link-class="linkClass(1)">
          <grid-general></grid-general>
        </b-tab>
        <b-tab title="Entregados" :title-link-class="linkClass(2)">
          <grid-general></grid-general>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
  import GridGeneral from '../../components/services/GridGeneral'

  export default {
    components: {
      'grid-general': GridGeneral
    },

    data() {
      return {
        tabIndex: 0
      }
    },

    methods: {
      linkClass(idx) {
        if (this.tabIndex === idx) {
          return ['text-black']
        } else {
          return ['text-info']
        }
      }
    }
  }
</script>