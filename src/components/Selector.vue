<template>
  <section class="shows--selector">
    <div class="shows--grid">
      <router-link v-for="{id, product_image_url, column} in shows" :key="id" :to="{ query: { id: id } }" class="shows--show" :style="{'background-image': `url(${product_image_url})`}" :class="`col${column}`">
      </router-link>
    </div>
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
      return (<any>this).shows.find((show: any) => show.column === 4);
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

  responsiveGrid(x, y)
    .shows--selector
      .shows--grid
        width x
        left y

  responsiveDetails(x, y, z)
    .shows--selector
      .shows--details
        text-transform uppercase
        margin x
        h1
          font-size y
          margin 8px
        span
          font-size: z
          opacity 0.7

  // template styles
  .shows--selector
    width 100%
    overflow hidden
    margin 30px 0px
    .shows--grid
      display grid
      grid-gap 30px
      grid-template-columns repeat(7, 1fr)
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

  responsiveGrid(350%, -125%)
  responsiveDetails(15px, 1.25rem, 0.9rem)

  // queries
  @media screen and (min-width 700px) and (max-width 979px)
    responsiveGrid(250%, -75%)
    responsiveDetails(20px, 1.4rem, 1rem)

  @media screen and (min-width 980px)
    responsiveGrid(180%, -40%)
    responsiveDetails(20px, 1.4rem, 1rem)
</style>
