<template>
  <v-card
    max-width="300"
    class="summary-card ma-3 pt-6"
    :class="bgColor"
    elevation="2"
  >
    <div class="icon-wrapper">
      <v-icon>{{ cardIcon }}</v-icon>
    </div>
    <v-card-title class="headline text-bold">
      <span class="count" :title="cardAmountNew + ' last day'">
        {{ cardAmount }}
      </span>
    </v-card-title>

    <v-card-subtitle class="text-center text-bold">
      {{ cardTitle }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: "Country",
  data() {
    return {};
  },
  props: {
    bgColor: String,
    cardIcon: String,
    cardTitle: String,
    cardAmount: Number,
    cardAmountNew: Number,
  },
};
</script>

<style scoped>
.text-bold {
  font-weight: 600;
}
.icon-wrapper > .v-icon {
  width: 100%;
  margin: auto;
  font-size: 2rem;
}

.summary-card {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
}
.summary-card .headline > .count {
  width: 100%;
  text-align: center;
}
</style>
