import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Canvas from './canvas';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const sty = {
	"num":30,
	"color":"rgba(233,200,200,.5)",
	"sped":5,
	"dis":100
}

ReactDOM.render(<Canvas store={sty}/>, document.getElementById('root'));
registerServiceWorker();
