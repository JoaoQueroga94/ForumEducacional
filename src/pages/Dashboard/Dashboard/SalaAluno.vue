<template>
  <div>
   
    <div class="row">
        <card class="card-nav-tabs" header-classes="card-header-warning">

          <h6 class="card-tittle">Responda as perguntas para poder visualizar as respostas</h6>
        
        </card>
        
    </div>
    <div class="row" v-for="pergunta in perguntas" v-bind:key="pergunta.id">
      
        <card class="card-nav-tabs" header-classes="card-header-warning">

          <p class="card-text">{{ pergunta.texto }}</p>
          <n-button v-if="pergunta.respondida == false" type="info" round="" @click.native="responder(pergunta.id)">Responder</n-button>
          <n-button v-if="pergunta.respondida == true" type="info" round="" @click.native="VerRespostas(pergunta.id)">Ver Respostas</n-button>
           <n-button v-if="pergunta.respondida == true" type="info" round="" icon="" @click.native="VerNota(pergunta.nota.toString())">
            <i class="now-ui-icons travel_info"></i>
          </n-button>
        </card>
    </div>

  </div>
</template>
<script>
import {
  StatsCard,
  Card,
  Table as NTable,
  Checkbox,
  AnimatedNumber,
  Progress as NProgress,
  AsyncWorldMap
} from 'src/components';

import LineChart from 'src/components/Charts/LineChart';
import { METHODS } from 'http';

import swal from 'sweetalert2';

const axios = require('axios');
import url from 'src/data.js';

export default {
  components: {
    Checkbox,
    Card,
    NTable,
    StatsCard,
    AnimatedNumber,
    LineChart,
    NProgress,
    AsyncWorldMap
  },
  data() {
    return {
      perguntas: [
        {id: 0, texto: 'Qual o seu nome?', respondida: false, nota: 0 },
        {id: 1, texto: 'A terra é plana?', respondida: false, nota: 7.3 }
      ],
      pergunta_edit: {id: 0, texto: '', respondida: false, nota: 0 }
    };
  },
  methods: {
  

  responder(x){
    
    swal.fire({
      input: 'textarea',
      inputPlaceholder: 'Escreva sua resposta aqui...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    }).then((result) => {
        if (result.value) {
          this.perguntas[x].respondida = true;
          swal.fire({
            type: 'success',
            title: 'Resposta enviada',
            showConfirmButton: true,
          })
        }
      })
  },


  VerRespostas(x){
    this.$router.push("/pergunta_aluno");
  },
  VerNota(x){
     swal.fire({
            text: 'Nota atribuída pelo professor',
            title: x,
            showConfirmButton: true,
          })

  },

  }
};
</script>
<style>
#txt{
  text-align: right;
}
</style>

