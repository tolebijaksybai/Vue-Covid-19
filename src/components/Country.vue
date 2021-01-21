  <template>
  <main class="pa-2">
    <section>
      <h1 class="display-1 mb-5 text-center">{{ queryName }}</h1>
      <v-row align="center" justify="center">
        <Card
          v-for="card in countryDataCards"
          :key="card.title"
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
          v-for="visual in countryDataVisuals"
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
  name: "Country",
  data() {
    return {
      cards: [],
      visuals: [],
    };
  },
  props: ["queryName"],
  components: {
    Card,
    LineChart,
  },
  computed: {
    countryDataCards() {
      let countryData = this.$store.getters.country;
      let cards = [];

      cards.push({
        title: "всего случаев",
        bgColor: "primary lighten-2",
        amount: countryData.cases,
        amountNew: 0,
        icon: "mdi-alert-box",
      });
      cards.push({
        title: "летальные исходы",
        bgColor: "red accent-2",
        amount: countryData.deaths,
        amountNew: 0,
        icon: "mdi-emoticon-dead",
      });
      cards.push({
        title: "восстановление",
        bgColor: "teal lighten-1",
        amount: countryData.recoveries,
        amountNew: 0,
        icon: "mdi-hospital-box",
      });

      return cards;
    },
    countryDataVisuals() {
      let countryData = this.$store.getters.country;
      let visuals = [];

      visuals.push({
        id: 1,
        chartData: {
          labels: countryData.visualLabels,
          datasets: [
            {
              label: "Всего случаев",
              backgroundColor: "#6aaaff",
              data: countryData.visualData.cases,
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });

      visuals.push({
        id: 2,
        chartData: {
          labels: countryData.visualLabels,
          datasets: [
            {
              label: "Летальные исходы",
              backgroundColor: "#ff5252",
              data: countryData.visualData.deaths,
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });

      visuals.push({
        id: 3,
        chartData: {
          labels: countryData.visualLabels,
          datasets: [
            {
              label: "Возврат",
              backgroundColor: "#26a69a",
              data: countryData.visualData.recoveries,
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });

      return visuals;
    },
  },
};
</script>

<style scoped>
</style>
