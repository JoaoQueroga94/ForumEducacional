<template>
  <div>
   
    <div class="row">

        <card class="card-nav-tabs" header-classes="card-header-warning">
          <h5>{{nome_sala}}</h5>
          <div>
            <fg-input placeholder="Inserir nova questão" v-model="textoQuestao"></fg-input>
          </div>

          <n-button type="info" round="" @click.native="adicionarQuestao">
            Adicionar
          </n-button>
        </card>

    </div>

    <div class="row" v-for="questao in questoes" v-bind:key="questao.id">

        <card class="card-nav-tabs" header-classes="card-header-warning">
          <span slot="header" class="badge badge-default"> {{questao.data}} </span>
          <p class="card-text"> {{ questao.texto }} </p>
          <n-button type="info" round="" @click.native="VerRespostas(questao.id, questao.texto)">Ver Respostas</n-button>

          <n-button type="info" round="" icon="">
            <i class="now-ui-icons ui-1_settings-gear-63"></i>
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
      nome_sala: this.$store.state.sala_nome,
      textoQuestao:'', //this.$store.state.id_sala
      questoes: [],
      questao_edit: {id: 0, texto: '', data: ''}
    };
  },
  mounted () {
    this.CarregarPerguntas();
  },
  methods: {
  CarregarPerguntas(){
    while(this.questoes.length) {
        this.questoes.pop();
    }
    var self = this;
    var id = this.$store.state.id_sala;
    axios.get(url+'/Perguntas_Sala/'+id, {
    }).then(function (response) {
      
      for(var i = 0; i < response.data.length; i ++){
        self.questao_edit.id = response.data[i].pergunta_id;
        self.questao_edit.texto = response.data[i].pergunta_pergunta;
        self.questao_edit.data = response.data[i].pergunta_data;
        
        self.questoes.push(self.questao_edit);
        self.questao_edit = {id: 0, texto: '', data: ''};
      }
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  },
  VerRespostas(id, pergunta){
    //this.$router.push("/pergunta");
    this.$store.dispatch('irParaPergunta', {
      pergunta_id:id,
      pergunta: pergunta,
    })
    this.$router.push('/pergunta');

  },
  CriarData(){
    var today = new Date();
    var dia = (today.getDate()).toString();
    var mes = (today.getMonth() + 1).toString();
    var ano = (today.getFullYear()).toString();
    var data = (dia+'/'+mes+'/'+ano);
    return data;
  },
  adicionarQuestao(){
    if(this.textoQuestao != ''){

      this.questao_edit.texto = this.textoQuestao;
      this.questao_edit.data = this.CriarData();

      var self = this;

      axios.post(url+'/AddPergunta', {
            pergunta: this.questao_edit.texto,
            data: this.questao_edit.data,
            id_sala: this.$store.state.id_sala,
          })
          .then(function (response) {
            swal.fire({
            type: 'success',
            title: 'Pergunta adicionada',
            showConfirmButton: false,
            timer: 3000,
            }),
            self.CarregarPerguntas();
            self.questao_edit = {id: 0, texto: '', data: ''};
            self.textoQuestao = '';
          })
          .catch(function (error) {
            console.log(error);
          });


    }else{
      swal.fire({
        type: 'error',
        title: 'Sem conteúdo',
        showConfirmButton: true,
        timer: 3000,
      })
    }
  }
  }
};
</script>
<style>
</style>

