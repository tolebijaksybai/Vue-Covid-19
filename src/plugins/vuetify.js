import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

export default new Vuetify({
	icons: {
		iconfont: 'mdi'
	},
	theme: {
		options: {
			customProperties: true,
		},
		themes: {
			dark: {
				background: '#292930',
			},
		},
		dark: true,
	},
})