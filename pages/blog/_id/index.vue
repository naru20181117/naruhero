<template>
  <section class="id">
    <h1 class="content_title">
      {{ article.fields.title }}
    </h1>
    <img :src="image.file.url" :alt="image.title" class="thumbnail">
    <p class="content_date">{{ article.sys.updatedAt }}</p>
    <div>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <div class="body" v-html="$md.render(body)"></div>
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
    },
  },
  transition: 'slide-right',
  async asyncData({ env, params, query }) {
    return await client
      .getEntry('2CarS17naZgKwFsQiKc8F2')
      .then(entrie => {
        console.log(entrie)
        return {
          article: entrie,
          body: entrie.fields.body,
          image: entrie.fields.postImage.fields
        }
      })
      .catch(console.error)
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
