# Все о Vuex за 30 минут. Что такое Vuex. Как работает Vuex

[lesson](www.youtube.com/watch?v=c2SK1IlmYL8&t=30s)

## Resources

[Vuex main page](www.youtube.com/watch?v=c2SK1IlmYL8&t=30s). Vuex is a **state management pattern + library** for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion. It also integrates with Vue's official [devtools extension (opens new window)](https://github.com/vuejs/vue-devtools)to provide advanced features such as zero-config time-travel debugging and state snapshot export / import.

[{JSON} Placeholder](https://jsonplaceholder.typicode.com) &mdash; Free to use fake Online REST API for testing and prototyping
Powered by [JSON Server](https://github.com/typicode/json-server) + [LowDB](https://github.com/typicode/lowdb)

## Get started

```bash
vue create .
```

Manual select options ->
Babel ->
Dedicated config files -> 
No save as preset... ->

🚀  Invoking generators...
📦  Installing additional dependencies...

added 3 packages from 1 contributor and audited 1216 packages in 29.462s

60 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

⚓  Running completion hooks...

📄  Generating README.md...

🎉  Successfully created project vuex30.
👉  Get started with the following commands:

```bash
npm run serve
```

## Clean porject

```bash
rm src/components/HelloWorld.vue
```

`App.vue` remove:

```vue
<img alt="Vue logo" src="./assets/logo.png">
<HelloWorld msg="Welcome to Your Vue.js App"/>
<script>
import HelloWorld from './components/HelloWorld.vue'
{
  components: {
    HelloWorld
  }
}
    
</script>
```

## Without vuex...

`App.vue`

```vue
<template>
  <div id="app">
    <div v-if="posts">
      <div class="post" v-for="post in posts" :key="post.id">
        <h2>{{post.title}}</h2>
        <p>{{post.body}}</p>
      </div>

    </div>
    <p v-else>No posts</p>
  </div>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    posts: []
  }),
  async mounted() {
    const resp = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
    const data = await resp.json()
    this.posts = data
  }
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

```

## Installing vuex

```bash
npm i vuex
```

### Tune vuex

```bash
mkdir src/store
touch src/store/index.js
```

```js
import Vue from 'vue'
import Vuex from 'vuex'
import post from './modules/post'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    post
  }
})
```

in `main.js` add lines:

```js
import Vue from 'vue'
import store from './store'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
```

### Adding modules in store

```bash
mkdir src/store/modules
touch src/store/modules/post.js
```

```js
export default {
  state: {
    posts: []
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    allPosts(state) {
      return state.posts
    }
  }
}
```

now,in `App` we can use this state.

```vue
<template>
  <div id="app">
    <div v-if="posts">
      <div class="post" v-for="post in allPosts" :key="post.id">
        <h2>{{post.title}}</h2>
        <p>{{post.body}}</p>
      </div>

    </div>
    <p v-else>No posts</p>
  </div>
</template>

<script>

export default {
  name: 'App',
  // data: () => ({
  //   posts: []
  // }),
  computed: {
    allPosts() {
      return this.$store.getters.allPosts
    }
  },
  async mounted() {
    const resp = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
    const data = await resp.json()
    this.posts = data
  }
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

```

### Using helpers to retrieve data 

`App`

```vue
<template>
  <div id="app">
    <p v-if="!allPosts">No posts.</p>
    <div v-else>
      <div class="post" v-for="post in allPosts" :key="post.id">
        <h2>{{post.title}}</h2>
        <p>{{post.body}}</p>
      </div>

    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  // data: () => ({
  //   posts: []
  // }),
  // computed: {
  //   allPosts() {
  //     return this.$store.getters.allPosts
  //   }
  // },
  computed: mapGetters(['allPosts']),
  async mounted() {
    const resp = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
    const data = await resp.json()
    this.posts = data
  }
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

```

## Working with updating state

### Add getters

move from `App`.mounted to `post`.actions:

`App`

```vue
<script>
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  computed: mapGetters(['allPosts']),
  async mounted() {
    this.$store.dispatch('fetchPosts')
  }
}
</script>
```

`post`

```js
export default {
  state: {
    posts: []
  },
  mutations: {
    updatePosts(state, posts) {
      state.posts = posts
    }
  },
  actions: {
    async fetchPosts(ctx) {
      const resp = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
      const data = await resp.json()
      ctx.commit('updatePosts', data)
    }
  },
  getters: {
    allPosts(state) {
      return state.posts
    }
  }
}
```

### Add actions

`App`

```js
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'App',
  computed: mapGetters(['allPosts']),
  async mounted() {
    // this.$store.dispatch('fetchPosts')
    this.fetchPosts()
  },
  methods: mapActions(['fetchPosts'])
}
```

## Setting parameters in actions

`post`

```js
actions: {
  async fetchPosts(ctx, limit = 3) {
    const resp = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=' + limit)
    const data = await resp.json()
    ctx.commit('updatePosts', data)
  }
},
```

`App`

```js
async mounted() {
  this.fetchPosts(4)
},
```

## More about getters

`post`.getters

```js
postsCount(state) {
  return state.posts.length
}
```

`App`

```vue
<div id="app">
    <p v-if="!allPosts">No posts.</p>
    <div v-else>
      <h1>Posts: {{postsCount}}</h1>
...
computed: mapGetters(['allPosts', 'postsCount'])
```

## Add new post

```bash
touch src/components/PostForm.vue
```

```vue
<template>
  <form @submit.prevent="submit">
    <input type="text" placeholder="title" v-model="title">
    <input type="text" placeholder="body" v-model="body">
    <button type="submit">Create post</button>
  </form>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  data: () => ({
    title: '',
    body: ''
  }),
  methods: {
    ...mapMutations(['createPost']),
    submit() {
      this.createPost({
        title: this.title,
        body: this.body,
        id: Date.now()
      })
      this.title = this.body = ''
    }
  }
}
</script>

<style scoped>
input{
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 2px;
  padding: 10px;
  margin-bottom: 10px;
};
</style>
```

`App`

```vue
<PostForm />
...
import PostForm from './components/PostForm'
components: {PostForm}
```

## Posts validation

### Via getters

new getter validPosts:

```js
validPosts(state) {
  return state.posts.filter(p=>{
    return p.title && p.body
  })
},
```

`App`

```vue
<div class="post" v-for="post in allPosts" :key="post.id">
    ...
computed: mapGetters(['allPosts', 'postsCount', 'validPosts']),
```

replace with

```vue
<div class="post" v-for="post in validPosts" :key="post.id">
```

in `post`

```js
postsCount(state) {
  return state.posts.length
}
```

replace with

```
postsCount(state, getters) {
  return state.posts.length
}
```

[time 32:00](www.youtube.com/watch?v=c2SK1IlmYL8&t=1920s)