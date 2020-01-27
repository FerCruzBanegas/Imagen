<template>
  <div class="container">
    <h1>COTIZACIÓN</h1>
    <container-info />
    <hr />
    <div class="row">
      <fieldset class="col-12 col-md-12 px-3">
        <legend>Datos Generales:</legend>
        <b-form @submit.stop.prevent="submit">
          <div class="row">
            <div class="col-sm-12 col-lg-6">
              <strong>
                <label for="price">Cliente:</label>
              </strong>
              <b-form-group
                :invalid-feedback="errors.first('customer_id')"
                :state="!errors.has('customer_id')"
                description="We'll never share your email with anyone else."
              >
                <div class="d-table-cell w-100">
                  <v-select
                    label="business_name"
                    :filterable="false"
                    :options="options"
                    v-model="quotation.customer_id"
                    @search="onSearch"
                    v-validate="'required'"
                    data-vv-name="customer_id"
                    data-vv-as="cliente"
                  >
                    <template slot="no-options">Buscar clientes..</template>
                    <template slot="option" slot-scope="option">
                      <div class="d-center">
                        <strong>{{ option.business_name }} / {{ option.contact }}</strong>
                      </div>
                    </template>
                    <template slot="selected-option" slot-scope="option">
                      <div class="selected d-center">
                        <!-- <img :src='option.owner.avatar_url'/>  -->
                        <strong>{{ option.business_name }} / {{ option.contact }}</strong>
                      </div>
                    </template>
                  </v-select>
                </div>
                <div class="d-table-cell align-middle ml-1">
                  <b-button id="popover-reactive-1" ref="button" pill size="sm">
                    <i class="fa fa-user-plus"></i>
                  </b-button>
                </div>
                <b-popover
                  target="popover-reactive-1"
                  triggers="click"
                  :show.sync="popoverShow"
                  placement="auto"
                  container="my-container"
                  ref="popover"
                  @show="onShow"
                  @shown="onShown"
                  @hidden="onHidden"
                >
                  <template v-slot:title>
                    <b-button @click="onClose" class="close" aria-label="Close">
                      <span class="d-inline-block" aria-hidden="true">&times;</span>
                    </b-button>Nuevo Cliente
                  </template>

                  <div>
                    <b-form-group
                      :state="input1state"
                      class="mb-1"
                      invalid-feedback="This field is required"
                    >
                      <b-form-input
                        v-model="input1"
                        :state="input1state"
                        size="sm"
                        placeholder="Señor (es)"
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group
                      :state="input1state"
                      class="mb-1"
                      invalid-feedback="This field is required"
                    >
                      <b-form-input
                        v-model="input1"
                        :state="input1state"
                        size="sm"
                        placeholder="NIT"
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      :state="input1state"
                      class="mb-1"
                      invalid-feedback="This field is required"
                    >
                      <b-form-input
                        v-model="input1"
                        :state="input1state"
                        size="sm"
                        placeholder="Persona / Contacto"
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      :state="input1state"
                      class="mb-1"
                      invalid-feedback="This field is required"
                    >
                      <b-form-input
                        v-model="input1"
                        :state="input1state"
                        size="sm"
                        placeholder="E-Mail"
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      :state="input1state"
                      class="mb-1"
                      invalid-feedback="This field is required"
                    >
                      <b-form-input
                        v-model="input1"
                        :state="input1state"
                        size="sm"
                        placeholder="Teléfono"
                      ></b-form-input>
                    </b-form-group>
                    <b-button @click="onOk" size="sm" variant="secondary" squared>
                      <i class="fa fa-minus-circle"></i>
                    </b-button>
                  </div>
                </b-popover>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-sm-12 col-lg-12">
              <table-customer :data="quotation.customer_id"></table-customer>
            </div>
          </div>
          <!-- <b-button squared type="submit">Generar Cotización</b-button> -->
        </b-form>
      </fieldset>
    </div>
    <hr />
    <div class="row">
      <fieldset class="col-12 col-md-12 px-3">
        <legend>Productos:</legend>
      </fieldset>
    </div>
  </div>
</template>

<script>
import QuotationService from '../../services/quotation.service'
import CustomerService from '../../services/customer.service'
import TableCustomer from '../../components/widgets/Tables/TableCustomer.vue'
import ContainerInfo from '../../components/widgets/Contents/ContainerInfo.vue'

export default {
  data() {
    return {
      quotation: {
        attends: '',
        customer_id: null
      },
      options: [],
      input1: '',
      input1state: null,
      input2: '',
      input2state: null,
      input1Return: '',
      input2Return: '',
      popoverShow: false,
    }
  },

  components: {
    'table-customer': TableCustomer,
    'container-info': ContainerInfo,
  },

  methods: {
    onSearch(search, loading) {
      loading(true)
      this.search(loading, search, this)
    },

    search: _.debounce(async (loading, search, vm) => {
      try {
        const customers = await CustomerService.searchCustomer(
          `search-customer?name=${search}`
        )
        if (customers.status === 200) {
          vm.options = customers.data
          loading(false)
        }
      } catch (err) {
        if (err.response.status === 404) {
          vm.options = []
          loading(false)
        }
      }
    }, 350),

    submit: async function() {
      try {
        const response = await QuotationService.storeQuotation(this.quotation)
      } catch (err) {
        if (err.response.status === 422)
          this.$setErrorsFromResponse(err.response.data)
      }
    },

    getQuotation: async function() {
      const response = await QuotationService.getQuotation()
      if (response.status === 200) {
        let blob = new Blob([response.data])
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'Test.pdf'
        link.click()
      }
    }
  }
};
</script>

<style scoped>
.br-content {
  background-color: #969695;
  font-size: 1.1em;
  font-weight: bold;
}

img {
  height: auto;
  max-width: 2.5rem;
  margin-right: 1rem;
}

.d-center {
  display: flex;
  align-items: center;
}

.selected img {
  width: auto;
  max-height: 23px;
  margin-right: 0.5rem;
}

.v-select .dropdown li {
  border-bottom: 1px solid rgba(112, 128, 144, 0.1);
}

.v-select .dropdown li:last-child {
  border-bottom: none;
}

.v-select .dropdown li a {
  padding: 10px 20px;
  width: 100%;
  font-size: 1.25em;
  color: #3c3c3c;
}

.v-select .dropdown-menu .active > a {
  color: #fff;
}

fieldset {
  background-color: #e9e6e6;
  border-radius: 4px;
}

legend {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #000;
  font-size: 17px;
  font-weight: bold;
  padding: 3px 5px 3px 7px;
  width: auto;
}
</style>