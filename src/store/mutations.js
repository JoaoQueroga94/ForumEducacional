// https://vuex.vuejs.org/en/mutations.html

export default {
  setIsAuthenticated(state, payload) {
    state.isAuthenticated = payload;
  },
  setIdUsuario(state, payload) {
    state.id_usuario = payload;
  },
  setIdSala(state, payload) {    
    state.id_sala = payload;
  },
  setIdPergunta(state, payload) {
    state.id_pergunta = payload;
  },
  setNome(state, payload) {
    state.nome = payload;
  },
  setEmail(state, payload) {
    state.email = payload;
  },
  setNomeSala(state, payload) {
    state.sala_nome = payload;
  },
  setPergunta(state, payload) {
    state.pergunta = payload;
  },
}
