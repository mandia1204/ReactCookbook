import React, {PropTypes} from 'react';
import {TextField,IconButton} from 'material-ui';

const AddIngredient = props => {

  const _handleAdd = () => {
      props.onAddIngredient(ingredientInput.input.value);
      _clearText();
  };

  const _clearText = () =>{
    ingredientInput.input.value = '';
    ingredientInput.setState({hasValue:false});
  };

  let ingredientInput = '';
  const ingredientInputRef = (input) => { ingredientInput = input;};

  return(
    <div className="default-component">
      <div className="row">
        <div className="col-sm-4">
          <TextField name="ingredientText" hintText="Enter ingredient" ref={ingredientInputRef}  fullWidth={true} />
        </div>
        <div className="col-sm-3">
          <IconButton onClick={_handleAdd}  iconClassName="material-icons">add</IconButton>
        </div>
       </div>
    </div>
  );
};

AddIngredient.propTypes = {
  onAddIngredient: PropTypes.func.isRequired
};

export default AddIngredient;
