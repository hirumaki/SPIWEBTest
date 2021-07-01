import Vue from "vue";
import { Problem } from "../problem";

//長文問題のみ、タブが存在するので、それに合わせてv-ifで場合分けしている。
//選択肢を使う問題は、問題数、選択肢数でラジオボタンを二次元配置する形にしている。
//自由入力型の問題は、入力欄を表示し、それをquestion1の値へ埋め込んでいる。
const template = `
<div id="problem-statement">
    <div v-if="problem === undefined" id="problem-statement-field"></div>
    <div v-else-if="problem.type==='LongSentenceReading'" id="problem-statement-field">
        <div class="contents" id="question-tab-content">
            <div id="question0" v-if="tabNum === 0">    
                <div class="statement-area second-half">
                    <p v-html="problem.questions[0]"></p>
                </div>
                <div class="answer-area second-half">
                    <form id="answer-form">
                        <table> 
                            <tr>
                                <th></th>
                                <th v-for="choice in ['ア','イ','ウ','エ']">
                                    {{ choice }}
                                </th>
                            </tr>
                            <tr>
                                <th></th>     
                                <th v-for="(choice,index) in ['ア','イ','ウ','エ']">                        
                                    <input type="radio" class="problem-choices":name='question1' :value="choice" v-model="$data['question1']"">
                                </th>           
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
            <div id="question1" v-if="tabNum === 1">    
                <div class="statement-area second-half">
                    <p v-html="problem.questions[1]"></p>
                </div>
                <div class="answer-area second-half">
                    <form id="answer-form">
                        <input type="text" name ="question1" v-model='question2'>
                        <input type="text" name="dummy" style="display:none;">
                    </form>
                </div>
            </div>
            <div id="question2" v-if="tabNum === 2">    
                <div class="statement-area second-half">
                    <p v-html="problem.questions[2]"></p>
                    <div v-for="(choice,index) in problem.choices">
                        <p>{{ ['ア','イ','ウ','エ','オ'][index] }}:{{ choice }}</p>
                    </div>
                </div>
                <div class="answer-area second-half">
                    <form id="answer-form">
                        <table> 
                            <tr>
                                <th></th>
                                <th v-for='(choice,index) in problem.choices'>
                                    {{['ア','イ','ウ','エ','オ'][index]}}
                                </th>
                            </tr>
                            <tr>
                                <th></th>     
                                <th v-for='(choice,choiceNum) in problem.choices'>                        
                                    <input type="radio" class="problem-choices":name='question3' :value="['ア','イ','ウ','エ','オ'][choiceNum]" v-model="$data['question3']">
                                </th>           
                            </tr>
                        </table>
                    </form>    
                </div>
            </div>
        </div>
        <div class="tabs">
            <div 
                v-for="(question,questNum) in problem.questions"
                @click = "changeTab(questNum)"
                class="tab-buttons"
                :class="{'active selected-tab':tabNum === questNum}"
                >{{ questNum+1 }}</div>
        </div>
        <single-timer  
        v-if= "problem !== undefined"      
        :limit='problem.limit'
        :counter='counter'
        :testlength='testlength'
        @timeup='nextProblem'>
        </single-timer>
        <button id="next-button" @click="nextProblem();resetData()">次の問題へ</button>
    </div>
    <div v-else-if="problem.type==='selectOneFromChoicesSet'" id="problem-statement">
        <div id = "problem-statement-field">
            <div    v-for="(question,questNum) in problem.questions" 
                    :id="'question'+questNum">
                <div v-if="tabNum === questNum">
                        <p v-html="problem.questions[questNum]"></p>
                        <div v-for="(choice,index) in problem.choices[questNum]">
                            <p>{{ ['ア','イ','ウ','エ','オ'][index] }}:{{ choice }}</p>
                        </div>
                </div>    
            </div>
            <div class="tabs">
                <div 
                    v-for="(question,questNum) in problem.questions"
                    @click = "changeTab(questNum)"
                    class="tab-buttons"
                    :class="{'active selected-tab':tabNum === questNum}"
                    >{{ questNum+1 }}
                </div>
            </div>
        </div>
        <div id ="answer-field">
            <div    v-for="(question,questNum) in problem.questions" 
                    :id="'question'+questNum" >
                <div v-if="tabNum === questNum">
                    <form class="answer-form">
                        <table> 
                            <tr>
                                <th></th>
                                <th v-for='(choice,index) in problem.choices[questNum]'>
                                    {{['ア','イ','ウ','エ','オ'][index]}}
                                </th>
                            </tr>
                            <tr>
                                <th></th>
                                <th v-for='(choice,choiceNum) in problem.choices[questNum]'>                        
                                    <input type="radio" class="problem-choices" :name="'question'+questNum" :value="['ア','イ','ウ','エ','オ'][choiceNum]" v-model='$data["question"+(questNum+1)]'>
                                </th>           
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
            <single-timer  
                v-if= "problem !== undefined"      
                :limit='problem.limit'
                :counter='counter'
                :testlength='testlength'
                @timeup='nextProblem'>
            </single-timer>
            <button id="next-button" @click="nextProblem();resetData()">次の問題へ</button>
        </div>
    </div>
    <div v-else id="problem-statement">
        <div class="statement-area second-half">
            <div v-for="(choice,index) in problem.choices">
                <p>
                    {{ ['ア','イ','ウ','エ','オ'][index] }}:{{ choice }}
                </p>
            </div>
        </div>
        <div class="answer-area second-half">
            <form id="answer-form">
                <div v-if="[
                    'IdiomStructure',
                    'SortFourElement',
                    'OneBlankFixOfThreeSentences',
                    'ThreeBlanksFixOfOneSentence',
                    'OneBlankFixOfOneSentence',
                    'selectOneFromChoices'
                ].includes(problem.type)">
                    <table> 
                        <tr>
                            <th></th>
                            <th v-for='(choice,index) in problem.choices'>
                                {{['ア','イ','ウ','エ','オ'][index]}}
                            </th>
                        </tr>
                        <tr class='small-question-field' v-for='(question,index) in problem.statement'>
                            <th class='small-question-num' v-if='problem.statement.length >= 2'>
                                <p>{{ index + 1 }}</p>
                            </th>
                            <th v-else></th>
                            <th v-for='(choice,choiceNum) in problem.choices' class="problem-choice-background">                        
                                <input type="radio" class="problem-choices":name='"question"+(index+1)' :value="['ア','イ','ウ','エ','オ'][choiceNum]" v-model="$data['question'+ (index+1)]">
                            </th>
                        </tr>
                    </table>
                </div>
                <div v-if="problem.type === 'fixBlank'">
                    <input type="text" name ="question1" v-model='question1'>
                    <input type="text" name="dummy" style="display:none;">
                </div>
                <div v-if="problem.type === 'fixBlanksOfProbability'">
                    <input type="text" name ="question1" v-model='question1'>/<input type="text" name ="question2" v-model='question2'>
                </div>
            </form>
        </div>
        <single-timer  
            v-if= "problem !== undefined"      
            :limit='problem.limit'
            :counter='counter'
            :testlength='testlength'
            @timeup='nextProblem'>
        </single-timer>
        <button id="next-button" @click="nextProblem();resetData()">次の問題へ</button>
    </div>
</div>
`;

