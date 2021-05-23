import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://disease.sh/v3/covid-19',
});

export const worldometers = {
	getGlobalTotals() {
		return instance(`/all`);
	},
	getTotalsForAllCountries(yesterday = '', twoDaysAgo = '', sort = '', allowNull = '') {
		return instance.get('/countries', {
			params: {
				yesterday,
				twoDaysAgo,
				sort,
				allowNull
			}
		})
	},
	getTotalsForSpecificCountry(country, yesterday = '', twoDaysAgo = '', strict = true, allowNull = '') {
		return instance.get(`/countries/${country}`, {
			params: {
				country,
				yesterday,
				twoDaysAgo,
				strict,
				allowNull
			}
		})
	},
};

export const jhucsse = {
	getGlobalTimeSeriesData(lastdays = 30) {
		return instance.get(`/historical/all`, {
			params: { lastdays }
		})
	},
	getCountryTimeSeriesData(country, lastdays = 30) {
		return instance.get(`/historical/${country}`, {
			params: { lastdays }
		})
	},
};