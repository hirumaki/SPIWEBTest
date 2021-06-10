import Vue from "vue";
import {problems} from "./problemField/problems";
import {problemNumber} from "./problemField/problemNumber";
import {problemBody} from "./problemField/problemBody";
import {problemStatement} from "./problemField/problemStatement";
import { sectionTimer } from "./component/sectionTimer";
import { singleTimer} from "./component/singleTimer";
import { resultBody} from "./resultField/resultBody";

Vue.prototype.$count = 0;

const start = ()=>{
  const topPage = document.getElementById('top-page');
  if(topPage !== null) topPage.style.display = 'none';
  const problemField = document.getElementById('problem-field');
  if(problemField !== null) problemField.style.display = 'block';

}

const sendResult = (result:object)=>{
  console.log('sendResult');
  console.log(result);
  //console.log(mail);
}

const main = new Vue({
  el: '#problem-field',
  data:{
    answers:[['']],
    problems,
    counter:0
  },
  components:{
    'section-timer':sectionTimer,
    'single-timer':singleTimer,
    'problem-number':problemNumber,
    'problem-body':problemBody,
    'problem-statement':problemStatement,
  },
  methods:{
    nextProblem:function(answer:string[]){
      this.answers.push(answer);
      result.answers = this.answers;
      result.counter = this.counter;
      this.counter++;
      if(this.counter >= problems.length){
        const problemField = document.getElementById('problem-field');
        if(problemField !== null) problemField.style.display = 'none';
        const resultField = document.getElementById('result-field');
        if(resultField !== null) resultField.style.display = 'block';
        this.counter -= 1;
        sendResult(this.answers);
        
      }
    }
  }
});

const result = new Vue({
  el:'#result-field',
  data:{
    problems,
    counter:0,
    answers:[['']],
    linguisticResult:[['']],
    nonlinguisticResult:[['']],
    comprehensiveResult:[['']],
  },
  components:{
    'result-body':resultBody
  },
  methods:{
    showResult:function(answers:string[][]){
      this.answers = answers;
      /*for (let proNum =1;proNum <= problems.length;proNum++){
        const  = problems[proNum];

      }*/
    }
  }
});
