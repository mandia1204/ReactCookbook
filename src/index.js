/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import {loadRecipes} from './actions/recipeActions';
import {loadCategories} from './actions/categoryActions';
import {loadChefs} from './actions/chefActions';
import './styles/styles.scss';

const initialState = {
  recipes:[],
  categories:[],
  chefs:[]
};

const store = configureStore(initialState);

store.dispatch(loadRecipes());
store.dispatch(loadCategories());
store.dispatch(loadChefs());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  ,
  document.getElementById('app')
);
