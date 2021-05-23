import React, { useEffect } from 'react';
import covidLogo from './../images/covid-logo.png';
import virusImg from './../images/virus.png';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getDataForAllCountries, getDataForSpecificCountry, getGlobalData, setSelectedCountry } from '../store/covid-tracker-reducer';

const HeaderWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	margin: 10px 0 10px 0;

	& .logo {
		display: flex;
		align-items: center;
		
		& img {
			height: 70px;
			padding: 10px 0;
		}

		& h1 {
			font-size: 1.5rem;
			text-transform: uppercase;
			color: rgb(200, 0, 0);
		}
	}

	& .select {
		padding: 5px;
		width: 200px;
		background-color: var(--background-grey);
		border-radius: 5px;
		border: 1px solid black;

		&:focus {
			outline-color: #2b2b9b;
		}
	}
`;

export default function Header() {
	const dispatch = useDispatch();
	const countriesList = useSelector(state => state.countriesList);
	const selectedCountry = useSelector(state => state.selectedCountry);

	useEffect(() => {
		dispatch(getDataForAllCountries());
	}, [])

	useEffect(() => {
		if (selectedCountry === 'Global') dispatch(getGlobalData())
		else dispatch(getDataForSpecificCountry(selectedCountry))
	}, [selectedCountry])


	return (
		<HeaderWrapper>
			<div className='logo'>
				<img src={covidLogo} alt="covid-virus-img" />
				<h1>Tracker</h1>
				<img src={virusImg} alt="virus-img" />
			</div>
			<form className='form'>
				<select
					className='select'
					value={selectedCountry}
					onChange={e => dispatch(setSelectedCountry(e.target.value))}
				>
					{
						countriesList.map(country => <option key={country}>{country}</option>)
					}
				</select>
			</form>
		</HeaderWrapper>
	);
}