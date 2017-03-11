import React, {PropTypes} from 'react';
import {Divider,TextField,Paper,IconButton} from 'material-ui';

const IngredientList = props => {

  const createRow = (ingredient, index) => {

    const _delete = () => {
      props.onDelete(index);
    };

    const _edit = () => {
      props.onEdit(index);
    };

    const _save = () => {
      const input = document.getElementById("edit-ingredient-"+index);
      props.onSave(index,input.value);
    };

    const _cancel = () => {
      props.onCancel();
    };

    let firstButton, secondButton;
    let input;
    const isEdit = props.editIndex==index;
    if(isEdit){
        firstButton = <IconButton onClick={_save} iconClassName="material-icons">save</IconButton>;
        secondButton = <IconButton onClick={_cancel} iconClassName="material-icons">cancel</IconButton>;
        input = (<TextField className="list-text-field" autoFocus={true} id={"edit-ingredient-"+index} name="editText" onChange={props.textChange}
                hintText="Enter ingredient name" value={props.editText} fullWidth={true} />);
    }else{
        firstButton = <IconButton onClick={_edit} iconClassName="material-icons">mode_edit</IconButton>;
        secondButton = <IconButton onClick={_delete} iconClassName="material-icons">delete</IconButton>;
        input = <span className="list-text">{ingredient.name}</span>;
    }

    return (
      <div key={index} className={`row ${isEdit? "list-item-active":""}`}>
        <div className="f-left col-md-8">
          {input}
        </div>
        <div className="f-right">
          {firstButton}
          {secondButton}
        </div>
        <div>
          <Divider />
        </div>
      </div>
    );
  };

  createRow.propTypes = {
    onDelete: PropTypes.func.isRequired, onEdit: PropTypes.func.isRequired, onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired, editIndex: PropTypes.number.isRequired, editText: PropTypes.string.isRequired,
    textChange: PropTypes.func.isRequired
  };

  return(
    <Paper zDepth={2}  className="container-fluid">
      {props.ingredients.map(createRow, this)}
    </Paper>
  );
};

IngredientList.propTypes = { ingredients:	PropTypes.array.isRequired };

export default IngredientList;
