<template>
  <section class="slug">
    <h1 class="slug_title">
      {{ article.fields.title }}
    </h1>
    <p class="slug_date">{{ article.sys.updatedAt }}</p>
    <div>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <div class="body" v-html="$md.render(body)"></div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <img :src="image.file.url" :alt="image.title" class="thumbnail">
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
  async asyncData({ env, params }) {
    return await client
      .getEntry(params.sys)
      .then(entrie => {
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
.slug_title {
  margin-top: 40px;
  font-weight: bold;
  font-size: 32px;
}
.slug_date {
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
</style>
