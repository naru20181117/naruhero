<template>
  <article class="card">
    <nuxt-link :to="{ path: `/blog/${id}`}" class="wrapper">
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
            <!-- <v-card-text
              :style="'font-size:0.9rem'"
              height="100%"
              v-html="id"
            /> -->
            <v-spacer />
            <v-card-actions class="mb-7">
              <v-btn
                text
                color="primary"
                class="mb-5"
                :style="'font-size:1.0rem'"
              >
                <span class="justify-center">{{ date }}</span>
              </v-btn>
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
    }
  }
}
</script>
