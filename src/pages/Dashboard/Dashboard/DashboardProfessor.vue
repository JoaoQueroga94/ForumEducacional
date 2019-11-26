<template>
  <div>
   
    <div class="row">

        <card class="card-nav-tabs" header-classes="card-header-warning">
          <n-button type="info" round="" @click.native="CriarSala()">
              <i class="now-ui-icons ui-1_simple-add"></i> Nova sala
          </n-button>
        </card>

    </div>

    <div class="row" v-for="card in cards" v-bind:key="card.id">

      
        <card class="card-nav-tabs" header-classes="card-header-warning">  
          <h4 class="card-title">{{ card.titulo }}</h4>
          <p class="card-text">{{ card.desc }}</p>
          <n-button type="info" round="" @click.native="IrSala(card.id, card.titulo)" >Entrar</n-button>

          <n-button type="info" round="" icon="" @click.native="infoSala(card.cod)">
            <i class="now-ui-icons travel_info"></i>
          </n-button>
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
    AsyncWorldMap,
  },
  data() {
    return {
      ultimoid: 0,

      cards: [],
      salaEdit: {id: 0, titulo: '', desc: '', cod:''},
    };
  },
  mounted () {
    this.CarregaSalas();
  },
  methods: {

    gerarCodigo(){
      var L1 = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
      'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
      var N1 = ['1','2','3','4','5','6','7','8','9','0'];
      var L2 = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
      'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
      var L3 = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
      'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
      var N2 = ['1','2','3','4','5','6','7','8','9','0'];
      var L4 = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
      'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
      var N3 = ['1','2','3','4','5','6','7','8','9','0'];

      var d1 = L1[Math.ceil(Math.random() * (L1.length - 1))];
      var d2 = N1[Math.ceil(Math.random() * (N1.length - 1))];
      var d3 = L2[Math.ceil(Math.random() * (L2.length - 1))];
      var d4 = L3[Math.ceil(Math.random() * (L3.length - 1))];
      var d5 = N2[Math.ceil(Math.random() * (N2.length - 1))];
      var d6 = L4[Math.ceil(Math.random() * (L4.length - 1))];
      var d7 = N3[Math.ceil(Math.random() * (N3.length - 1))];

      var codigo = (d1+d2+d3+d4+d5+d6+d7);
      
      return codigo;
    },
    CarregaSalas(){
      while(this.cards.length) {
          this.cards.pop();
      }
      var self = this;
      var id = this.$store.state.id_usuario;
      axios.get(url+'/Salas_Professor/'+id, {
      }).then(function (response) {
        
        for(var i = 0; i < response.data.length; i ++){
          self.salaEdit.id = response.data[i].sala_id;
          self.salaEdit.titulo = response.data[i].sala_nome;
          self.salaEdit.desc = response.data[i].sala_descricao;
          self.salaEdit.cod = response.data[i].sala_chave;
          self.cards.push(self.salaEdit);
          self.salaEdit = {id: 0, titulo: '', desc: '', cod:''};
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    },
    CriarSala () {
      
      swal.mixin({
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
        confirmButtonText: 'Próximo',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        progressSteps: ['1', '2']
      }).queue([
        'Nome da Sala',
        'Descrição'
      ]).then((result) => {
        if (result.value) {

          var self = this;
          
          this.salaEdit.titulo = result.value[0];
          this.salaEdit.desc = result.value[1];
          this.salaEdit.cod = this.gerarCodigo();
          
          axios.post(url+'/AddSala', {
            nome: this.salaEdit.titulo,
            chave: this.salaEdit.cod,
            id_professor: this.$store.state.id_usuario,
            descricao: this.salaEdit.desc,
          })
          .then(function (response) {
            swal.fire({
            type: 'success',
            title: 'Sala criada com sucesso',
            showConfirmButton: false,
            timer: 1500,
            }),
            self.salaEdit = {id: 0, titulo: '', desc: '', cod:''};
            self.CarregaSalas();
          })
          .catch(function (error) {
            console.log(error);
          });

          
        }else{

          swal.fire({
            type: 'error',
            title: 'A sala não foi criada',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
  },
  IrSala(id,name){

    this.$store.dispatch('irParaSala', {
      user_sala_id: id,
      sala_nome: name,
    })
    this.$router.push('/sala');
  },
  infoSala(x){
     swal.fire({
            text: 'Código da sala',
            title: x,
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
