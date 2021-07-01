import Vue from "vue";
import axios from "axios";
import { problemNumber} from "./problemField/problemNumber";
import { problemBody } from "./problemField/problemBody";
import { problemStatement } from "./problemField/problemStatement";
import { sectionTimer } from "./component/sectionTimer";
import { startScreen} from "./component/startScreen";
import { singleTimer } from "./component/singleTimer";
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
      //console.log(`candidateEmail:${candidateStatus.mail}`);
      //const url = `../TestJsons/${candidateData.test}.json`;
      const url = `../web_test/TestJsons/${candidateData.test}.json`//x-serverデプロイ時にアクティブ
      const topPage = document.getElementById('top-page');
      if(topPage !== null) topPage.style.display = 'none';
      const problemField = document.getElementById('problem-field');
      if(problemField !== null) problemField.style.display = 'block';
      await axios.get(url)
        .then((request)=>{
          problems = createTest(request.data.problems);
          startMain(problems);
        })
        .catch((error)=>{
          console.log('エラーが発生しました。');
        });
    }
  }
});

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
        if(this.counter === problems.length-1){//counterを動かさないので、vue.jsの描画が止まる
          const problemField = document.getElementById('problem-field');
          if(problemField !== null) problemField.style.display = 'none';
          const resultField = document.getElementById('result-field');
          if(resultField !== null) resultField.style.display = 'block';
          showResult({score:this.score,fullScore:this.fullScore});
          //簡易テストの場合はコメントアウト
          sendResult({score:this.score,fullScore:this.fullScore});
        }
        this.counter++;
      },
      timeUp:function(){
        showResult({score:this.score,fullScore:this.fullScore})
      }
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
  const serverUrl = `http://triple-income.jp/web_test/sendmail.php?score=${result.score}&name=${candidateStatus.name}&type=${candidateStatus.test}`;//簡易テスト
  //const serverUrl = `apps/grades/name/${candidateStatus.name}/mail/${candidateStatus.mail}/grade/${result.score}/type/${candidateStatus.test}`;
  //console.log(`${serverUrl}でajaxします。`)
  axios.get(serverUrl)
  .then((data)=>{
    console.log(data);
  })
  .catch((err)=>{
    console.log(err);
  });
}

Vue.component('single-timer',singleTimer);
