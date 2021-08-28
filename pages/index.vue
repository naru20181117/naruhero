
<template>
  <section class="index">
    <card
      v-for="(post,i) in posts"
      :key="i"
      :title="post.fields.title"
      :id="post.fields.id"
      :image_url="post.fields.postImage.fields.file.url"
      :date="post.sys.updatedAt"
      :entry_id="post.sys.id"
      :slide_post="post.fields.slidePost"
    />
  </section>
</template>

<script>
import Card from '~/components/card.vue'
import { createClient } from '~/plugins/contentful.js'
import { mapState } from 'vuex'

export default {
  transition: 'slide-left',
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
