import Vue from "vue";
import { Problem } from "../problem";

//長文問題のみ、タブが存在するので、それに合わせてv-ifで場合分けしている。
//選択肢を使う問題は、問題数、選択肢数でラジオボタンを二次元配置する形にしている。
//自由入力型の問題は、入力欄を表示し、それをquestion1の値へ埋め込んでいる。
const template = `
<div v-if="problem.type==='LongSentenceReading'" class="problem-statement">
    <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item" role="presentation">
            <a class="nav-link active" id="one-tab" data-bs-toggle="tab" href="#one" aria-controls="home" aria-selected="true">1</a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link" id="two-tab" data-bs-toggle="tab" href='#two' aria-controls="home" aria-selected="true">2</a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link" id="three-tab" data-bs-toggle="tab" href="#three" aria-controls="home" aria-selected="true">3</a>
        </li>
    </ul>
    <div class="tab-content" id="questionTabContent">
        <div class="tab-pane active" id="one" role="tabpanel" aria-labelledby="one-tab">    
            <div class="statement-area second-half">
                <p v-html="problem.questions[0]"></p>
                <single-timer        
                :limit='problem.limit'
                :counter='counter'
                :testlength='testlength'
                @timeup='nextProblem'
                ></single-timer>
            </div>
            <div id="answer-area" class="second-half">
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
                                <input type="radio" :name='question1' :value="choice" v-model="$data['question1']">
                            </th>           
                        </tr>
                    </table>
                </form>
                <button class="next-button" @click="nextProblem();resetData()">次の問題へ</button>
            </div>
        </div>
        <div class="tab-pane" id="two" role="tabpanel" aria-labelledby="two-tab">    
            <div class="statement-area second-half">
                <p v-html="problem.questions[1]"></p>
                <set-timer        
                :limit='problem.limit'
                :counter='counter'
                :testlength='testlength'
                @nextproblem='nextProblem'
                ></set-timer>
            </div>
            <div id="answer-area" class="second-half">
                <form id="answer-form">
                    <input type="text" name ="question1" v-model='question2'>
                    <input type="text" name="dummy" style="display:none;">
                </form>
                <button class="next-button" @click="nextProblem();resetData()">次の問題へ</button>
            </div>
        </div>
        <div class="tab-pane" id="three" role="tabpanel" aria-labelledby="three-tab">    
            <div class="statement-area second-half">
                <p v-html="problem.questions[2]"></p>
                <div v-for="(choice,index) in problem.choices">
                    <p>{{ ['ア','イ','ウ','エ','オ'][index] }}:{{ choice }}</p>
                </div>
                <set-timer        
                :limit='problem.limit'
                :counter='counter'
                :testlength='testlength'
                @nextproblem='nextProblem'
                ></set-timer>
            </div>
            <div id="answer-area" class="second-half">
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
                                <input type="radio" :name='question3' :value="['ア','イ','ウ','エ','オ'][choiceNum]" v-model="$data['question3']">
                            </th>           
                        </tr>
                    </table>
                </form>    
                <button class="next-button" @click="nextProblem();resetData()">次の問題へ</button>
            </div>
        </div>
    </div>
</div>
<div v-else-if="problem.type==='selectOneFromChoicesSet'" class="problem-statement">
    <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item" role="presentation">
            <a class="nav-link active" id="one-tab" data-bs-toggle="tab" href="#one" aria-controls="home" aria-selected="true">1</a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link" id="two-tab" data-bs-toggle="tab" href='#two' aria-controls="home" aria-selected="true">2</a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link" id="three-tab" data-bs-toggle="tab" href="#three" aria-controls="home" aria-selected="true">3</a>
        </li>
    </ul>
    <div class="tab-content" id="questionTabContent">
        <div class="tab-pane active" id="one" role="tabpanel" aria-labelledby="one-tab">    
            <div class="statement-area second-half">
                <p v-html="problem.questions[0]"></p>
                <single-timer        
                :limit='problem.limit'
                :counter='counter'
                :testlength='testlength'
                @nextproblem='nextProblem'
                ></single-timer>
            </div>
            <div id="answer-area" class="second-half">
                <form id="answer-form">
                </form>
                <button class="next-button" @click="$emit('nextproblem')">次の問題へ</button>
            </div>
        </div>
        <div class="tab-pane" id="two" role="tabpanel" aria-labelledby="two-tab">    
            <div class="statement-area second-half">
                <p v-html="problem.questions[1]"></p>
                <set-timer        
                :limit='problem.limit'
                :counter='counter'
                :testlength='testlength'
                @nextproblem='nextProblem'
                ></set-timer>
            </div>
            <div id="answer-area" class="second-half">
                <form id="answer-form"></form>
                <button class="next-button" @click="$emit('nextproblem')">次の問題へ</button>
            </div>
        </div>
        <div class="tab-pane" id="three" role="tabpanel" aria-labelledby="three-tab">    
            <div class="statement-area second-half">
                <p v-html="problem.questions[2]"></p>
                <div v-for="(choice,index) in problem.choices">
                    <p>{{ ['ア','イ','ウ','エ','オ'][index] }}:{{ choice }}</p>
                </div>
                <set-timer        
                :limit='problem.limit'
                :counter='counter'
                :testlength='testlength'
                @nextproblem='nextProblem'
                ></set-timer>
            </div>
            <div id="answer-area" class="second-half">
                <form id="answer-form"></form>    
                <button class="next-button" @click="$emit('nextproblem')">次の問題へ</button>
            </div>
        </div>
    </div>
</div>
<div v-else class="problem-statement">
    <div class="statement-area second-half">選択肢
        <div v-for="(choice,index) in problem.choices">
            <p>
                {{ ['ア','イ','ウ','エ','オ'][index] }}:{{ choice }}
            </p>
        </div>
       <single-timer        
       :limit='problem.limit'
       :counter='counter'
       :testlength='testlength'
       @timeup='nextProblem'
       ></single-timer>

    </div>
    <div id="answer-area" class="second-half">回答欄
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
                        <th v-for='(choice,choiceNum) in problem.choices'>                        
                            <input type="radio" :name='"question"+(index+1)' :value="['ア','イ','ウ','エ','オ'][choiceNum]" v-model="$data['question'+ (index+1)]">
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
        <button class="next-button" @click="nextProblem();resetData()">次の問題へ</button>
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
                        console.log(`sol:${sol}`);
                        console.log(`ans:${answer[index]}`);
                        if (answer[index] === sol) score += quest.points[index]
                        fullScore += quest.points[index]; 
                    });
                    break;
                default:
                    solution.forEach((sol: string|number,index:number)=>{
                        console.log(`sol:${sol}`);
                        console.log(`ans:${answer[index]}`);
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
    },
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
        }
    },
    template,
    created: function(){
    }
});
