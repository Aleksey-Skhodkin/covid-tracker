import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';
import { store } from './store/store';

const GlobalStyle = createGlobalStyle`
	:root {
		--background-grey: #e0e0e0;
		--background-white: rgb(255, 255, 255);
		--color-green: rgb(0, 200, 0);
		--color-red: rgb(200, 0, 0);
    }

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Roboto', sans-serif;
		font-size: 1rem;
	}
	
	body {
		background-color: var(--background-grey);
	}
`;

ReactDOM.render(
	<React.StrictMode>
		<>
			<GlobalStyle />
			<Provider store={store}>
				<App />
			</Provider>
		</>
	</React.StrictMode>,
	document.getElementById('root')
);
