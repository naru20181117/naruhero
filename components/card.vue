<template>
  <article class="card">
    <v-col
      class="d-flex"
      cols="12"
      sm="6"
      md="6"
      lg="4"
    >
      <nuxt-link :to="linkTo(id)">
        <v-card
          outlined
          width="380px"
          height="100%"
          class="d-flex flex-column"
        >
          <v-card-title
            class="justify-center"
            v-text="title"
          />
          <div style="min-height:250px">
            <v-img :src="image_url" :contain="true" style="height:280px; max-width:480px;" />
          </div>
          <v-row>
            <v-col class="d-flex" cols="24">
              <v-card-text :style="'font-size:0.9rem'" height="100%">
                {{$moment(date).format('作成日 YYYY/MM/DD')}}
              </v-card-text>
              <v-card-actions>
                <template v-if="slide_post">
                  <v-btn block elevation="9" class="orange-color-back">
                    スライド対応
                  </v-btn>
                </template>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </nuxt-link>
    </v-col>
  </article>
</template>

<script>
export default {
  data() {
    return {
      url: 'https://naruhero-blog-slide.netlify.app/'
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    image_url: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    entry_id: {
      type: String,
      default: ''
    },
    slide_post: {
      type: Boolean,
      default: ''
    }
  },
  methods: {
    linkTo (id) {
      return { name: 'blog-id', params: { id: id } }
    }
  }
}
</script>


<style lang="scss" scoped>
.card {
  margin: 0 auto;
}
</style>
