<template>
  <section class="id">
    <h1 class="content_title">
      {{ post.title }}
    </h1>
    <img :src="post.image.file.url" :alt="post.image.title" class="thumbnail">
    <p class="content_date">{{ getFormattedDate(post.updated_at) }}</p>
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
import { mapState } from 'vuex'

const client = createClient()
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  transition: 'slide-right',
  computed: {
    ...mapState(['posts', this]),
      post () {
        const item = this.posts.find(
          post => post.fields.id == this.$route.params.id,
        )
        return {
          title: item.fields.title,
          body: item.fields.body,
          image: item.fields.postImage.fields,
          updated_at: item.sys.updatedAt,
        }
      }
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
  max-width: 80%;
  margin: 0 auto;

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
