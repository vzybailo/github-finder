<template lang="">
    <div class="container">
        <div class="error" v-if="error">
            <p>{{error}}</p>
        </div>
        <search
          :value="search"
          placeholder="Type username"
          @search="search = $event"
        />
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
    methods: {
        getRepos () {
            // axios
            //   .get(`https://api.github.com/users/${this.search}/repos`)
            //     .then(res => {
            //         this.error=null
            //         this.repos = res.data
            //     })
            //     .catch(err => {
            //         this.repos = null
            //         this.error = 'Can`t find this user'
            //     })

                Promise.all([
                    axios.get(`https://api.github.com/users/${this.search}/repos`),
                    axios.get(`https://api.github.com/users/${this.search}`)
                    ]).then(([
                      user,
                      repos
                    ]) => {
                      this.error=null
                      this.repos = repos.data
                      this.user = user.data
                      console.log(user, repos);
                    })
                    .catch(err => {
                        this.repos = null
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
        margin-top: 100px;
        color: red;
    }
</style>