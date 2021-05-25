import Vue from "vue";
import { Template } from "webpack";
import {problems} from "./problemField/problems";
import {problemNumber} from "./problemField/problemNumber";
import {problemBody} from "./problemField/problemBody";
import {problemStatement} from "./problemField/problemStatement";
import {problemChoice} from "./problemField/problemChoice";
import { sectionTimer } from "./component/sectionTimer";
import { singleTimer} from "./component/singleTimer";

const question = new Vue({
  el: '#problem-field',
  data:{
    problems,
    counter:0
  },
  components:{
    'section-timer':sectionTimer,
    'single-timer':singleTimer,
    'problem-number':problemNumber,
    'problem-body':problemBody,
    'problem-statement':problemStatement,
    'problem-choice':problemChoice,
  },
  methods:{
    nextProblem:function(){
      this.counter++;
    }
  }
})

