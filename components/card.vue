<template>
  <article class="card">
    <nuxt-link :to="linkTo(id)">
    <article class="card">
      <v-row>
        <v-col
          class="d-flex"
          cols="12"
          sm="6"
          md="6"
          lg="4"
        >
          <v-card
            outlined
            max-width="100%"
            height="100%"
            class="d-flex flex-column"
          >
            <v-img :src="image_url" style="max-height:214px" height="214px" />
            <v-card-title
              class="justify-center"
              v-text="title"
            />
            <v-card-text :style="'font-size:0.9rem'" height="100%">
              {{$moment(date).format('YYYY/MM/DD')}}
            </v-card-text>
            <v-spacer />
            <v-card-actions class="mb-7">
              <template v-if="slide_post">
                <v-btn
                  block elevation="9" large class="mb-4 orange-color-back"
                  :href="url + '?entry_id=' + entry_id" target='_blank'>
                  スライドで確認する
                </v-btn>
              </template>
              <!-- <v-btn
                text
                color="primary"
                class="mb-5"
                :style="'font-size:1.0rem'"
              >
                <span class="justify-center">{{ $moment(date).format("YYYY/MM/DD") }}</span>
              </v-btn> -->
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      </article>
    </nuxt-link>
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
