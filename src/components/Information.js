import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfoBox from './InfoBox';
import styled from 'styled-components';
import { formatStatNumbers } from '../utils/utils';
import { setCasesType } from '../store/covid-tracker-reducer';
import numeral from 'numeral';

const InfoWrapper = styled.div`
	& .boxes-wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, auto));
		grid-gap: 10px;
	}

	& p {
		font-size: .8rem;
		margin-top: 5px;
	}
`;

export default function Information() {
	const dispatch = useDispatch();
	const countryInfo = useSelector(state => state.countryInfo);
	const casesType = useSelector(state => state.casesType);

	return (
		countryInfo &&
		<InfoWrapper>
			<div className='boxes-wrapper'>
				<InfoBox
					isRed
					active={casesType === 'cases'}
					onClick={e => dispatch(setCasesType('cases'))}
					title="Covid Cases"
					cases={formatStatNumbers(countryInfo.todayCases)}
					total={numeral(countryInfo.cases).format('0.0a')}
				/>
				<InfoBox
					active={casesType === 'recovered'}
					onClick={e => dispatch(setCasesType('recovered'))}
					title="Recovered"
					cases={formatStatNumbers(countryInfo.todayRecovered)}
					total={numeral(countryInfo.recovered).format('0.0a')}
				/>
				<InfoBox
					isRed
					active={casesType === 'deaths'}
					onClick={e => dispatch(setCasesType('deaths'))}
					title="Deaths"
					cases={formatStatNumbers(countryInfo.todayDeaths)}
					total={numeral(countryInfo.deaths).format('0.0a')}
				/>
			</div>
			<p>*Tap on one of boxes above to see the corresponding statistics </p>
		</InfoWrapper>
	);
}