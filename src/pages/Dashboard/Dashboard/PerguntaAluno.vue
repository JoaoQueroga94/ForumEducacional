<template>
  <div>
   
    <div class="row">

        <card class="card-nav-tabs" header-classes="card-header-warning">
          <p class="card-title">{{this.nome_sala}}</p>
          <h6 class="card-subtitle mb-2 text-muted">{{this.pergunta}}</h6>
        </card>

    </div>


    <div style="background-color: #ebecf1;">
      <time-line type="simple">
          

          
          <time-line-item inverted="" badge-type="info" badge-icon="now-ui-icons ui-2_chat-round" v-for="resposta in respostas" v-bind:key="resposta.id">
            <span slot="header" class="badge badge-info">{{resposta.usuario}}</span>
            <div slot="content">
              <p>
                {{resposta.resposta}}
              </p>
              <hr>
              <span slot="footer">
                {{resposta.curtidas}}
                <n-button type="primary" round="" icon="">
                  <i class="now-ui-icons ui-2_like"></i>
                </n-button>
              </span>
            </div>
          </time-line-item>
          

        </time-line>
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
import {TimeLine, TimeLineItem} from 'src/components'
import {Slider} from 'src/components'

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
    AsyncWorldMap,
    TimeLine,
    TimeLineItem,
    Slider,
  },
  data() {
    return {
      pergunta: this.$store.state.pergunta,
      nome_sala: this.$store.state.sala_nome,
      sliderValue: 0,
      respostas: [],

      respostas_edit: {id: 0, usuario: '', resposta: '', nota: 0, curtidas: 0}
    };
  },
  mounted () {
    this.CarregarRespostas();
  },
  methods: {
    CarregarRespostas(){

      while(this.respostas.length) {
          this.respostas.pop();
      }
      var self = this;
      var id = this.$store.state.id_pergunta;
      axios.get(url+'/Respostas_perguntas/'+id, {
      }).then(function (response) {
        
        for(var i = 0; i < response.data.length; i ++){

          self.respostas_edit.usuario = response.data[i].resposta_aluno_nome;
          self.respostas_edit.id = response.data[i].resposta_id;
          self.respostas_edit.resposta = response.data[i].resposta_resposta;
          self.respostas_edit.nota = response.data[i].resposta_nota;
          self.respostas_edit.curtidas = response.data[i].resposta_curtidas;

          self.respostas.push(self.respostas_edit);
          self.respostas_edit = {id: 0, usuario: '', resposta: '', nota: 0, curtidas: 0};

        }
      })
      .catch(function (error) {
        console.log(error);
      })
  },  


  }
};
</script>
<style>
</style>

