import React, {PropTypes} from 'react';

const ChefList = props =>{
  //alert(props.chefs.length)
  return (
    <ul>
      {props.chefs.map((chef,i)=>{
        return <li key={i}>{chef.name} - {chef.lastName}</li>;
      })}
    </ul>
  );
};

ChefList.propTypes = { chefs:	PropTypes.array.isRequired };

export default ChefList;
