import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

ReactDOM.render(
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>,
  document.getElementById('root')
);