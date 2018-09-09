<template>
  <section class="vice-shows--selector">
    <transition-group tag="div" class="vice-shows--grid">
      <router-link v-for="{id, product_image_url, column} in shows" :key="id" :to="{ query: { id: id } }" class="vice-shows--show" :style="{'background-image': `url(${product_image_url})`}" :class="`col${column}`">
      </router-link>
      <div v-if="getShow(3)" class="vice-shows--scroll__left" :key="'scroll__left'">
        <button v-on:click="scroll(3)">&#9664;</button>
      </div>
      <div class="vice-shows--details" v-if="getShow(4)" :key="'details'">
        <div>
          <span>{{getShow(4).episodes}} episodes</span>
          <h1>{{getShow(4).title}}</h1>
        </div>
      </div>
      <div v-if="getShow(5)" class="vice-shows--scroll__right" :key="'scroll__right'">
        <button v-on:click="scroll(5)">&#9654;</button>
      </div>
    </transition-group>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  methods: {
    getShow(spot: number): object {
      return (<any>this).shows.find(
        (show: any): boolean => show.column === spot
      );
    },
    scroll(spot: number): void {
      if ((<any>this).getShow(spot)) {
        this.$router.push({ query: { id: (<any>this).getShow(spot).id } });
      }
    }
  }
})
export default class ShowSelector extends Vue {
  @Prop() private shows!: object[];
}
</script>

<style scoped lang='stylus'>
  // mixins
  spot(x, y)
    grid-row-start x
    grid-row-end x+1
    grid-column-start y
    grid-column-end y+1

  responsiveGrid(x, y)
    .vice-shows--selector
      .vice-shows--grid
        width x
        left y

  responsiveDetails(x, y)
    .vice-shows--selector
      .vice-shows--grid
        .vice-shows--details
          spot 2 4
          text-transform uppercase
          height 100px
          display flex
          align-items center
          div
            width 100%
            span
              font-size: y
              opacity 0.7
            h1
              font-size x
              margin 8px 0 0 0

  // template styles
  .vice-shows--selector
    width 100%
    overflow hidden
    margin 30px 0px
    .vice-shows--grid
      display grid
      grid-gap 30px
      grid-template-columns repeat(7, 1fr)
      position relative
      .vice-shows--show
        height 0
        padding-bottom 150%
        background-position center
        background-size cover
        opacity .7
        transition all 200ms ease

      .col1
        spot 1 1
      .col2
        spot 1 2
      .col3
        spot 1 3
      .col4
        spot 1 4
        opacity 1
      .col5
        spot 1 5
      .col6
        spot 1 6
      .col7
        spot 1 7

  .vice-shows--scroll__left
    spot 2 3
    text-align right
    align-self center

  .vice-shows--scroll__right
    spot 2 5
    text-align left
    align-self center

  button
    color #000
    font-size 38px
    border none
    outline 0
    cursor pointer
    background none
    padding 0px

  responsiveGrid(350%, -125%)
  responsiveDetails(1.25rem, 0.9rem)

  // queries
  @media screen and (min-width 700px) and (max-width 979px)
    responsiveGrid(250%, -75%)
    responsiveDetails(1.4rem, 1rem)

  @media screen and (min-width 980px)
    responsiveGrid(180%, -40%)
    responsiveDetails(1.4rem, 1rem)
</style>
