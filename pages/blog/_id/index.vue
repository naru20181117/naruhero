<template>
  <section>
    <v-container class="id">
      <h1 class="content_title">
        {{ post.title }}
      </h1>
      <img :src="post.image.file.url" :alt="post.image.title" class="thumbnail mb-1">
      <template v-if="post.slide_post">
        <v-btn
          block elevation="9" large class="mb-4 orange-color-back"
          :href="url + '?entry_id=' + post.entry_id" target='_blank'>
          スライドで確認する
        </v-btn>
      </template>
      <v-row>
        <!-- <v-col
          cols="12"
          sm="2"
        >
          <v-sheet
            rounded="lg"
            min-height="268"
          >

          </v-sheet>
        </v-col> -->

        <v-col
          cols="12"
          sm="9"
        >
          <v-sheet
            min-height="70vh"
            rounded="lg"
          >
            <div class="body" v-html="$md.render(post.body)"/>
          </v-sheet>
        </v-col>

        <v-col
          cols="12"
          sm="3"
        >
          <v-sheet
            rounded="lg"
            min-height="268"
          >
            <p class="content_date">{{ $moment(post.updated_at).format("更新日 YYYY/MM/DD") }}</p>
            <v-btn
              :href="'https://twitter.com/intent/tweet?text=' + post.title + '&url=https://naruhero.site' + post.param"
              color="info" block large elevation="5" target='_blank'>
              <v-icon large>
                mdi-twitter
              </v-icon>
                　\  シェア  /
            </v-btn>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script>
import { createClient } from '~/plugins/contentful.js'
import { mapState } from 'vuex'

const client = createClient()
export default {
  data() {
    return {
      url: 'https://naruhero-blog-slide.netlify.app/',
    }
  },
  head() {
    return {
      title: this.post.title,
      meta: [
        // { hid: 'og:description', property: 'og:description', content: '個別ディスクリプション' },
        // { hid: 'description', property: 'description', content: '個別' },
        {
          hid: 'description',
          name: 'description',
          content:
            'サービス開発のためのブログ',
        },
        { hid: 'og:url', property: 'og:url', content: window.location.href },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:image', property: 'og:image', content: this.post.image.file.url },
        { hid: 'og:title', property: 'og:title', content: this.post.title },
      ]
    }
  },
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
        entry_id: item.sys.id,
        slide_post: item.fields.slidePost,
        param: this.$route.fullPath
      }
    },
    url () {
      return {
        id: window.location
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.id {
  width: 90vw;
  margin: 0 auto;

  img {
    max-width: 300px;
    max-height: 400px;
    object-fit: contain;
  }
  .content_title {
    margin: 2rem 1rem 1rem;
    font-weight: bold;
    font-size: 32px;
  }
  .content_date {
    padding: 1rem;
    font-size: 14px;
    color: #e65b20;
  }
  .body {
    padding: 2rem;
    color: #3e1300;

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
          line-height: 150%;
        }
      }
      hr {
        border: none;
      }
      li {
        line-height: 200%;
      }
      p {
          line-height: 150%;
        }
    }

  }
  .link {
    display: block;
  }
}

@media screen and (max-width: 550px) {
  .id {
    max-width: 100vw;
  }
}
</style>
