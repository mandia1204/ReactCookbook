import React, {PropTypes} from 'react';
import {TextField,Checkbox} from 'material-ui';

const SearchRecipe = (props) => {

  const _handleChange = (e,value) => {
    props.onUserInput(e.currentTarget.name,value);
  };

  return(
    <div className={props.className}>
      <div className="row">
        <div className="col-sm-4"><TextField name="filterText" onChange={_handleChange} value={props.filterText} hintText="Enter recipe to search"  fullWidth={true} /></div>
        <div className="col-sm-3">
          <Checkbox name="recommended" label="Only Recommended" checked={props.recommended} onCheck={_handleChange} />
        </div>
       </div>
    </div>
  );
};

SearchRecipe.defaultProps = {
  className:'default-component'
};

SearchRecipe.propTypes = {
  filterText:PropTypes.string.isRequired,
  recommended:PropTypes.bool.isRequired,
  onUserInput:PropTypes.func.isRequired,
  className:PropTypes.string.isRequired
};

export default SearchRecipe;
