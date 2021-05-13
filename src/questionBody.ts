import Vue from "vue";
import {problems} from "./problems"


export const QuestionBody = Vue.component('questionBody',{
    data:function(){
        let counter = 0;
        return {
            counter:0,
            message:problems[counter].body,
            problems
            
        }
    },
    template: `
    <div>
    <p2>{{ message }}</p2>
    <button v-on:click="getNextProblem">{{ counter+2 }}問目へ</button>
    </div>`,
    methods: {
        getNextProblem : function(){
            this.counter++;
        }
    },
});
