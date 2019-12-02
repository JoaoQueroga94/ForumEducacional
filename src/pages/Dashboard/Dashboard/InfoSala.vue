<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card card-stats card-raised">
          <div class="card-body">
            <div class="row">
              
              
              <div class="col-sm-4">
                <div class="statistics">
                  <div class="info">
                    <div class="icon icon-info">
                      <i class="now-ui-icons users_single-02"></i>
                    </div>
                    <h3 class="info-title">
                      <animated-number :value="this.qtdAlunos"></animated-number>
                    </h3>
                    <h6 class="stats-title">Alunos na Sala</h6>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="statistics">
                  <div class="info">
                    <div class="icon icon-danger">
                      <i class="now-ui-icons business_bulb-63"></i>
                    </div>
                    <h3 class="info-title">
                      <animated-number :value="this.qtdPerguntas"></animated-number>
                    </h3>
                    <h6 class="stats-title">Perguntas</h6>
                  </div>
                </div>
              </div>

              <div class="col-sm-4">
                <div class="statistics">
                  <div class="info">
                    <div class="icon icon-primary">
                      <i class="now-ui-icons ui-2_chat-round"></i>
                    </div>
                    <h3 class="info-title">
                      <animated-number :value="this.qtdComentarios"></animated-number>
                    </h3>
                    <h6 class="stats-title">Respostas</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>


    <div class="row">
      <div class="col-md-12">
        <card>
          <h4 slot="header" class="card-title">Alunos na sala</h4>
          <div class="table-responsive">
            <n-table class="table-shopping" :data="Alunos">
              <template slot="columns">
                
                <th>Aluno</th>
                
                <th class="text-center">
                  Respondidas
                </th>

                <th class="text-center">
                  Sem Resposta
                </th>

                <th class="text-center">
                  Nota Média
                </th>

              </template>
              <template slot-scope="{row}">
          
                <td>
                  <a >{{row.nome}}</a>
                  <br>
                  <small>{{row.email}}</small>
                </td>
                
                <td class="text-center">{{row.respondidas}}</td>

                <td class="text-center">
                  {{row.semResposta}}
                </td>
                <td class="text-center">
                  {{row.media}}
                </td>
               
              </template>
              
            </n-table>
          </div>
        </card>
      </div>
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

const axios = require('axios');
import url from 'src/data.js';

export default {
  components: {
    Checkbox,
    Card,
    NTable,
    StatsCard,
    AnimatedNumber,
    NProgress,
    AsyncWorldMap
  },
  data() {
    return {
      progress: 0,
      qtdAlunos: 0,
      qtdPerguntas: 0,
      qtdComentarios: 0,
      
      Alunos: [],
      alunoEdit: { nome: '', email: '', respondidas: 0, semResposta: 0, media: 0 },

    };
  },

  mounted () {
    var id_sala = this.$store.state.id_sala;
    this.QuantidadeDeAlunosPorSala(id_sala);
    this.QuantidadeDePerguntasSala(id_sala);
    this.PreencherTabela(id_sala);
  },

  methods: {
    QuantidadeDeAlunosPorSala(id){
      var self = this;
      axios.get(url+'/idAlunosSala/'+id, {
      }).then(function (response) {
        self.qtdAlunos = response.data.length;
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    QuantidadeDePerguntasSala(id){
      var self = this;
      axios.get(url+'/Perguntas_Sala/'+id, {
      }).then(function (response) {
       
        self.qtdPerguntas = response.data.length;

        for(var i = 0; i < response.data.length; i ++){

          axios.get(url+'/Respostas_perguntas/'+response.data[i].pergunta_id, {
          }).then(function (response) {
            self.qtdComentarios += response.data.length;
          })
          .catch(function (error) {
            console.log(error);
          })

        }
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    PreencherTabela(id){
      var self = this;
      axios.all([
        axios.get(url+'/idAlunosSala/'+id),
        axios.get(url+'/Perguntas_Sala/'+id),
      ]).then( axios.spread((response1, response2) => {

        for(var i = 0; i < response1.data.length; i ++){
          
          axios.get(url+'/Nome_aluno/'+response1.data[i].frequencia_aluno_id, {
          }).then(function (response) {
            
            self.alunoEdit.nome = response.data[0].aluno_nome;
            self.alunoEdit.email = response.data[0].aluno_email;

            self.Alunos.push(self.alunoEdit);
            self.alunoEdit = { nome: '', email: '', respondidas: 0, semResposta: 0, media: 0 };
          })
          .catch(function (error) {
            console.log(error);
          })
          
          
        }
      }))
      .catch(function (error) {
        console.log(error);
      })

    },

  },
};
</script>
<style>
</style>
