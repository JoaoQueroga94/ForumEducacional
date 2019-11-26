// https://vuex.vuejs.org/en/actions.html
import router from '../routes/routes'
export default {
    userLogin({ commit }, { token_user, new_user_id, email_user}) {
          commit('setToken', token_user);
          commit('setEmailUser', email_user);
          commit('setUserId', new_user_id);
          commit('setListId', 0)
          router.push('/dashboard')
    },
    userSignOut({ commit }) {
      commit('setToken', '');
      commit('setUserId', '');
    },
    irParaSala({ commit }, { user_sala_id, sala_nome } ) {
      commit('setIdSala', user_sala_id);
      commit('setNomeSala', sala_nome);
    },
    irParaPergunta({ commit }, { pergunta_id } ) {
      commit('setIdPergunta', pergunta_id);
    },
    DadosUsuarios({ commit }, { id, nome, email } ) {
      commit('setNome', nome);
      commit('setEmail', email);
      commit('setIdUsuario', id);
    },
  
}
