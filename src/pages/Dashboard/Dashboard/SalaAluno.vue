<template>
  <div>
   
    <div class="row">
        <card class="card-nav-tabs" header-classes="card-header-warning">
          <h5>{{nome_sala}}</h5>
          <h6 class="card-tittle">Responda as perguntas para poder visualizar as respostas</h6>
        
        </card>
        
    </div>
    <div class="row" v-for="questao in questoes" v-bind:key="questao.id">
      
        <card class="card-nav-tabs" header-classes="card-header-warning">
          <span slot="header" class="badge badge-default"> {{questao.data}} </span>
          <p class="card-text">{{ questao.pergunta }}</p>
          <n-button v-if="questao.respondida == false" type="info" round="" @click.native="responder(questao.id)">Responder</n-button>
          <n-button v-if="questao.respondida == true" type="info" round="" @click.native="VerRespostas(questao.id, questao.pergunta)">Ver Respostas</n-button>
           <n-button v-if="questao.respondida == true" type="info" round="" icon="" @click.native="VerNota(questao.nota.toString())">
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
      nome_sala: this.$store.state.sala_nome,
      id_usuario: this.$store.state.id_usuario,
      nome_usuario: this.$store.state.nome,
      questoes: [],
      questao_edit: {id: 0, pergunta: '',resposta: '', data: '', respondida: false, nota: 0},
    };
  },
  mounted () {
    this.CarregarPerguntas();
  },
  methods: {

    CarregaRespostas(perguntas){

      var self = this;
      
      axios.post(url+'/Busca_resposta', {
        id_aluno: self.id_usuario,
        id_pergunta: perguntas.pergunta_id,
      })
      .then(function (response) {

        if(response.data.length != 0){ // se tiver resposta
          self.questao_edit.nota = response.data[0].resposta_nota;
          if(response.data[0].resposta_respondida == 1){
            self.questao_edit.respondida = true;
          }
        }

        self.questao_edit.id = perguntas.pergunta_id;
        self.questao_edit.pergunta = perguntas.pergunta_pergunta;
        self.questao_edit.data = perguntas.pergunta_data;
        

        self.questoes.push(self.questao_edit);
        self.questao_edit = {id: 0, pergunta: '',resposta: '', data: '', respondida: false, nota: 0};

      })
      .catch(function (error) {
        console.log(error);
      });

    },

    CarregarPerguntas(){

      while(this.questoes.length) {
          this.questoes.pop();
      }
      var self = this;
      var id = this.$store.state.id_sala;
      axios.get(url+'/Perguntas_Sala/'+id, {
      }).then(function (response) {
        
        for(var i = 0; i < response.data.length; i ++){

          self.CarregaRespostas(response.data[i]);

        }
      })
      .catch(function (error) {
        console.log(error);
      })
    },  
  

  responder(id_pergunta){
    
    swal.fire({
      input: 'textarea',
      inputPlaceholder: 'Escreva sua resposta aqui...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    }).then((result) => {
        if (result.value) {

          var self = this;
      
          axios.post(url+'/Responder', {
            id_pergunta: id_pergunta,
            id_aluno: self.id_usuario,
            nome_aluno: self.nome_usuario,
            resposta: result.value,
          })
          .then(function (response) {
            self.CarregarPerguntas();
            swal.fire({
              type: 'success',
              title: 'Resposta enviada',
              showConfirmButton: true,
            })

          })
          .catch(function (error) {
            console.log(error);
          });

        }
      })
  },


  VerRespostas(id, pergunta){
    this.$store.dispatch('irParaPergunta', {
      pergunta_id:id,
      pergunta: pergunta,
    })
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

