// https://vuex.vuejs.org/en/getters.html

export default {
  getIdUsuario(state) {
    return state.id_usuario;
  },
  getIdSala(state) {
    return state.id_sala;
  },
  getIdPergunta(state) {
    return state.id_pergunta;
  },
  getNome(state) {
    return state.nome;
  },
  getEmail(state) {
    return state.email;
  },
  getNomeSala(state) {
    return state.sala_nome;
  },
}
