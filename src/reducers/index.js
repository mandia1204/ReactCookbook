import {combineReducers} from 'redux';
import recipes from './recipeReducer';
import categories from './categoryReducer';
import chefs from './chefReducer';

const rootReducer = combineReducers({
  recipes,
  categories,
  chefs
});

export default rootReducer;
