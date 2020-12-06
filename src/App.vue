<template>
  <div id="app">
    <PostForm />
    <hr>
    <p v-if="!allPosts">No posts.</p>
    <div v-else>
      <h1>Posts: {{postsCount}}</h1>
      <div class="post" v-for="post in validPosts" :key="post.id">
        <h2>{{post.title}}</h2>
        <p>{{post.body}}</p>
      </div>

    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import PostForm from './components/PostForm'

export default {
  name: 'App',
  computed: mapGetters(['allPosts', 'postsCount', 'validPosts']),
  async mounted() {
    this.fetchPosts(4)
  },
  methods: mapActions(['fetchPosts']),
  components: {PostForm}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  width: 400px;;
}

.post{
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
}
</style>
