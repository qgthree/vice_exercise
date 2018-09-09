<template>
  <main class="vice-shows">
    <Selector :shows="subset" />
  </main>
</template>

<script lang="ts">
import { mapActions } from "vuex";
import { Component, Vue } from "vue-property-decorator";
import Selector from "@/components/Selector.vue"; // @ is an alias to /src

@Component({
  components: {
    Selector
  },
  computed: {
    subset(): object[] {
      return this.$store.getters.subset(this.$route.query.id);
    }
  },
  methods: {
    ...mapActions(["fetchShows"])
  },
  created(): void {
    (<any>this).fetchShows();
  }
})
export default class Home extends Vue {}
</script>

<style scoped lang='stylus'>
  .vice-shows
    min-width 320px
</style>
