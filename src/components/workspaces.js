import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import moment from 'moment';
import truncate from 'lodash.truncate';

class Feature extends Component {
  componentWillMount() {
    this.props.fetchWorkspacesData();
  }

  addNewWorkspace(){
    alert("This feature is not yet implemented.");
  }

  sortTableData(event){
    this.props.SortWorkspacesTable(event.target.value);
  }

  renderWorkSpacesOptions(){
    return (
       <div className="container">
           <div className="row">
                <h1 className="title">
                    WORKSPACES
                </h1>
            </div>
              <div className="row">
                  <div className="selectDivContainer">
                  <h1>SORT BY</h1>
                  <div className="selectdiv">
                  <select value={this.props.selvalue} 
                          onChange={this.sortTableData.bind(this)} >
                      <option value="favorites">FAVORITES</option>
                      <option value="name">NAME</option>
                      <option value="owner">OWNER</option>
                      <option value="modified">MODIFIED</option>
                  </select>
                  </div>
                  </div>
                  <div className="rightIcon">
                      <button type="button"
                              onClick={this.addNewWorkspace.bind(this)}
                              className="button">
                          <img src="/src/assets/ico_newworkspace.png" alt="new workspace" width={"30px"}/>                            
                      </button>
                  </div>
              </div>
             </div> 
          );
  }

  renderPermissions(permission) {
    if(permission)
      return 'PUBLIC';
    else
      return 'PRIVATE';
  }

  renderFavorite(favorite) {
    if(favorite)  
    {
        return (
                <object type="image/svg+xml" data="/src/assets/svgs/ico_favorite.svg">
                  <img src="/src/assets/ico_favorite.png" alt="fav"/>
                </object>
        )
    }  
    else {
       return (
                <object type="image/svg+xml" data="/src/assets/svgs/ico_unfavorite.svg">
                   <img src="/src/assets/ico_unfavorite.png" alt="Unfav"/>
                </object>
        )
    }
  }

  renderTableRows(){
    let wsData = this.props.workspaces_data;
    let retData = '';

    if(typeof wsData !== 'undefined')
    {
      return wsData.map((rowData) => {
            return (
                   <tr key={rowData.id}>
                    <td> 
                      <div className="workspace_name">
                          <div className="workSpaceIcon">
                            {this.renderFavorite(rowData.favorite)}
                          </div>
                          <div className="workspaceText">
                          <h1> {truncate(rowData.name, {'length': 32, 'separator': ' '})} </h1>
                          <p>Owner: {rowData.workspace_owner.first_name +" "+ rowData.workspace_owner.last_name} </p>
                          </div>
                      </div>
                    </td>
                    <td className="alignCenter">{this.renderPermissions(rowData.public)}</td>
                    <td>{moment(rowData.created_at).format('M/DD/YY')}</td>
                  </tr>
                );
      });
    }
  }

  render() {
      return (
          <div>
         
            {this.renderWorkSpacesOptions()}
              <table width={"100%"} className="workSpaceTable">
              <thead>
                <tr>
                  <th> WORKSPACE NAME</th>
                  <th className="alignCenter"> PERMISSION</th>
                  <th> MODIFIED</th>
                </tr>
              </thead>
              <tbody>
                {this.renderTableRows()}
              </tbody>
            </table>        
        </div>
      );
  }
}

function mapStateToProps(state) {
  return { workspaces_data: state.workspaces.data };
}

export default connect(mapStateToProps, actions)(Feature);
