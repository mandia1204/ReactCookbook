import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as recipeActions from '../../actions/recipeActions';
import RecipeForm from './RecipeForm';
import toastr from 'toastr';
import update from 'immutability-helper';

class ManageRecipePage extends React.Component {
  constructor(props,context) {
    super(props, context);

    this.state = {
      recipe: Object.assign({}, props.recipe),
      categories: [],
      errors: {}
    };

    this.saveRecipe = this.saveRecipe.bind(this);
    this.updateRecipeState = this.updateRecipeState.bind(this);
    this.onPropChange = this.onPropChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {

      if (this.props.recipe._id != nextProps.recipe._id) {
        this.setState({recipe: Object.assign({}, nextProps.recipe)});
      }
  }

  _formIsValid() {
    const recipe = this.state.recipe;
    let errors = {};
    const fields =["name","chef"]; //fields to validate

    fields.forEach(f=>{
      if(!recipe[f]){
        errors[f] = `${f} is required.`;
      }
    });

    this.setState({errors: errors});
    return Object.keys(errors).length==0;
  }

  saveRecipe(event) {
    event.preventDefault();

    if(!this._formIsValid()) return;

    this.props.actions.saveRecipe(this.state.recipe).then(() => this.redirect());
  }

  updateRecipeState(name,value){
    const recipe = this.state.recipe;
    recipe[name] = value;
    this.setState({recipe: recipe});
  }

  onPropChange(event){
    this.updateRecipeState(event.target.name,event.target.value);
  }

  redirect() {
    toastr.success('Recipe saved');
    this.context.router.push('/recipes/' + this.state.recipe.category.toLowerCase());
  }

  render() {
    return (
      <div className="jumbotron">
        <h2>Manage Recipes</h2>
        <RecipeForm errors={this.state.errors} recipe={this.state.recipe} categories={this.props.categories} onPropChange={this.onPropChange} onUpdateState={this.updateRecipeState} saveRecipe={this.saveRecipe} />
      </div>
    );
  }
}

ManageRecipePage.propTypes = {
  recipe: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  actions:PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageRecipePage.contextTypes = {
  router: PropTypes.object
};

const getRecipeById = (recipes,id) =>{
  const recipe = recipes.filter(recipe => recipe._id === id);
  if (recipe) return recipe[0];
  return null;
};

const mapStateToProps= (state, ownProps)=>{
  const recipeId = ownProps.params.id;
  const category = ownProps.location.query.page ? ownProps.location.query.page : "";

  let recipe = {name:"", chef:"", category:category, url:"", recommended:false, ingredients:[]};

  if (recipeId && state.recipes.length > 0) recipe = getRecipeById(state.recipes, recipeId);

  return { recipe: recipe, categories: state.categories };
};

const mapDispatchToProps= (dispatch)=>{
  return { actions: bindActionCreators(recipeActions,dispatch) };
};

export default connect(mapStateToProps,mapDispatchToProps)(ManageRecipePage);
