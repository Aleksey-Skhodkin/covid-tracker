import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';
import styled from 'styled-components';

const PopupContent = styled.div`
	& .flag{
		width: 100%;
		& img{
			width: 100%;
			border-radius: 5px;
		}
	}

	& .name{
		font-size: .8rem;
		font-weight: bold;
		color: #555;
	}

	& .cases, .recovered, .deaths{
		font-size: .8rem;
		margin: 5px 0;
	}
`;

const casesTypeColors = {
	cases: {
		rgb: 'rgb(204,16,52)',
		multiplier: 300,
	},
	recovered: {
		rgb: 'rgb(125,215,29)',
		multiplier: 400,
	},
	deaths: {
		rgb: 'rgb(255, 0, 0)',
		multiplier: 2000,
	},
};

export function sortData(data) {
	return [...data].sort((a, b) => b.cases - a.cases)
}

export function formatStatNumbers(stat) {
	return stat ? `+${numeral(stat).format('0.0a')}` : '+0';
}

export function createChartData(data, casesType = 'cases') {
	const chartData = [];
	let lastDataPoint;

	for (let date in data[casesType]) {
		if (lastDataPoint) {
			const newDataPoint = {
				x: date,
				y: data[casesType][date] - lastDataPoint
			};
			chartData.push(newDataPoint);
		}
		lastDataPoint = data[casesType][date];
	}

	return chartData;
}

// Draw circles on the map
export function showDataOnMap(countries, casesType) {
	return countries.map(country => (
		< Circle
			key={country.country}
			center={[country.countryInfo.lat, country.countryInfo.long]}
			pathOptions={{
				color: casesTypeColors[casesType].rgb,
				fillColor: casesTypeColors[casesType].rgb,
				weight: 1,
				fillOpacity: 0.3,
			}}
			radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
		>
			<Popup>
				<PopupContent>
					<div className='flag'>
						<img src={country.countryInfo.flag} alt="flag" />
					</div>
					<div className='name'>{country.country}</div>
					<div className='cases'>Cases: {numeral(country.cases).format('0.0a')}</div>
					<div className='recovered'>Recovered: {numeral(country.recovered).format('0.0a')}</div>
					<div className='deaths'>Deaths: {numeral(country.deaths).format('0.0a')}</div>
				</PopupContent>
			</Popup>
		</Circle >
	))
}