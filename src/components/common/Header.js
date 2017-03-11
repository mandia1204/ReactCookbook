import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';

class Header extends React.Component {

 componentDidMount(){
   $("#main-menu li a").on("click", (event) => {
     $("#main-menu").find(".active").removeClass("active");
     $(event.currentTarget).parent().addClass("active");
   });
 }

  render (){
    return(
      <div className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="javascript:void(0)">Cookbook 2.0</a>
          </div>
          <div className="navbar-collapse collapse navbar-responsive-collapse">
            <ul id="main-menu" className="nav navbar-nav">
              <li><IndexLink to="/">Home</IndexLink></li>
              <li><Link to="/recipes/pastas">Pastas</Link></li>
              <li><Link to="/recipes/salads">Salads</Link></li>
              <li><Link to="/recipes/manage">Manage Recipes</Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default Header;
