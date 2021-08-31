
<template>
  <section class="body">
    <v-row>
      <card
        v-for="(post,i) in posts"
        :key="i"
        :title="post.fields.title"
        :id="post.fields.id"
        :image_url="post.fields.postImage.fields.file.url"
        :date="post.sys.createdAt"
        :slide_post="post.fields.slidePost"
      />
    </v-row>
  </section>
</template>

<script>
import Card from '~/components/card.vue'
import { mapState } from 'vuex'

export default {
  // transition: 'slide-left',
  components: {
    Card
  },
  computed: {
    ...mapState(['posts'])
  },
}
</script>

<style scoped>
</style>