export const problemStatement = Vue.extend({
    props:{
            counter:Number,
            problem:Object,
            testlength:Number,//singleTimerに連携する為のプロパティ
        },
    data:function(){
            return{
                tabNum:0,
                question1:'',
                question2:'',
                question3:'',
                question4:'',
                question5:'',
            }
        },

    methods:{
        resetData:function(){
            this.question1 = '';
            this.question2 = '';
            this.question3 = '';
            this.question4 = '';
            this.question5 = '';
            this.changeTab(0);
        },
        nextProblem:function(){
            let score = 0;
            let fullScore = 0;
            let quest = this.problem as Problem;
            const solution = quest.solution;
            const answer = [
                this.question1,
                this.question2,
                this.question3,
                this.question4,
                this.question5];
            //採点のロジック
            switch (this.problem.type){
                case 'SortFourElement':
                case 'ThreeBlankFixOfOneSentence':
                case 'fixBlanksOfProbability':
                    let successFlg = true;
                    solution.forEach((sol:string|number,index:number)=>{
                        if (sol !== answer[index]) successFlg = false;                        
                    });
                    if(successFlg) score += this.problem.points[0];
                    fullScore += this.problem.points[0];
                    break;
                case 'LongSentenceReading':
                    solution.forEach((sol: string|number,index:number)=>{
                        if (answer[index] === sol) score += quest.points[index]
                        fullScore += quest.points[index]; 
                    });
                    break;
                default:
                    solution.forEach((sol: string|number,index:number)=>{
                        if (answer[index] === sol) score += quest.points[index]
                        fullScore += quest.points[index]; 
                    });
            }
            //ここまで採点のロジック
            this.$emit(
                'nextproblem',{score,fullScore});
            this.resetData();
            score = 0;
            fullScore = 0;
        },
        changeTab(tabNum:number){
            this.tabNum = tabNum;
        }
    },
//プロダクションでは不要な部分
/*
    watch:{
        question1:function(){
            console.log(`q1:${this.question1}`);
        },
        question2:function(){
            console.log(`q2:${this.question2}`);
        },
        question3:function(){
            console.log(`q3:${this.question3}`);
        },
        question4:function(){
            console.log(`q4:${this.question4}`);
        },
        question5:function(){
            console.log(`q5:${this.question5}`);
        },
    },
*/
    template,
});
