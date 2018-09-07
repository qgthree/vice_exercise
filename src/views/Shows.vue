<template>
  <main class="shows">
    <Selector :shows="shows" />
  </main>
</template>

<script lang="ts">
import { mapState, mapActions } from "vuex";
import { Component, Vue } from "vue-property-decorator";
import Selector from "@/components/Selector.vue"; // @ is an alias to /src

@Component({
  components: {
    Selector
  },
  computed: {
    ...mapState(["shows"])
  },
  methods: {
    ...mapActions(["fetchShows"])
  },
  created() {
    (<any>this).fetchShows(this.$route.query.id || null);
  },
  watch: {
    "$route.matched"() {
      (<any>this).fetchShows(this.$route.query.id || null);
    }
  }
})
export default class Home extends Vue {}
</script>

<style scoped lang="stylus">
  .shows
    min-width 320px
</style>
