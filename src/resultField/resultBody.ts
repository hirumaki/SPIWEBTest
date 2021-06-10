import Vue from "vue";
import Problem from "../problemField/problems";


const template =  `
<div id = 'result-body'>
    <p>結果</p>
    <div v-for='answer in answers'>
        <p>問題1-1に{{ answer[0] }}と答えました。</p>
    </div>
    <div v-for='re in result'><p>{{ re }}</p>
    </div>
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
        console.log(this.answers);
        console.log(`結果欄のanswersは:${this.answers[0]}です。`)
    },
    watch:{
        answers:function(){
            console.log('答えました！！');
            const answer = this.answers[this.counter+1] as string[];
            const problem = this.problems[this.counter] as Problem; 
            answer.forEach((ans,index)=>{
                if (ans === problem.solution[index]) this.grades+=problem.points[index];
                this.fullScore += problem.points[index];
            })
        }
    }
});
