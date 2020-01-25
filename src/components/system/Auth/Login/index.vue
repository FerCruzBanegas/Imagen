<template>
  <div :class="$style.auth">
    <div class="pt-5 pb-5 d-flex align-items-end mt-auto">
      <img src="resources/images/logo.png" alt="imagen" width="200px" />
    </div>
    <div class="pl-5 pr-5 pt-5 pb-5 bg-white" :class="$style.container">
      <div class="text-dark font-size-30 mb-2 text-center">Inicio de Sesión</div>
      <div class="text-muted text-center mb-4">Introduzca sus datos para ingresar al sistema.</div>
        <a-alert v-if="alert" class="mb-2" :message="message" type="warning" showIcon />
        <b-form @submit.stop.prevent="loginSubmit">
          <!-- <b-form-group id="input-group-1">
            <b-form-input
              id="example-input-1"
              name="example-input-1"
              v-model="form.username"
              type="email"
              placeholder="Correo/Usuario"
              v-validate="{ required: true, min: 3 }"
              :state="errors.length == 0"
              aria-describedby="input-1-live-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="input-1-live-feedback">
              {{ errors.first('username') }}
            </b-form-invalid-feedback>
          </b-form-group> -->
          <b-form-group 
            :invalid-feedback="errors.first('username')"
            :state="!errors.has('username')">
            <b-form-input 
              :state="errors.has('username') ? false : null"
              v-model="form.username"
              placeholder="Correo / Usuario"
              v-validate="'required'"
              data-vv-name="username"
              data-vv-as="usuario"
              type="text">
            </b-form-input>
          </b-form-group>

          <b-form-group 
            :invalid-feedback="errors.first('password')"
            :state="!errors.has('password')">
            <b-input-group class="mb-2">
              <b-form-input 
                :state="errors.has('password') ? false : null"
                v-model="form.password"
                placeholder="Contraseña" 
                v-validate="'required'"
                data-vv-name="password"
                data-vv-as="contraseña"
                :type="passwordFieldType">
              </b-form-input>
              <b-input-group-append is-text>
                <b-form-checkbox switch class="mr-n2" v-model="showPassword"></b-form-checkbox>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>

          <b-button 
            type="submit" 
            :disabled="loading"
            squared 
            block 
            variant="danger"
            class="text-center text-white w-100 font-weight-bold font-size-18"
          >
            <span v-if="!loading">INGRESAR</span>
            <b-spinner v-else variant="light" type="grow" label="Spinning"></b-spinner>
          </b-button>
        </b-form>
        <br>
        <p class="text-center">
          <router-link
            to="/system/forgot-password"
            class="text-red font-weight-bold font-size-18">Olvidó su contraseña?
          </router-link>
        </p>
    </div>
    <div class="text-center font-size-18 pt-4 mb-auto">
      <div>© 2020</div>
    </div>
  </div>
</template>
<script>
  import UserServices from '../../../../services/user.service'

  export default {
    name: 'AirLogin',
    data: function () {
      return {
        alert: false,
        message: '',
        loading: false,
        showPassword: false,
        passwordFieldType: 'password',
        form: {
          username: null,
          password: null
        }
      }
    },

    watch: {
      showPassword(val) {
        this.passwordFieldType = val === false ? 'password' : 'text'
      }
    },

    methods: {
      test:async function() {
        const response = await UserServices.getUsers('download')
        if (response.status === 200) {
          let blob = new Blob([response.data]);
          let link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = "Test.pdf";
          link.click();
        }
      },
      
      validateState(ref) {
        if (
          this.veeFields[ref] &&
          (this.veeFields[ref].dirty || this.veeFields[ref].validated)
        ) {
          return !this.veeErrors.has(ref)
        }
        return null
      },

      async loginSubmit () {
        this.$validator.errors.clear();
        this.alert = false
        this.loading = true
        try {
          const auth = await this.$store.dispatch('login', this.form)
          if (auth) {
            this.loading = false
            this.$router.push({ path: '/inicio' })
          }
        } catch (err) {
          if(err.response.status === 422) this.$setErrorsFromResponse(err.response.data);
          this.loading = false
          this.alert = true
          this.message = err.response.data.message
        }
      }
    },
  }
</script>
<style lang="scss" module>
@import "@/components/system/Auth/style.module.scss";
</style>
