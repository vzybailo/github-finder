<template>
  <div class="wrapper">

    <header>
      <div class="navbar">
        <div class="container">
          <div class="navbar-content">
            <a href="/" class="logo">
              <img src="./assets/images/github.png" alt="" class="logo__icon">
              <span class="logo__text"></span>Github finder
            </a>
          </div>
        </div>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      links: [
        { title: 'Home', url: '/' }
      ]
    }
  }
}
</script>

<style lang="scss">
.navbar-link {
  &.router-link-exact-active {
    color: #5247e7;
  }
}
.logo {
    display: flex;
    align-items: center;
    text-transform: uppercase;
}
.logo__icon {
  margin-right: 10px;
}
</style>
