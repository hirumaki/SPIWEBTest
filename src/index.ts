import Vue from "vue";
import {problems} from "./problemField/problems";
import {problemNumber} from "./problemField/problemNumber";
import {problemBody} from "./problemField/problemBody";
import {problemStatement} from "./problemField/problemStatement";
import { sectionTimer } from "./component/sectionTimer";
import { singleTimer} from "./component/singleTimer";



const main = new Vue({
  el: '#problem-field',
  data:{
    answer:[['']],
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
      this.answer.push(answer);
      console.log(this.answer);
      this.counter++;
    }
  }
})

