export default {
  state: {
    posts: []
  },
  mutations: {
    updatePosts(state, posts) {
      state.posts = posts
    },
    createPost(state, post){
      state.posts.unshift(post)
    }
  },
  actions: {
    async fetchPosts(ctx, limit = 3) {
      const resp = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=' + limit)
      const data = await resp.json()
      ctx.commit('updatePosts', data)
    }
  },
  getters: {
    validPosts(state) {
      return state.posts.filter(p=>{
        return p.title && p.body
      })
    },
    allPosts(state) {
      return state.posts
    },
    postsCount(state, getters) {
      return getters.validPosts.length
    }
  }
}