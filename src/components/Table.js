import numeral from 'numeral';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { sortData } from '../utils/utils';

const TableWrapper = styled.div`
	overflow: scroll;
	height: 400px;
	color: #6a5d5d;

	& h1 {
		margin-bottom: 10px;
	}
	
	& .cases {
		font-weight: bold;
	}

	& table {
		width: 100%;
	}

	& tr {
		display: flex;
		justify-content: space-between;

		&:nth-of-type(odd) {
			background-color: var(--background-grey);
		}
	}

	& td {
		padding: 0.5rem;
	}
`;

export default function Table() {
	const countries = useSelector(state => state.countries);

	const sortedCountries = countries && sortData(countries);

	return (
		<TableWrapper>
			<h1>Coronavirus Cases by Country:</h1>
			<table>
				<tbody>
					{
						countries && sortedCountries.map(({ country, cases }) => (
							<tr key={country}>
								<td>{country}</td>
								<td className='cases'>{numeral(cases).format('0,0')}</td>
							</tr>
						))
					}
				</tbody>
			</table>
		</TableWrapper>
	);
}