<template>
  <section class="shows--selector">
    <nav class="shows--grid">
      <router-link v-for="show in shows" :key="show.id" :to="{ query: { id: show.id } }" class="shows--show" :style="{'background-image': 'url(' + show.product_image_url + ')'}" :class="show.column">
      </router-link>
    </nav>
    <div class="shows--details" v-if="currentShow">
      <span>{{currentShow.episodes}} episodes</span>
      <h1>{{currentShow.title}}</h1>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  computed: {
    currentShow(): number {
      return (<any>this).shows.find((show: any) => show.column === "col4");
    }
  }
})
export default class ShowSelector extends Vue {
  @Prop() private shows!: object;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  // mixins
  start(n)
    grid-column-start n
    grid-column-end n+1

  .shows--selector
    width 100%
    overflow hidden
    margin 30px 0px
    .shows--grid
      display grid
      grid-gap 30px
      grid-template-columns repeat(7, 1fr)
      width 350%
      left -125%
      position relative
      .shows--show
        width 100%
        height 0
        padding-bottom 150%
        background-position center
        background-size cover
        transition all 0.2s ease
        grid-row-start 1
        grid-row-end 2
        opacity 0.7
        transition all 200ms
        &:hover
          opacity 1

      .col1
        start 1
      .col2
        start 2
      .col3
        start 3
      .col4
        start 4
        opacity 1
      .col5
        start 5
      .col6
        start 6
      .col7
        start 7

  .shows--details
    margin 15px
    text-transform uppercase
    h1
      font-size 1.25rem
      margin 8px
    span
      opacity 0.7
      font-size: 0.9rem

  @media screen and (min-width: 980px)
    .shows--selector
      .shows--grid
        width 180%
        left -40%
      .shows--details
        margin 20px
        h1
          font-size 1.4rem
        span
          font-size: 1rem
</style>
