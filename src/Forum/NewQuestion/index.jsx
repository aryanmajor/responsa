import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import styled from 'styled-components';
import axios from 'axios';

const NameField = styled(TextField)`
  width: 50%;
  margin: 2% 0% !important;
`;

class NewQuestion extends Component{
  constructor(props){
    super(props);
    this.state={
      values:{
        heading:'',
        question:'',
        askedBy:''
      },
      submitLoading: false,
      error: false,
      errorMessage: ''
    };
  }

  handleFormChanges(field, value){
    this.setState({
      values:{
        ...this.state.values,
        [field]: value
      }
    });
  }

  handleFormSubmission(){
    this.setState({
      submitLoading: true
    });
    const data ={...this.state.values};
    console.log(data);
    axios({
      method: 'POST',
      url: '/newQuestion',
      data
    }).then((response)=>{
      console.log(response);
      this.props.history.push('/');
    }).catch((e)=>{
      console.log(e);
      this.setState({
        submitLoading: false,
        error: true,
        errorMessage: e.message
      })
    });
  }

  render(){
    const {heading, question , askedBy}=this.state.values;
    return(
      <Container fixed style={{ height: '100%', padding: '5% 0%', textAlign: 'left' }}>
        <TextField placeholder="Enter Introduction to Question" label="Introduction"
          onChange={(event)=> this.handleFormChanges('heading', event.target.value)} value={heading} fullWidth required
        />
        <NameField label="Your Name" required value={askedBy} onChange={(event)=> this.handleFormChanges('askedBy', event.target.value)} />
        <NameField label="Question" value={question} multiline fullWidth onChange={(event)=> this.handleFormChanges('question', event.target.value)} required />
        <Button variant="contained"
          color="secondary"
          onClick={() => this.handleFormSubmission()}
          disabled={this.state.submitLoading || heading.length<5 || question.length<5 || askedBy.length===0}
          style={{ minHeight: '52px' , minWidth: '88px' }}
        >
          {this.state.submitLoading && (<CircularProgress color="secondary" />)}
          {!this.state.submitLoading && ("Submit")}
          
        </Button>
        <Snackbar
          open={this.state.error}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          message={this.state.errorMessage}
          variant="error"
          onClose={()=> {
            this.setState({
              error: false
            })
          }}
          autoHideDuration={5000}
        />
      </Container>
    )
  }
};

export default NewQuestion;