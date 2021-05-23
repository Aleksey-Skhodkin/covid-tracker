import { jhucsse, worldometers } from "../api/api";

const SET_COUNTRIES_LIST = 'SET-COUNTRIES-LIST';
const SET_SELECTED_COUNTRY = 'SET-SELECTED-COUNTRY';
const SET_COUNTRY_INFO = 'SET-COUNTRY-INFO';
const SET_COUNTRIES = 'SET-COUNTRIES';
const SET_MAP_OPTIONS = 'SET-MAP-OPTIONS';
const SET_GRAPH_DATA = 'SET-GRAPH-DATA';
const SET_CASES_TYPE = 'SET-CASES-TYPE';

const initialState = {
	countries: null,
	countriesList: ['Global'],
	selectedCountry: 'Global',
	countryInfo: null,
	casesType: 'cases',
	mapOptions: {
		center: [34.80746, -40.4796],
		zoom: 3
	},
	graphData: {
		data: null,
	}
};

export default function covidTrackerReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case SET_COUNTRIES_LIST:
			return {
				...state,
				countriesList: ['Global', ...payload.list]
			}
		case SET_SELECTED_COUNTRY:
		case SET_COUNTRY_INFO:
		case SET_COUNTRIES:
		case SET_MAP_OPTIONS:
			return { ...state, ...payload }
		case SET_GRAPH_DATA:
			return {
				...state,
				graphData: {
					data: payload.data
				}
			};
		case SET_CASES_TYPE:
			return { ...state, casesType: payload.casesType }
		default: return state;
	}
}

export const setCountriesList = list => ({ type: SET_COUNTRIES_LIST, payload: { list } })
export const setSelectedCountry = selectedCountry => ({ type: SET_SELECTED_COUNTRY, payload: { selectedCountry } })
export const setCountryInfo = countryInfo => ({ type: SET_COUNTRY_INFO, payload: { countryInfo } })
export const setCountries = countries => ({ type: SET_COUNTRIES, payload: { countries } })
export const setMapOptions = mapOptions => ({ type: SET_MAP_OPTIONS, payload: { mapOptions } })
export const setGraphData = data => ({ type: SET_GRAPH_DATA, payload: { data } })
export const setCasesType = casesType => ({ type: SET_CASES_TYPE, payload: { casesType } })

export const getGlobalData = () => async dispatch => {
	try {
		const { data } = await worldometers.getGlobalTotals();

		dispatch(setCountryInfo(data));
	} catch (error) {
		console.log(error);
	}
}

export const getDataForAllCountries = () => async dispatch => {
	try {
		const response = await worldometers.getTotalsForAllCountries();
		const countries = response.data;
		const list = countries.map(country => country.country);

		dispatch(setCountries(countries));
		dispatch(setCountriesList(list));
	} catch (error) {
		console.log(error);
	}
}

export const getDataForSpecificCountry = country => async dispatch => {
	try {
		const { data } = await worldometers.getTotalsForSpecificCountry(country);
		const mapOptions = {
			center: [data.countryInfo.lat, data.countryInfo.long],
			zoom: 6
		};

		dispatch(setCountryInfo(data));
		dispatch(setMapOptions(mapOptions))
	} catch (error) {
		console.log(error);
	}
}

export const getGlobalTimeSeriesData = (days) => async dispatch => {
	try {
		const { data } = await jhucsse.getGlobalTimeSeriesData(days);

		dispatch(setGraphData(data));
	} catch (e) {
		console.log(e);
	}
}

export const getCountryTimeSeriesData = (country, days) => async dispatch => {
	try {
		const { data } = await jhucsse.getCountryTimeSeriesData(country, days);

		dispatch(setGraphData(data.timeline));
	} catch (e) {
		console.log(e);
	}
}