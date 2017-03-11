import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import PastasPage from './components/recipe/PastasPage';
import SaladsPage from './components/recipe/SaladsPage';
import ManagePastaPage from './components/manage/ManageRecipePage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="recipes/pastas" component={PastasPage} />
        <Route path="recipes/salads" component={SaladsPage} />
        <Route path="recipes/manage" component={ManagePastaPage} />
        <Route path="recipes/manage/:id" component={ManagePastaPage} />
    </Route>
);
