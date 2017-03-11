import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import BasePage from './base/BasePage';
import PastasFooter from './PastasFooter';
import {bindActionCreators} from 'redux';
import * as chefActions from '../../actions/chefActions';
import { connect } from 'react-redux';
import ChefList from './base/ChefList';
import toastr from 'toastr';

class PastasPage extends React.Component {

  constructor(props,context) {
    super(props, context);
    this.loadChefs = this.loadChefs.bind(this);
  }

  handleClick(){
    const root = document.getElementById("content-here");
    const newNode = document.createElement("div");
    root.appendChild(newNode);

    ReactDOM.render(<PastasFooter text={root.childNodes.length-1 +" All prices include taxes."} />, newNode);
  }

  loadChefs(event){
    event.preventDefault();
    this.props.actions.loadChefs().then(()=> toastr.success('Chefs loaded!'));
  }

  render() {
    const mybody = "Nothing says Italy like its food, and nothing says Italian food like pasta. Pasta is integrant part of \
                  Italys food history Wherever Italians immigrated they have brought their pasta along, so much so today \
                  it can be considered a staple of international cuisine.";

    let loadChefButton = "";
    if(this.props.chefs.length==0)
      loadChefButton = <button onClick={this.loadChefs}>Load chefs</button>
    return (
      <div>
        <BasePage title="Pastas" body={mybody} page="Pastas" />
        {/*<button onClick={this.handleClick}>Add content</button>*/
         /*<div id="content-here"><span>footer here</span></div>*/}
         {loadChefButton}

         <ChefList chefs={this.props.chefs} />
      </div>
    );
  }
}

PastasPage.propTypes = {
  actions:PropTypes.object.isRequired,
  chefs: PropTypes.array.isRequired
};

const mapStateToProps= (state, ownProps)=>{
  return { chefs: state.chefs };
};
const mapDispatchToProps= (dispatch)=>{
  return { actions: bindActionCreators(chefActions,dispatch) };
};

//export default PastasPage;
export default connect(mapStateToProps,mapDispatchToProps)(PastasPage);
