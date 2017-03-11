import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RecipeList from './RecipeList';
import * as recipeActions from '../../../actions/recipeActions';
import { Link } from 'react-router';
import toastr from 'toastr';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import SearchRecipe from './SearchRecipe';
import ConfirmDialog from '../../common/controls/ConfirmDialog';

class BasePage extends React.Component {
  constructor(props,context) {
    super(props, context);

    this.state = {
      filterText: '',
      recommended: false,
      openConfirmDialog: false
    };

    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.showDeleteDialog = this.showDeleteDialog.bind(this);
    this.confirmDeleteStateChange= this.confirmDeleteStateChange.bind(this);
  }

  deleteRecipe() {
    const recipeId = document.getElementById('hdn-recipe-id').value;
    this.props.actions.deleteRecipe(recipeId).then(() => toastr.success('Recipe deleted'));
    this.handleUserInput('openConfirmDialog',false);
    document.getElementById('hdn-recipe-id').value ='';
  }

  showDeleteDialog(recipeId){
    document.getElementById('hdn-recipe-id').value = recipeId;
    this.handleUserInput('openConfirmDialog',true);
  }

  handleUserInput(name,value){
    this.setState({[name]:value});
  }

  confirmDeleteStateChange(value){
    this.handleUserInput('openConfirmDialog', value);
  }

  render() {
    const add_url = `/recipes/manage?page=${this.props.page}`;
    return (
      <div>
        <h1>{this.props.title}</h1>
        <p>{this.props.body}</p>

        <SearchRecipe filterText={this.state.filterText} recommended={this.state.recommended} onUserInput={this.handleUserInput}/>
        <FloatingActionButton mini={true} containerElement={<Link to={add_url} />}>
          <ContentAdd />
        </FloatingActionButton>

        <RecipeList recipes={this.props.recipes} filterText={this.state.filterText} recommended={this.state.recommended} deleteRecipe={this.showDeleteDialog} />
        <ConfirmDialog onOpenStateChange={this.confirmDeleteStateChange} bodyText="Are you sure to delete the Recipe?"
          title="Delete Recipe" isOpenState={this.state.openConfirmDialog} onSubmit={this.deleteRecipe} />
        <input type="hidden" id="hdn-recipe-id" />
      </div>
    );
  }
}

BasePage.propTypes = {
  actions:PropTypes.object.isRequired, recipes: PropTypes.array.isRequired, title: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired, body: PropTypes.string.isRequired
};

const mapStateToProps= (state, ownProps)=>{
  return { recipes: state.recipes.filter(recipe=> recipe.category===ownProps.page) };
};

const mapDispatchToProps= (dispatch)=>{
  return { actions: bindActionCreators(recipeActions,dispatch) };
};

export default connect(mapStateToProps,mapDispatchToProps)(BasePage);
