import React, {PropTypes} from 'react';

const PastasFooter = (props) =>{
  const _handleClick = (e) => {
    e.preventDefault();
    alert(spanInput.innerText);
  };

  let spanInput = '';
  const spanInputRef = (input) => { spanInput = input;};

  return (
    <div>
      <span ref={spanInputRef}>{props.text}</span>
      <button onClick={_handleClick}>Show me</button>
    </div>
  );
};

PastasFooter.propTypes = { text: PropTypes.string.isRequired };

export default PastasFooter;
