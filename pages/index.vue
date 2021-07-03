
<template>
  <section class="index">
    <card
      v-for="(post,i) in posts"
      :key="i"
      :title="post.fields.title"
      :id="post.sys.id"
      :image_url="post.fields.postImage.fields.file.url"
      :date="post.sys.updatedAt"
    />
  </section>
</template>

<script>
import Card from '~/components/card.vue'
import { createClient } from '~/plugins/contentful.js'

const client = createClient()
export default {
  transition: 'slide-left',
  components: {
    Card
  },
  asyncData({ env, params }) {
    return client
      .getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID,
        order: "-sys.createdAt"
        })
      .then(entries => {
        return {
          posts: entries.items,
        }
      })
      .catch(console.error)
  }
}
</script>

<style scoped>
.color {
  background-color: #e65b20;
}
.color2 {
  background-color: #d1cbc3;
}
.color3 {
  background-color: #f7f4f2;
}
.color4 {
  background-color: #3e1300;
}
</style>
