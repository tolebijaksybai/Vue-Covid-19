<template>
  <v-app class="v-application">
    <!-- Navigation -->
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Dashboard</v-list-item-title>
          <!-- <v-list-item-subtitle>Tolebi Zhaksybay</v-list-item-subtitle> -->
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- Menu -->
    <v-app-bar color="accent-4" dense dark app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="headline"
        ><v-icon>mdi-virus</v-icon> COVID-19
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="country in countries"
            :key="country"
            @click="() => {}"
            link
            :to="'/country/' + country"
          >
            <v-list-item-title @click="updateCountry(country)">{{
              country
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main class="ma-2" app>
      <v-container fluid>
        <!-- Router -->
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      items: [
        { title: "Мировое резюме", icon: "mdi-earth", link: "/" },
        { title: "Страны", icon: "mdi-flag", link: "/country" },
        { title: "Новости", icon: "mdi-newspaper", link: "/" },
      ],
      drawer: false,
    };
  },
  mounted() {
    this.$store.dispatch("updateTopCountries");
  },
  methods: {
    updateCountry(country) {
      this.$store.dispatch("newCountryName", country);
    },
  },
  computed: {
    countries() {
      return this.$store.getters.topCountries;
    },
  },
};
</script>

<style >
* {
  scroll-behavior: smooth;
}

:root {
  scrollbar-color: #a45aee #1d191f !important;
  scrollbar-width: thin !important;
}

::-webkit-scrollbar {
  width: 2px;
}

::-webkit-scrollbar-track {
  background: #1d191f;
}

::-webkit-scrollbar-thumb {
  background: #a45aee;
  border-radius: 12px;
}
#app {
  color: #ffffff;
}
.v-application {
  background-color: var(--v-background-base) !important;
}
</style>
