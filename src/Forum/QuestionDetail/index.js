import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import styled from 'styled-components';
import { Divider } from '@material-ui/core';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import NewAnswerModal from './NewAnswerModal';

const QuestionCard = styled(Card)`
  width: 70%;
  padding: 1%;
  margin: 5% 10%;
  div.info{
    width: 90%;
    height: 100%;
    margin-left: 10%;
  }
  div.action{
    float: left;
    margin:5% 1%;
    a:hover{
      cursor: pointer;
    }
  }
`;

const QuestionArea = styled.div`
  text-align: left;
`;

const AnswerArea = styled.div`
  padding: 0.5% 1%;
  margin-bottom: 2%;
  text-align: left;
`;

const WriteAnswerIcon = styled(QuestionAnswerIcon)`
  opacity: 0.6;
  :hover{
    cursor: pointer;
    opacity: 1;
  }
`;

class QuestionList extends Component{
  constructor(props){
    super(props);
    this.state={
      question:{

      },
      answer:{
        on: false,
        ansBy: '',
        answer: ''
      },
      submitLoading: false,
      error: false,
      errorMessage: ''
    };
  }

  fetchQuestionDetails(id){
    axios.get(`/fetchQuestion/${id}`).then((response)=>{
      this.setState({
        question: {...response.data}
      }, ()=>{
        console.log(this.state);
      });
    }).catch((err)=>{
      console.log(err);
    });
  }

  componentDidMount(){
    console.log(this.props);
    this.fetchQuestionDetails(this.props.match.params.id);
  }

  renderQuestionArea(){
    const {question}=this.state || {};
    return (
      <QuestionArea>
        <Typography variant="h4" color="textPrimary">
          {question.heading}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {`Asked by ${question.askedBy} on ${new Date(question.askedOn*1000).toDateString()}`}
        </Typography>
        <Divider variant="middle" style={{ margin: '2% 0%' }} />
        <Typography variant="subtitle1" color="textPrimary">
          {question.question}
        </Typography>
        <Typography variant="body1" color="textSecondary" component="i">
          {`${question.answers && question.answers.length} Answers`}
        </Typography>
        <Divider variant="middle" style={{ margin: '2% 0%' }} />
      </QuestionArea>
    );
  }

  renderAnswersArea(){
    const { answers } = this.state.question;
    const displayAnswers = answers && answers.map((answer)=>{
      return(
        <AnswerArea key={answer._id}>
          <Typography variant="h6" color="primary">
            {answer.ansBy}
            <Typography variant="caption" color="textSecondary" component="i" style={{ marginLeft: '2%'}}>
              {new Date(answer.ansOn*1000).toDateString()}  
            </Typography>  
          </Typography>
          <Typography color="textPrimary" component="span" style={{ marginTop: '2%' }}>
            {answer.answer}
          </Typography>
        </AnswerArea>
      );
    });
    return displayAnswers;
  }

  render(){

    
    
    return(
      <QuestionCard>
        <div className="action">
          <WriteAnswerIcon color="action" fontSize="large" onClick={()=> this.setState({ answer:{ on: true} })} />
        </div>
        <div className="info"  style={{ }}>
          {this.renderQuestionArea()}
          {this.renderAnswersArea()}
        </div>
          {this.state.answer.on && (
            <NewAnswerModal
              open
              onSubmit={() => {
              this.fetchQuestionDetails(this.props.match.params.id);
              this.setState({ answer: { on:false } });
              }}
              closeModal={()=> this.setState({ answer: { on:false } })}
              id={this.props.match.params.id}
            />
          )}
      </QuestionCard>
    )
  }
};

export default QuestionList;