import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    shows: []
  },
  mutations: {
    setShows(state, subset) {
      state.shows = subset;
    }
  },
  actions: {
    async fetchShows({ commit }, id) {
      try {
        const response = await fetch("http://localhost:3000/shows.json");
        if (!response.ok) throw new Error(response.statusText);
        const allShows = await response.json();

        // find the index of the currently-selected show
        let showIndex = 0;
        if (id) {
          showIndex = allShows.shows.findIndex((show: any) => show.id == id);
        }

        // set each show's place in the 7-show rotation
        for (let i = 0; i < allShows.shows.length; i++) {
          allShows.shows[i].column = "col" + (i - showIndex + 4);
        }

        // create a subset of 7 shows
        const start = Math.max(0, showIndex - 3);
        const end = showIndex + 4;
        const subset = allShows.shows.slice(start, end);

        commit("setShows", subset);
      } catch (err) {
        console.log(err);
      }
    }
  }
});
