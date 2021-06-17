import Vue from "vue";
import { imitationSpiWeb1 } from "./problemSets/imitationSpiWeb1";
import { WhiteAcademyPractice1} from "./problemSets/WhiteAcademyPractice1";
import { problemNumber} from "./problemField/problemNumber";
import { problemBody } from "./problemField/problemBody";
import { problemStatement } from "./problemField/problemStatement";
import { sectionTimer } from "./component/sectionTimer";
import { singleTimer } from "./component/singleTimer";
import { setTimer } from "./component/setTimer";
import { resultBody } from "./resultField/resultBody";
import { Problem } from "./problem";

Vue.prototype.$count = 0;
const problems = imitationSpiWeb1; 

const startButton = document.getElementById('start-button');
if(startButton !== null) startButton.onclick = ()=>{
  const topPage = document.getElementById('top-page');
  if(topPage !== null) topPage.style.display = 'none';
  const problemField = document.getElementById('problem-field');
  if(problemField !== null) problemField.style.display = 'block';
  const main = new Vue({
    el: '#problem-field',
    data:{
      answers:[['']],
      problems,
      counter:0//問題番号のカウンター
    },
    components:{
      'section-timer':sectionTimer,
      'problem-number':problemNumber,
      'problem-body':problemBody,
      'problem-statement':problemStatement,
    },
    methods:{
      nextProblem:function(answer:string[]){
        this.answers.push(answer);
        result.answers = this.answers;
        result.counter = this.counter;
        if(this.counter === problems.length-2){//counterを動かさないので、vue.jsの描画が止まる
          const problemField = document.getElementById('problem-field');
          if(problemField !== null) problemField.style.display = 'none';
          const resultField = document.getElementById('result-field');
          if(resultField !== null) resultField.style.display = 'block';
          sendResult(this.answers);
          //sendResult(3);
        }
        this.counter++;
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
}

const sendResult = (answers:string[][])=>{
  console.log('sendResult');
  let grades = 0;
  let fullScore = 0;
  answers.forEach((answer,index) => {
    if(index !== 0){
      const problem = problems[index-1] as Problem;
      answer.forEach((ans,id)=>{
          if (ans === problem.solution[id] && problem.solution[id] !== ''){ 
            grades+=problem.points[index];
          }
      fullScore += problem.points[index];
      });
    }
  }); 

  const serverUrl = `http://triple-income.jp/web_test/sendmail.php?score=${grades}`;
  const date = new Date();
  console.log(`${date.getTime}:発火しました。`)
  //ajaxGet(serverUrl);
}

const ajaxGet = (serverUrl:string) =>{
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

Vue.component('single-timer',singleTimer);
Vue.component('set-timer',setTimer);

