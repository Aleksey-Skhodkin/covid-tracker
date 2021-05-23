import React from 'react';
import styled from 'styled-components';
import LineGraph from './components/LineGraph';
import Map from './components/Map';
import Table from './components/Table';
import 'leaflet/dist/leaflet.css';
import Header from './components/Header';
import Information from './components/Information';

const AppWrapper = styled.div`
	display: flex;
	max-width: 1440px;
	margin: 0 auto;
	padding: 0 10px;

	& .table-section {
		background-color: var(--background-white);
		padding: 10px;
		border-radius: 3px;
		box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
		margin: 0 0 0 10px;
		width: 30%;
	}

	& .map-section {
		width: 70%;
	}

	@media (max-width: 950px) {
		flex-direction: column;

		& .map-section {
		width: 100%;
		}

		& .table-section {
			margin: 10px 0 0 0;
			width: 100%;
		}
	}
`;

export default function App() {
	return (
		<AppWrapper>
			<div className='map-section'>
				<Header />
				<Information />
				<Map />
			</div>
			<div className='table-section'>
				<LineGraph />
				<Table />
			</div>
		</AppWrapper>
	);
}

