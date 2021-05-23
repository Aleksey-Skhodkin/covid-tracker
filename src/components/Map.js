import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { showDataOnMap } from '../utils/utils';

const MapWrapper = styled.div`
	height: 500px;
	background-color: white;
	padding: 10px;
	border-radius: 3px;
	margin-top: 10px;
	box-shadow: 0 0 8px -4px rgba(0,0,0,0.5);

	& .leaflet-container {
		height: 100%;
	}
`;

function SetViewOnClick({ coords, zoom }) {
	const map = useMap();
	map.setView(coords, zoom);

	return null;
}

export default function Map() {
	const countries = useSelector(state => state.countries);
	const casesType = useSelector(state => state.casesType);
	const { center, zoom } = useSelector(state => state.mapOptions);

	return (
		<MapWrapper>
			<MapContainer
				center={center}
				zoom={zoom}
				scrollWheelZoom={false}
			>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<SetViewOnClick coords={center} zoom={zoom} />
				{countries && showDataOnMap(countries, casesType)}
			</MapContainer>
		</MapWrapper>
	);
}
