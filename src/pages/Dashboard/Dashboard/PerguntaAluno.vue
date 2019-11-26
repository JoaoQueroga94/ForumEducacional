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
            <span slot="header" class="badge badge-info">Fábio Michel</span>
            <div slot="content">
              <p>
                Pois o relevo brasileiro é antigo, e as montanhas que existiam aqui há milhões de anos atrás foram sendo desgastadas com o passar do tempo, por causa da ação das chuvas, ventos, sedimentações, etc. Então essas antigas montanhas se transformaram nas serras que conhecemos hoje.</p>
              <p>
              <hr>
              <span slot="footer">
                16
                <n-button type="primary" round="" icon="">
                  <i class="now-ui-icons ui-2_like"></i>
                </n-button>
              </span>
            </div>
          </time-line-item>

          <time-line-item inverted="" badge-type="info" badge-icon="now-ui-icons ui-2_chat-round">
            <span slot="header" class="badge badge-info">João Queroga</span>
            <div slot="content">
              <p>
                Os homens cavaram tanto que virou planície...
              <p>
              <hr>
              <span slot="footer">
                1
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
      NovaQuestao: '',
      sliderValue: 0,
      sliderValue2: 0,
    };
  },
  methods: {

  CriarPergunta(x){
    //this.$router.push("/sala");
  }


  }
};
</script>
<style>
</style>

