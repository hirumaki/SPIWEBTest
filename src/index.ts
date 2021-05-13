import Vue from "vue";
import { Template } from "webpack";
import {problems} from "./problems";
import {QuestionBody} from "./questionBody";

let problemCounter = 0;

const questionBody = QuestionBody;

const confirmButton = Vue.component('question-confirm-button',{
  data: function(){
    return{
      problems,
      count:problemCounter
    }
  },
  template: `
    <div>
      <button v-on:click="nextProblem">今、{{ count }}問目</button>
      <p>答えは{{ problems[count].solution }}</p>
    </div>`,
  methods:{
    nextProblem:function(){
      this.count++;
    }
  }
});

const answerField = Vue.component('question-answer-field',{
    data:()=>{
      return{
      msg :'実験'
      }
    },
    template:'<p> {{ msg }}</p>'

})

const question = new Vue({
  el: '#question-field',
  data:{
    problems
  }
})

