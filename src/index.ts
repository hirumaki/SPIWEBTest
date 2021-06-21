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

Vue.prototype.$count = 0;
let problems:Problem[]; 
let candidateStatus:{name:string,mail:string,test:object};

const startView = new Vue({
  el:'#top-page',
  components:{
    'start-screen':startScreen
  },
  methods:{
    registerCandidate: function(candidateData:{name:string,mail:string,test:Object}){
      candidateStatus = candidateData;
      problems = candidateData.test as Problem[];
    }
  }
})

const startButton = document.getElementById('start-button');
if(startButton !== null) startButton.onclick = ()=>{
  const topPage = document.getElementById('top-page');
  if(topPage !== null) topPage.style.display = 'none';
  const problemField = document.getElementById('problem-field');
  if(problemField !== null) problemField.style.display = 'block';
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
        if(this.counter === problems.length-2){//counterを動かさないので、vue.jsの描画が止まる
          const problemField = document.getElementById('problem-field');
          if(problemField !== null) problemField.style.display = 'none';
          const resultField = document.getElementById('result-field');
          if(resultField !== null) resultField.style.display = 'block';
          result.showResult({score:this.score,fullScore:this.fullScore});
          sendResult({score:this.score,fullScore:this.fullScore});
        }
        this.counter++;
      },
    }
  });
  
  const result = new Vue({
    el:'#result-field',
    data:{
      problems,
      counter:0,
      score:0,
      fullScore:0
    },
    components:{
      'result-body':resultBody
    },
    methods:{
      showResult:function(resultscore:{score:number,fullScore:number}){
        this.score = resultscore.score;
        this.fullScore = resultscore.fullScore;
        /*
        console.log(`resultscore.score:${resultscore.score}`);
        console.log(`resultscore.fullScore:${resultscore.fullScore}`);
        console.log(`result.score:${this.score}`);
        console.log(`result.fullScore:${this.fullScore}`);
       */
      }
    }
  });
}

const sendResult = (result:{score:number,fullScore:number})=>{
  const serverUrl = `http://triple-income.jp/web_test/sendmail.php?score=${result.score}&name=${candidateStatus.name}`;
  //console.log(`${serverUrl}でajaxします。`)
  axios.get(serverUrl);
}

Vue.component('single-timer',singleTimer);
Vue.component('set-timer',setTimer);


//axiosでjsonファイルを読み込む
let testList:string[];
const loadTests = async() =>{
await axios.get("../TestJsons/testList.json")
  .then((request)=>{
    testList = request.data.testList;
  });
const files = ["imitationSpiWeb1","WhiteAcademyTest1"]
files.forEach((test)=>{
  const url = `../TestJsons/${test}.json`;
  console.log(`Load:${url}`)
  axios.get(url)
    .then((request)=>{
      console.log(request.data.name);
    })
    .catch((error)=>{
      console.log(error);
    })
  });
}

loadTests();
