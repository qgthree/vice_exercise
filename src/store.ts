import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    shows: []
  },
  getters: {
    subset: state => (id: string): object[] => {
      // find the index of the currently-selected show
      let showIndex = 0;
      if (id) {
        showIndex = state.shows.findIndex(
          (show: any): boolean => show.id == id
        );
      }

      // set each show's place in the 7-show rotation
      const subset = state.shows;
      for (let i = 0; i < subset.length; i++) {
        (<any>subset[i]).column = i - showIndex + 4;
      }

      // return a subset of 7 shows
      const start = Math.max(0, showIndex - 3);
      const end = showIndex + 4;
      return subset.slice(start, end);
    }
  },
  mutations: {
    setShows(state: any, allShows: object[]): void {
      state.shows = allShows;
    }
  },
  actions: {
    async fetchShows({ commit }): Promise<void> {
      try {
        const response = await fetch("http://localhost:3000/shows.json");
        if (!response.ok) throw new Error(response.statusText);
        const allShows = await response.json();
        commit("setShows", allShows.shows);
      } catch (err) {
        console.log(err);
      }
    }
  }
});
