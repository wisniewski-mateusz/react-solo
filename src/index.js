import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './App.scss';
import React from 'react';
import { render } from 'react-dom';
import { App } from './App';

render(<App />, document.querySelector('#app'));
