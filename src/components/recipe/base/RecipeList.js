import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import {IconButton,Paper} from 'material-ui';

const RecipeList = props => {
  const createRow = (recipe) => {

    if(
        recipe.name.toLowerCase().indexOf(props.filterText.toLowerCase())==-1 ||
        (props.recommended ==true && recipe.recommended !== props.recommended)
      )
        return null;

    const onDelete = () => {
      props.deleteRecipe(recipe._id);
    };

    const edit_url = `/recipes/manage/${recipe._id}`;
    const recommended = recipe.recommended?<i className="material-icons">thumb_up</i>:"";
    return (
      <tr key={recipe._id}>
        <td>
        <Paper className="paper-dish-cell" zDepth={5}>
            <img className="dish-img" src={recipe.url} />
        </Paper>
        </td>
        <td>{recipe.name} {recommended}</td>
        <td>{recipe.chef}</td>
        <td>{recipe.category}</td>
        <td>
          <div className="icon-bar">
            <IconButton containerElement={<Link to={edit_url}/>} className="icon-button" iconClassName="material-icons"> mode_edit</IconButton>
            <IconButton onClick={onDelete} className="icon-button" iconClassName="material-icons"> delete </IconButton>
          </div>
        </td>
      </tr>
    );
  };

  createRow.propTypes = {
    deleteRecipe: PropTypes.func.isRequired, filterText: PropTypes.string.isRequired, recommended: PropTypes.bool.isRequired
  };

  return (
    <div>
      <table className="table table-striped table-hover vertical-align">
        <thead>
          <tr>
            <th className ="col-md-2">&nbsp;</th>
            <th className ="col-md-4">Recipe</th>
            <th className ="col-md-3">Chef</th>
            <th className ="col-md-2">Category</th>
            <th className ="col-md-1"></th>
          </tr>
        </thead>
        <tbody>
            {props.recipes.map(createRow, this)}
        </tbody>
      </table>
    </div>
  );
};

RecipeList.propTypes = {
  recipes:	PropTypes.array.isRequired, deleteRecipe: PropTypes.func.isRequired
};

export default RecipeList;
