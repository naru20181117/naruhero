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
            <div class="body" v-html="$md.render(post.body)"/>
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
    margin: 2rem 1rem 1rem;
    font-weight: bold;
    font-size: 32px;
  }
  .content_date {
    font-size: 14px;
    color: #e65b20;
    margin-top: 16px;
  }
  .body {
    margin: 24px 0 80px;
    padding: 0 3rem;
    color: #3e1300;
    line-height: 130%;

    ::v-deep {
      h1, h2, h3, h4 {
        // margin: 1rem 0;
        line-height: 120%;
      }
      h1, h2 {
        margin: 2.5rem 0 1rem;
      }
      h3, h4 {
        margin: 1.5rem 0 1rem;
      }
      table {
        border-collapse: collapse;
        margin: 2rem !important;
      }
      table, th, td {
        border: 1px solid;
      }
      th {
        background-color: #d1cbc3;
      }
      img {
        max-height: 300px;
        padding: 1rem;
      }
      blockquote {
        max-width: 50%;
        p {
          background-color: #f2f2f2;
          padding: 1rem;
        }
      }
    }

  }
  .link {
    display: block;
  }
}
</style>
