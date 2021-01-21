<template>
  <main class="pa-2">
    <section>
      <h1 class="display-1 mb-5 text-center">Мировой сводный статус</h1>
      <v-row align="center" justify="center">
        <Card
          v-for="card in cards"
          :key="card.bgColor"
          :cardTitle="card.title"
          :bgColor="card.bgColor"
          :cardAmount="card.amount"
          :cardAmountNew="card.amountNew"
          :cardIcon="card.icon"
        />
      </v-row>
    </section>
    <section>
      <h2 class="display-1 ma-5 text-center">Визуальные эффекты</h2>
      <v-row align="center" justify="center">
        <LineChart
          class="ma-4"
          v-for="visual in visuals"
          :key="visual.id"
          :chartData="visual.chartData"
          :options="visual.option"
        />
      </v-row>
    </section>
  </main>
</template>

<script>
import Card from "./StatCard";
import LineChart from "./lineChart";

export default {
  name: "Total",
  data() {
    return {
      cards: [
        {
          title: "tota cases",
          bgColor: "primary lighten-2",
          amount: 1000,
          amountNew: 200,
          icon: "mdi-alert-box",
        },
        {
          title: "tota cases",
          bgColor: "red accent-2",
          amount: 1000,
          amountNew: 200,
          icon: "mdi-emoticon-dead",
        },
        {
          title: "tota cases",
          bgColor: "teal lighten-1",
          amount: 1000,
          amountNew: 200,
          icon: "mdi-hospital-box",
        },
      ],
      visuals: [
        {
          id: 1,
          chartData: null,
          options: { responsive: true, maintainAspectRatio: false },
        },
      ],
      continents: null,
      allData: null,
    };
  },
  components: {
    Card,
    LineChart,
  },
  mounted() {
    this.axios
      .get("https://corona.lmao.ninja/v2/continents")
      .then((response) => {
        this.continents = response;
        this.updateStats();
      })
      .catch((error) => {
        console.log(error);
      });

    this.axios
      .get("https://corona.lmao.ninja/v2/historical/all")
      .then((response) => {
        this.allData = response;
        this.updateVisuals();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    updateStats() {
      let data = this.continents.data;
      let cases = 0;
      let todayCases = 0;
      let deaths = 0;
      let todayDeaths = 0;
      let recoveries = 0;
      let todayRecovered = 0;

      for (let elem of data) {
        cases += elem.cases;
        todayCases += elem.todayCases;
        deaths += elem.deaths;
        todayDeaths += elem.todayDeaths;
        recoveries += elem.recovered;
        todayRecovered += elem.todayRecovered;
      }

      this.cards[0].amount += cases;
      this.cards[0].amountNew += todayCases;
      this.cards[1].amount += deaths;
      this.cards[1].amountNew += todayDeaths;
      this.cards[2].amount += recoveries;
      this.cards[2].amountNew += todayRecovered;
    },

    updateVisuals() {
      let data = this.allData.data;
      let cases = data.cases;
      let deaths = data.deaths;
      let recoveries = data.recovered;

      let labels = [];
      let casesPerDay = [];
      let deathsPerDay = [];
      let recoveriesPerDay = [];

      for (let key in cases) {
        labels.push(key);
        casesPerDay.push(cases[key]);
        deathsPerDay.push(deaths[key]);
        recoveriesPerDay.push(recoveries[key]);
      }

      console.log(labels);
      console.log(casesPerDay);

      this.visuals[0].chartData = {
        labels: labels,
        datasets: [
          {
            label: "Total cases",
            backgroundColor: "#6aaaff",
            data: casesPerDay,
          },
        ],
      };

      this.visuals.push({
        id: 2,
        chartData: {
          labels: labels,
          datasets: [
            {
              label: "Deaths",
              backgroundColor: "#ff5252",
              data: deathsPerDay,
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });

      this.visuals.push({
        id: 3,
        chartData: {
          labels: labels,
          datasets: [
            {
              label: "recoveries",
              backgroundColor: "#26a69a",
              data: recoveriesPerDay,
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });

      let lastDayCases =
        casesPerDay[casesPerDay.length - 1] -
        casesPerDay[casesPerDay.length - 2];
      let lastDayDeaths =
        deathsPerDay[deathsPerDay.length - 1] -
        deathsPerDay[deathsPerDay.length - 2];
      let lastDayRecoveries =
        recoveriesPerDay[recoveriesPerDay.length - 1] -
        recoveriesPerDay[recoveriesPerDay.length - 2];

      this.cards[0].amountNew += lastDayCases;
      this.cards[1].amountNew += lastDayDeaths;
      this.cards[2].amountNew += lastDayRecoveries;
    },
  },
};
</script>

<style scoped>
.small {
  width: 100px;
  height: 100%;
  min-width: 400px;
  margin: auto;
}
</style>
