import Vue from "vue";
import axios from "axios";
import fs from "fs";
import { problemNumber} from "./problemField/problemNumber";
import { problemBody } from "./problemField/problemBody";
import { problemStatement } from "./problemField/problemStatement";
import { sectionTimer } from "./component/sectionTimer";
import { startScreen} from "./component/startScreen";
import { singleTimer } from "./component/singleTimer";
import { setTimer } from "./component/setTimer";
import { resultBody } from "./resultField/resultBody";
import { Problem } from "./problem";
import { createTest } from "./problem";

Vue.prototype.$count = 0;
let problems:Problem[]; 
let candidateStatus:{name:string,mail:string,test:string};

const startView = new Vue({
  el:'#top-page',
  components:{
    'start-screen':startScreen
  },
  methods:{
    registerCandidate: async function(candidateData:{name:string,mail:string,test:string}){
      candidateStatus = candidateData;
      const url = `../TestJsons/${candidateData.test}.json`;
      console.log(`Load:${url}`)
      await axios.get(url)
        .then((request)=>{
          console.log('loading...')
          console.log(request.data.name);
          problems = createTest(request.data.problems);
          startMain(problems);
        })
        .catch((error)=>{
          console.log(error);
        });
    }
  }
})

const startButton = document.getElementById('start-button');
if(startButton !== null) startButton.onclick = ()=>{
  const topPage = document.getElementById('top-page');
  if(topPage !== null) topPage.style.display = 'none';
  const problemField = document.getElementById('problem-field');
  if(problemField !== null) problemField.style.display = 'block';
}

const startMain = (problems:Problem[])=>{
  const main = new Vue({
    el: '#problem-field',
    data:{
      score:0,
      fullScore:0,
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
      nextProblem:function(resultscore:{score:number,fullScore:number}){
        this.score += resultscore.score;
        this.fullScore += resultscore.fullScore;
        console.log(`this.score:${this.score}`);
        if(this.counter === problems.length-1){//counterを動かさないので、vue.jsの描画が止まる
          const problemField = document.getElementById('problem-field');
          if(problemField !== null) problemField.style.display = 'none';
          const resultField = document.getElementById('result-field');
          if(resultField !== null) resultField.style.display = 'block';
          showResult({score:this.score,fullScore:this.fullScore});
          sendResult({score:this.score,fullScore:this.fullScore});
        }
        this.counter++;
      },
    }
  });
}

const showResult = (resultscore:{score:number,fullScore:number})=>{
  const result = new Vue({
    el:'#result-field',
    data:{
      problems,
      counter:0,
      score:resultscore.score,
      fullScore:resultscore.fullScore,
      candidateName:candidateStatus.name
    },
    components:{
      'result-body':resultBody
    },
  });
}
const sendResult = (result:{score:number,fullScore:number})=>{
  const serverUrl = `http://triple-income.jp/web_test/sendmail.php?score=${result.score}&name=${candidateStatus.name}`;
  //console.log(`${serverUrl}でajaxします。`)
  axios.get(serverUrl);
}

Vue.component('single-timer',singleTimer);
Vue.component('set-timer',setTimer);
