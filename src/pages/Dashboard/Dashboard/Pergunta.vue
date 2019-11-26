<template>
  <div>
   
    <div class="row">

        <card class="card-nav-tabs" header-classes="card-header-warning">
          <p class="card-title">Sala de Geografia</p>
          <h6 class="card-subtitle mb-2 text-muted">No território brasileiro, como explicar a ausência de cadeias montanhosas?</h6>
        </card>

    </div>


    <div style="background-color: #ebecf1;">
      <time-line type="simple">
          
          <time-line-item inverted="" badge-type="info" badge-icon="now-ui-icons ui-2_chat-round">
            <span slot="header" class="badge badge-info">João Queroga -- 10 <i class="now-ui-icons ui-2_like"></i></span> 
            <div slot="content">
              <p>
                Os homens cavaram tanto que virou planície...
              </p>
              
              <span slot="footer">
                <br>
                <slider v-model="sliderValue" type="info" :range="{min: 0, max: 10}"  :options="{step: 1}"></slider>
                <br>
                <n-button type="success" round="" size="sm" @click.native="AtribuirNota">Salvar a nota: {{parseInt(this.sliderValue*100)/100}}</n-button>
          
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
      //NovaQuestao: this.$store.state.id_pergunta, //'',
      sliderValue: 0,
      cards: [],

      comentario_edit: {id: 0, usuario: '', resposta: '', nota: 0, curtidas: 0}

    };
  },
  methods: {

  CriarPergunta(x){
    //this.$router.push("/sala");
  },

  AtribuirNota () {
        this.$notify(
          {
            message: 'Nota atribuída',
            icon: 'now-ui-iconsw ui-1_check',
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: "info",
          })
      }
  }
};
</script>
<style>
</style>

