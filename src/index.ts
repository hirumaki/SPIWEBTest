import Vue from "vue";
import axios from "axios";
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
  const serverUrl = 'http://triple-income.jp/test/sendmail.php';
  console.log(serverUrl);
  console.log('Ajaxします');
  ajaxGet(serverUrl);
  console.log('Ajaxしました');
  //console.log(mail);
}

const ajaxGet = (serverUrl:string) =>{
  console.log('ajax start');
  var request = new XMLHttpRequest();
request.open("get", serverUrl, true);
request.onload = function (event) {
  if (request.readyState === 4) {
    if (request.status === 200) {
      console.log(request.statusText); // => "OK"
    } else {
      console.log(request.statusText); // => Error Message
    }
  }
};
request.onerror = function (event) {
  console.log(event.type); // => "error"
};
request.send(null);
}

//Vue.component('single-timer',singleTimer);
/*problemStatementクラスに下記コードを追加して上を起動
       <single-timer
        :limit='problem.limit'
        :counter='counter'
        @nextproblem='nextProblem'
        ></single-timer>
*/

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
