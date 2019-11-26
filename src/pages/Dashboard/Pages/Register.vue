<template>
    <div class="row">
      
      <div class="col-md-6 offset-md-3">
        <form @submit.prevent="register">
        <card class="card-signup text-center" no-footer-line>

          <template slot="header">
            <h4 class="card-title">Criar conta</h4>
          </template>

          <form @submit.prevent>

            <fg-input v-model="model.firstName"
                      v-validate="'required'"
                      name="name"
                      :error="getError('first name')"
                      placeholder="Nome"
                      addon-left-icon="now-ui-icons users_circle-08">
            </fg-input>

            <fg-input v-model="model.email"
                      v-validate="'required|email'"
                      name="email"
                      :error="getError('email')"
                      placeholder="Email"
                      addon-left-icon="now-ui-icons ui-1_email-85">
            </fg-input>

             <fg-input v-model="model.password"
                    v-validate="'required|min:5'"
                    type="password"
                    name="password"
                    :error="getError('password')"
                    placeholder="Senha"
                    addon-left-icon="now-ui-icons ui-1_lock-circle-open">
             </fg-input>
          </form>
          <div>
            <n-radio id="rad" v-model="model.tipoConta" label="1">Aluno</n-radio>
            <n-radio id="rad" v-model="model.tipoConta" label="2">Professor</n-radio>
          </div>
          
          <n-button slot="footer"
                    type="primary"
                    native-type="submit"
                    round
          >
            Criar Conta
          </n-button>
        </card>
        </form>
      </div>
    </div>
</template>
<script>
import { Checkbox } from 'src/components';
import {Radio} from 'src/components';
import swal from 'sweetalert2';

import url from 'src/data.js';
import { log } from 'util';

const axios = require('axios');

export default {
  components: {
    Checkbox,
    [Radio.name]: Radio,
  },
  data() {
    return {
      model: {
        email: '',
        firstName: '',
        password: '',
        tipoConta: '1',
      },
    }
  },
  methods: {
    ConfirmaConta(x){
      swal.fire({
        type: 'success',
        title: x,
        showConfirmButton: true,
      }).then((result) => {
        this.$router.push('/login');
      })
    },
    getError(fieldName) {
      return this.errors.first(fieldName);
    },
    async register() {

      let isValidForm = await this.$validator.validateAll();

      if (isValidForm) {
        // TIP use this.model to send it to api and perform register call
        var self = this;
        if(this.model.tipoConta == '2'){  //Professor
          
          axios.post(url+'/AddProfessor', {
            name: this.model.firstName,
            email: this.model.email,
            password: this.model.password,
          })
          .then(function (response) {
            self.ConfirmaConta('Conta de professor criada com sucesso!');
          })
          .catch(function (error) {
            console.log(error);
          });

        }else if (this.model.tipoConta == '1'){ // Aluno
          axios.post(url+'/AddAluno', {
            name: this.model.firstName,
            email: this.model.email,
            password: this.model.password,
          })
          .then(function (response) {
            self.ConfirmaConta('Conta de aluno criada com sucesso!');
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      
      }
    },
    
  }
};
</script>
<style>
#rad{
  display: inline;
}
</style>
