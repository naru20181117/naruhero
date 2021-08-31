<template>
  <v-app light>
    <v-app-bar clipped-left  app>
      <v-app-bar-nav-icon @click.stop="miniVariant = !miniVariant" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="miniVariant" temporary fixed>
      <v-list>
        <v-list-item>
          <span></span>
          <v-list>
            <v-list-item
              v-for="(item, x) in items"
              :key="x"
              :to="item.to"
              router
              exact
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-for="(out_items, y) in out_items"
              :key="y"
              :href="out_items.url"
              target="_blank"
              router
              exact
            >
              <v-list-item-action>
                <v-icon>{{ out_items.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text='out_items.title' />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer absolute app>
      <span>&copy; naruhiro {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: 'mdi-home-variant-outline',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-cellphone-link',
          title: 'App',
          to: 'app',
        },
      ],
      out_items: [
        {
          icon: 'mdi-account-circle-outline',
          title: 'Portfolio Site',
          url: 'https://naruhiro-portfolio.firebaseapp.com/',
        },
      ],
      miniVariant: false,
      title: 'Naruhe.log',
    }
  },
}
</script>

<style lang="scss" scoped>
body {
  color: #3e1300;
}
#__nuxt {
  color: #e65b20;
}
#app {
  color: #3e1300;
}

.v-application {
  background-color: #d1cbc3;
}

.orange-color {
  background-color: #e65b20;
}
.color2 {
  background-color: #d1cbc3;
}
.color3 {
  background-color: #f7f4f2;
}
.color4 {
  background-color: #3e1300;
}

// .v-list-item {
//   width: 100%;
// }

.body {
  img {
    max-width: 500px!important;
  }
}
</style>
