<template>
  <section class="id">
    <h1 class="content_title">
      {{ post.title }}
    </h1>
    <img :src="image.file.url" :alt="image.title" class="thumbnail">
    <p class="content_date">{{ getFormattedDate(updated_at) }}</p>
    <div>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <div class="body" v-html="$md.render(post.body)"></div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </section>
</template>
<script>
import { createClient } from '~/plugins/contentful.js'

const client = createClient()
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  transition: 'slide-right',
  async asyncData (route) {
    return await client
      .getEntry(route.params.id)
      .then(entrie => {
        console.log(entrie.fields)
        return {
          post: entrie.fields,
          image: entrie.fields.postImage.fields,
          updated_at: entrie.sys.updatedAt,
        }
      })
      .catch(console.error)
  },
  methods: {
    getFormattedDate (date) {
      const originDate = new Date(date)
      const year = originDate.getFullYear()
      const month = originDate.getMonth() + 1
      const day = originDate.getDate()
      return `${year}年${month}月${day}日`
    }
  }
}
</script>

<style lang="scss" scoped>
.id {
  img {
    max-width: 300px;
    max-height: 100%;
    object-fit: cover;
  }
  .content_title {
    margin-top: 40px;
    font-weight: bold;
    font-size: 32px;
  }
  .content_date {
    font-size: 14px;
    color: #333;
    margin-top: 16px;
  }
  .body {
    margin: 24px 0 80px;
  }
  .link {
    display: block;
  }
}
</style>
