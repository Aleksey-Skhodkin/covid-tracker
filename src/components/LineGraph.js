import numeral from 'numeral';
import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import { getCountryTimeSeriesData, getGlobalTimeSeriesData } from '../store/covid-tracker-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { createChartData } from './../utils/utils';

const options = {
	legend: {
		display: false,
	},
	elements: {
		point: {
			radius: 0,
		}
	},
	// maintainAspectRatio: false,
	plugins: {
		legend: {
			display: false,
		}
	},
	scales: {
		x: {
			type: 'time',
			time: {
				unit: 'month'
			}
		},
		y: {
			ticks: {
				callback: function (value, index, values) {
					return numeral(value).format('0a')
				},
			},
		},
	},
}

export default function LineGraph() {
	const dispatch = useDispatch();
	const data = useSelector(state => state.graphData.data);
	const selectedCountry = useSelector(state => state.selectedCountry);
	const casesType = useSelector(state => state.casesType);

	const chartData = data && createChartData(data, casesType);

	useEffect(() => {
		selectedCountry === 'Global'
			? dispatch(getGlobalTimeSeriesData(150, casesType))
			: dispatch(getCountryTimeSeriesData(selectedCountry, 150));
	}, [casesType, selectedCountry])

	return (
		<div>
			<h1>New {casesType}: {selectedCountry}</h1>
			{data && <Line
				// height={200}
				options={options}
				data={{
					datasets: [{
						data: chartData,
						borderWidth: 1.5,
						backgroundColor: 'rgba(204,16,52, 0.5)',
						borderColor: `${casesType === 'recovered' ? 'green' : '#CC1034'}`
					}]
				}}
			/>}
		</div>
	);
}