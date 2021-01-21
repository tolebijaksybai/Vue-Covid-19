import Vue from 'vue'
import Router from 'vue-router'
import Total from '../components/Total'
import Country from '../components/Country'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Total',
			component: Total
		},
		{
			path: '/country',
			name: 'Country',
			component: Country
		},
		{
			path: '/country/:queryName',
			name: 'Country',
			component: Country,
			props: true,
			beforeEnter(to, from, next) {
				let queryName = to.params.queryName
				store.dispatch('newCountryName', queryName)
				next()
			}
		}
	]
})
