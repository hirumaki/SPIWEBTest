import Vue from "vue";
import { Problem } from "../problem";


const template =  `
<div id = 'result-body'>
    <div> 最終得点は{{ fullScore }}点満点中、{{ grades }}点です。</div>
</div>
`;

export const resultBody = Vue.extend({
    props:{
        problems:Array,
        answers:Array,
        counter:Number,
    },
    data:
        function(){
            return {result:[''],grades:0,fullScore:0}
        },
    template,
    created:function(){
    },
    watch:{
        answers:function(){
            const answer = this.answers[this.counter+1] as string[];
            const problem = this.problems[this.counter] as Problem; 
            answer.forEach((ans,index)=>{
                console.log(`answer:${ans}`);
                console.log(`solution:${problem.solution[index]}`);
                if (ans === problem.solution[index]) this.grades+=problem.points[index];
                this.fullScore += problem.points[index];
            })
        }
    }
});
