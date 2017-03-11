import React, {PropTypes} from 'react';
import IngredientList from './IngredientList';
import AddIngredient from './AddIngredient';
import update from 'immutability-helper';

class IngredientMain extends React.Component {

  constructor(props,context) {
    super(props, context);

    this.deleteIngredient = this.deleteIngredient.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.editIngredient = this.editIngredient.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.saveIngredient = this.saveIngredient.bind(this);
    this.clearState = this.clearState.bind(this);
    this.state = { editIndex: -1, editText:'' };
  }

  addIngredient(ingredient){
    const newIngredients = this.props.ingredients.concat({name:ingredient});
    this.props.onIngredientUpdate(newIngredients);
  }

  deleteIngredient(index){
    const newIngredients = update(this.props.ingredients, {$splice: [[index, 1]]});
    this.props.onIngredientUpdate(newIngredients);
    this.clearState();
  }

  editIngredient(index){
    this.setState({editIndex:index, editText: this.props.ingredients[index].name});
  }

  saveIngredient(index, value){
    const updIngredient = Object.assign({},this.props.ingredients[index], {name:value});
    const newIngredients = update(this.props.ingredients, {$splice: [[index, 1, updIngredient]]});
    this.props.onIngredientUpdate(newIngredients);
    this.clearState();
  }

  inputChange(e){
    this.setState({[e.target.name]:e.target.value});
  }

  clearState(){
    this.setState({ editIndex:-1, editText: '' });
  }

  render(){
    return(
      <div className={this.props.className}>
        <h3>{this.props.title}({this.props.ingredients.length})</h3>
        <AddIngredient onAddIngredient={this.addIngredient} />
        <IngredientList textChange={this.inputChange} editIndex={this.state.editIndex} editText={this.state.editText}
        onEdit={this.editIngredient} ingredients={this.props.ingredients} onCancel={this.clearState} onSave={this.saveIngredient} onDelete={this.deleteIngredient} />
      </div>
    );
  }
}

IngredientMain.defaultProps = {
  ingredients: [],
  className:'default-component'
};

IngredientMain.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
  onIngredientUpdate: PropTypes.func.isRequired
};

export default IngredientMain;
