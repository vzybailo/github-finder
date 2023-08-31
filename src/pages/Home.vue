<template lang="">
    <div class="container">
        <search
          :value="search"
          placeholder="Type username"
          @search="search = $event"
        />
        <div class="error" v-if="error">
            <p>{{error}}</p>
        </div>
        <button
          class="btn btnPrimary"
          @click="getRepos()"
        >
          Search
        </button>
          <div
            v-if="repos"
            class="repos__wrapper"
          >
            <div class="user">
             <div class="user-name">
               <img :src="user.avatar_url" :alt="user.name">
               <span> {{ user.name }} </span>
             </div>
             <span> {{ getRepoNumber }} </span>
            </div>
            <div
              class="repo-item"
              v-for="repo in repos"
              :key="repo.id"
            >
              <div class="repo-info">
                  <a target="blank" :href="repo.html_url" class="repo-link">{{repo.name}}</a>
                <span>{{repo.stargazers_count}} ⭐</span>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import search from '@/components/Search.vue'
import axios from 'axios'

export default {
    components: { search },
    data () {
        return {
            search: '',
            error: null,
            repos: null,
            user: null
        }
    },
    computed: {
      getRepoNumber () {
        return this.repos.length
      }
    },
    methods: {
        getRepos () {
          Promise.all([
            axios.get(`https://api.github.com/users/${this.search}/repos`),
            axios.get(`https://api.github.com/users/${this.search}`)
          ]).then(([
                     repos,
                     user
                   ]) => {
            this.error = null
            this.repos = repos.data
            this.user = user.data
            console.log(this.user, this.repos);
          })
              .catch(err => {
                this.repos = null
                this.user = null
                this.error = 'Can`t find this user'
              })
        }
    }
}
</script>

<style lang="scss">
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .btn {
        margin-top: 20px;
    }
    .repos__wrapper {
        width: 600px;
        margin: 0 auto;
    }
    .repo-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        padding: 10px 0;
        border-bottom: 1px solid gray;
    }
    .repo-link {
        text-decoration: none;
        color: cadetblue;
    }
    .error {
        margin-top: 10px;
        color: red;
    }
    .user {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      background: #67c567;
      border-radius: 10px;
      margin: 20px 0;
      color: #fff;

      img {
        width: 50px;
        height: auto;
        border-radius: 50%;
        margin-right: 15px;
      }
    }
</style>