<template>
  <div>
   
    <div class="row">

        <card class="card-nav-tabs" header-classes="card-header-warning">
          <n-button type="info" round="" @click.native="EntrarSala()">
              <i class="now-ui-icons ui-1_simple-add"></i> Entrar em uma nova sala
          </n-button>
        </card>

    </div>

    <div class="row" v-for="card in cards" v-bind:key="card.id">

      
        <card class="card-nav-tabs" header-classes="card-header-warning">  
          <h4 class="card-title">{{ card.titulo }}</h4>
          <p class="card-text">{{ card.desc }}</p>
          <n-button type="info" round="" @click.native="IrSala(card.id)" >Entrar</n-button>

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
import { type } from 'os';

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
      
      cards: [],
      salaEdit: {id: 0, titulo: '', desc: '', cod:''},
      salaAchada: {id: 0, titulo: '', desc: '', cod:''},
      
    };
  },

  mounted () {
    
    this.CarregaSalas();
   
  },

  methods: {

    IrSala(x){

      console.log(x);
      
      //this.$router.push("/sala_aluno");
    },

    EntrarSala () {

      swal.fire({
        title: 'Insira o código da sala',
        input: 'text',

        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value) {
              resolve()
            } else {
              resolve('Favor inserir um texto')
            }
          })
        },
        confirmButtonText: 'Buscar',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
   
      }).then((result) => {

        if (result.value) { // se inseriu um codigo
          var id_sala;
          var id_aluno = this.$store.state.id_usuario;

          axios.get(url+'/Busca_sala/'+"'"+result.value+"'", {  // busca a sala no banco 
          }).then(function (response) {

            
            if(response.data.length != 0){  // sala encontrada
              id_sala = response.data[0].sala_id;
              swal.fire({
                type: 'success',
                title: 'Sala encontrada!',
                text: response.data[0].sala_nome,
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: 'Participar',
                cancelButtonText: 'Cancelar',
              }).then((result) => {
                if (result.value) {

      
                  var self = this;
                  axios.post(url+'/EntrarSala', {
                    id_aluno: id_aluno,
                    id_sala: id_sala,
                  })
                  .then(function (response) {
                    window.location.reload();
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              
                  }
                })

            }else{  // sala nao encontrada
              swal.fire({
                type: 'error',
                title: 'Sala não encontrada!',
                showConfirmButton: true,
                confirmButtonText: "Ok"
              })

            }
            
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          });

          
        }else{

          swal.fire({
            type: 'error',
            title: 'Erro ao entrar na sala',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
  },
  
  CarregaSalas(){
      while(this.cards.length) {
          this.cards.pop();
      }
      var self = this;
      var id = this.$store.state.id_usuario;
      axios.get(url+'/Salas_Aluno/'+id, {  //  busca o id das salas que o aluno frequenta
      }).then(function (response) {
        
        for(var i = 0; i < response.data.length; i ++){  // percorre as salas
          axios.get(url+'/Salas/'+response.data[i].frequencia_sala_id, {  // buscas as salas pelo id
          }).then(function (response) {
           // console.log(response.data);
            
            self.salaEdit.id = response.data[0].sala_id;
            self.salaEdit.titulo = response.data[0].sala_nome;
            self.salaEdit.desc = response.data[0].sala_descricao;
            self.salaEdit.cod = response.data[0].sala_chave;
            self.cards.push(self.salaEdit);
            self.salaEdit = {id: 0, titulo: '', desc: '', cod:''};
            
          }).catch(function (error) {
            console.log(error);
          })
        }
       
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  },
  
  infoSala(){
     swal.fire({
            text: 'Código da sala',
            title: 'ATxM3y',
            showConfirmButton: true,
          })

  },
  editarSala(){

  },
  excluirSala(){
    swal.fire({
      title: 'Excluir a sala?',
      text: "Você não poderá reverter isso!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
         swal.fire({
            type: 'success',
            title: 'Sala excluida',
            showConfirmButton: false,
            timer: 1500
          })
      }
    })
  }


  }
};
</script>
<style>
</style>
