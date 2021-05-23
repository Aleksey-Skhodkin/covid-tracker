import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
	position: relative;
	background-color: var(--background-white);
	border-radius: 3px;
	box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
	cursor: pointer;
	transition: transform ease-out 0.25s;
	overflow: hidden;

	&:hover {
		transform: scale(1.05);
	}

	& .title, .total{
		font-size: .9rem;
		font-weight: 400;
		color: grey;
	}

	& .cases {
		font-size: 1.2rem;
		color: ${props => props.isRed ? 'var(--color-red)' : 'var(--color-green)'};
	}

	& .box {
		margin: 10px 10px;
	}

	& .label {
		width: 30px;
		height: 30px;
		background-color: ${props => {
		if (props.active) {
			return props.isRed ? 'var(--color-red)' : 'var(--color-green)'
		} else return 'transparent'
	}};
		position: absolute;
		top: 0;
		right: 0%;
		transform-origin: 50% 50%;
		transform: translate(50%, -50%) rotate(45deg);
	}
`;

export default function InfoBox({ title, cases, total, active, isRed, ...props }) {
	return (
		<Box onClick={props.onClick} active={active} isRed={isRed}>
			<h1 className='title box'>{title}</h1>
			<h2 className='cases box'>{cases}</h2>
			<h2 className='total box'>{total} Total</h2>
			<div className='label'></div>
		</Box>
	);
}
