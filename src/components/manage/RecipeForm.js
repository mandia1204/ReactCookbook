import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import {RaisedButton,FontIcon,TextField,SelectField,MenuItem,Checkbox} from 'material-ui';
import IngredientMain from './ingredient/IngredientMain';

const RecipeForm = props => {

  const _onSelectChange = (name) => {
    return (event, index, value) => {
      props.onUpdateState(name,value);
    };
  };

  const _handleChecked =(e,checked) => {
      props.onUpdateState(recommendedInput.props.name,checked);
  };

  const _handleIngredientUpdate =(ingredients) => {
      props.onUpdateState("ingredients", ingredients);
  };

  let recommendedInput = "";
  const _back_url = props.recipe.category? `/recipes/${props.recipe.category.toLowerCase()}`: '/';
  const recommendedInputRef = (input) => {recommendedInput = input;};

  return (
    <div>
      <input type="hidden" name="_id" value={props.recipe._id} />

      <TextField name="name" errorText={props.errors.name} onChange={props.onPropChange} value={props.recipe.name}
      hintText="Enter name" floatingLabelText="Name" fullWidth={true} />

      <TextField name="chef" errorText={props.errors.chef} onChange={props.onPropChange} value={props.recipe.chef}
      hintText="Enter chef" floatingLabelText="Chef" fullWidth={true} />

      <SelectField name="category" value={props.recipe.category} fullWidth={true} onChange={_onSelectChange("category")} floatingLabelText="Category">
          {props.categories.map((c,i) =>  <MenuItem key={i} value={c.name} primaryText={c.name} />)}
      </SelectField>

      <TextField name="url" onChange={props.onPropChange} value={props.recipe.url}
      hintText="Enter image url" floatingLabelText="Image URL" fullWidth={true} />

      <IngredientMain title="Ingredients" ingredients={props.recipe.ingredients} onIngredientUpdate={_handleIngredientUpdate} />

      <Checkbox name="recommended" checked={!props.recipe.recommended?false:props.recipe.recommended} ref={recommendedInputRef}
      onCheck={_handleChecked} label="Recommended?"/>

      <RaisedButton className="raised-button" label="Back" containerElement={<Link to={_back_url} />}
      primary={true} icon={<FontIcon className="material-icons">arrow_back</FontIcon>} />

      <RaisedButton className="raised-button" label="Save" onClick={props.saveRecipe}
       primary={true} icon={<FontIcon className="material-icons">save</FontIcon>} />

    </div>
  );
};

RecipeForm.propTypes = {
  recipe:	PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  saveRecipe: PropTypes.func.isRequired,
  onUpdateState: PropTypes.func.isRequired,
  onPropChange:PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default RecipeForm;
