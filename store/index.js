import { createClient } from '~/plugins/contentful.js'

export const state = () => ({
  posts: []
})

export const getters = {

}

export const mutations = {
  setPosts (state, payload) {
    state.posts = payload
  }
}

const client = createClient()
export const actions = {
  async getPosts ({ commit, route }) {
    await client.getEntries({
      content_type: process.env.CTF_BLOG_POST_TYPE_ID,
      order: '-sys.createdAt'
    })
      .then((res) => {
        console.log(res)
        console.log(res.items)
        commit('setPosts', res.items)
      })
      .catch(console.error)
  }
}
