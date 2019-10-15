import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'  ;
import DisplayQues from './DisplayQues';
import axios from 'axios';

class QuestionList extends Component{
  constructor(props){
    super(props);
    this.state={
      list:[]
    };
  }

  componentDidMount(){
    axios.get('/allQuestions').then((response)=>{
      this.setState({
        list: response.data
      })
    }).catch((err)=>{
      console.log(err);
    });
  }

  render(){
    const {list}= this.state || [];
    let questionList=(<h2>Empty</h2>);
    if (list.length>0){
      questionList = list.map((question)=>{
          return(
            <DisplayQues
              key={question._id}
              title={question.heading}
              askedBy={question.askedBy}
              question={question.question}
              askedOn={new Date(question.askedOn*1000).toDateString()}
              numOfAns={question.answers.length}
              onClick={()=> this.props.history.push(`/question/${question._id}`)}
            />
          )
      });
    }
    return(
      <Container fixed>
        {questionList}
        <Link to={'/new-question'}>
          <Fab aria-label="add" color="secondary" style={{ position: 'fixed', bottom: '3%', left: '75%' }}>
            <AddIcon />
          </Fab>
        </Link>
      </Container>
    )
  }
};

export default QuestionList;