import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Button } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import NewQuestion from './NewQuestion';
import QuestionList from './QuestionList';
import QuestionDetail from './QuestionDetail';

class Forum extends Component{
  render(){
    return(
      <React.Fragment>
        <AppBar position="static" color="secondary">
        <Toolbar>
            <Typography variant="h5">
              Responsa
            </Typography>
            <span style={{ marginLeft: 'auto' }}>
              <NavLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                <Button color="inherit">
                  <DescriptionIcon  />
                  View All
                </Button>
              </NavLink>
            </span>
          </Toolbar>
        </AppBar>
        
        <Switch>
          <Route path='/new-question' component={NewQuestion} />
          <Route path='/question/:id' component={QuestionDetail} />
          <Route path='/' component={QuestionList} />
        </Switch>
      </React.Fragment>
    );
  }
};

export default Forum;