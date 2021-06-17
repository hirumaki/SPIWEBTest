import Vue from "vue";
import { singleTimer } from "../component/singleTimer";

//長文問題のみ、タブが存在するので、それに合わせてv-ifで場合分けしている。
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
            </div>
            <div id="answer-area" class="second-half">
                <form id="answer-form"></form>    
                <button class="next-button" @click="$emit('nextproblem')">次の問題へ</button>
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
       @nextproblem='nextProblem'
       ></single-timer>

    </div>
    <div id="answer-area" class="second-half">回答欄
        <form id="answer-form">
            <div v-if="problem.type === 'IdiomStructure'">熟語の構造問題
                <table> 
                    <tr>
                        <th></th>
                        <th>ア</th>
                        <th>イ</th>
                        <th>ウ</th>
                        <th>エ</th>
                    </tr>
                    <tr>
                        <th>
                            <p>１</p>
                        </th>                
                        <th>
                            <input type="radio" name="question1" value="ア" v-model="question1">
                        </th>
                        <th>
                            <input type="radio" name="question1" value="イ" v-model="question1">                
                        </th>
                        <th>
                            <input type="radio" name="question1" value="ウ" v-model="question1">        
                        </th>
                        <th>
                            <input type="radio" name="question1" value="エ" v-model="question1">
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <p>２</p>
                        </th>                
                        <th>
                            <input type="radio" name="question2" value="ア" v-model="question2">
                        </th>   
                        <th>
                            <input type="radio" name="question2" value="イ" v-model="question2">                
                        </th>
                        <th>
                            <input type="radio" name="question2" value="ウ" v-model="question2">        
                        </th>
                        <th>
                            <input type="radio" name="question2" value="エ" v-model="question2">
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <p>３</p>
                        </th>
                        <th>
                            <input type="radio" name="question3" value="ア" v-model="question3">
                        </th>
                        <th>
                            <input type="radio" name="question3" value="イ" v-model="question3">                
                        </th>
                        <th>
                            <input type="radio" name="question3" value="ウ" v-model="question3">        
                        </th>
                        <th>
                            <input type="radio" name="question3" value="エ" v-model="question3">
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <p>４</p>
                        </th>
                        <th>
                            <input type="radio" name="question4" value="ア" v-model="question4">
                        </th>
                        <th>
                            <input type="radio" name="question4" value="イ" v-model="question4">                
                        </th>
                        <th>
                            <input type="radio" name="question4" value="ウ" v-model="question4">        
                        </th>
                        <th>
                            <input type="radio" name="question4" value="エ" v-model="question4">
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <p>５</p>
                        </th>
                        <th>
                            <input type="radio" name="question5" value="ア" v-model="question5">
                        </th>
                        <th>
                            <input type="radio" name="question5" value="イ" v-model="question5">                
                        </th>
                        <th>
                            <input type="radio" name="question5" value="ウ" v-model="question5">        
                        </th>
                        <th>
                            <input type="radio" name="question5" value="エ" v-model="question5">
                        </th>
                    </tr>
                </table>
            </div>
            <div v-if="problem.type === 'OneBlankFixOfThreeSentences'">3文章穴埋めの問題
                <table> 
                    <tr>
                        <th></th>
                        <th>ア</th>
                        <th>イ</th>
                        <th>ウ</th>
                    </tr>
                    <tr>
                        <th>
                            <p>１</p>
                        </th>                
                        <th>
                            <input type="radio" name="question1" value="ア" v-model="question1">
                        </th>
                        <th>
                            <input type="radio" name="question1" value="イ" v-model="question1">   
                        </th>
                        <th>
                            <input type="radio" name="question1" value="ウ" v-model="question1">        
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <p>２</p>
                        </th>                
                        <th>
                            <input type="radio" name="question2" value="ア" v-model="question2">
                        </th>   
                        <th>
                            <input type="radio" name="question2" value="イ" v-model="question2">                
                        </th>
                        <th>
                            <input type="radio" name="question2" value="ウ" v-model="question2">        
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <p>３</p>
                        </th>
                        <th>
                            <input type="radio" name="question3" value="ア" v-model="question3">
                        </th>
                        <th>
                            <input type="radio" name="question3" value="イ" v-model="question3">                
                        </th>
                        <th>
                            <input type="radio" name="question3" value="ウ" v-model="question3">        
                        </th>
                    </tr>
                </table>
            </div>
            <div v-if="problem.type === 'SortFourElement'">文章並び替えの問題
                <table> 
                    <tr>
                        <th></th>
                        <th>ア</th>
                        <th>イ</th>
                        <th>ウ</th>
                        <th>エ</th>
                    </tr>
                    <tr>
                        <th>
                            <p>１</p>
                        </th>                
                        <th>
                            <input type="radio" name="question1" value="ア" v-model="question1">
                        </th>
                        <th>
                            <input type="radio" name="question1" value="イ" v-model="question1">                
                        </th>
                        <th>
                            <input type="radio" name="question1" value="ウ" v-model="question1">        
                        </th>
                        <th>
                            <input type="radio" name="question1" value="エ" v-model="question1">        
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <p>２</p>
                        </th>                
                        <th>
                            <input type="radio" name="question2" value="ア" v-model="question2">
                        </th>
                        <th>
                            <input type="radio" name="question2" value="イ"  v-model="question2">
                        </th>
                        <th>
                            <input type="radio" name="question2" value="ウ"  v-model="question2">        
                        </th>
                        <th>
                            <input type="radio" name="question2" value="エ"  v-model="question2">        
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <p>３</p>
                        </th>                
                        <th>
                            <input type="radio" name="question3" value="ア" v-model="question3">
                        </th>
                        <th>
                            <input type="radio" name="question3" value="イ"  v-model="question3">                
                        </th>
                        <th>
                            <input type="radio" name="question3" value="ウ"  v-model="question3">        
                        </th>
                        <th>
                            <input type="radio" name="question3" value="エ"  v-model="question3">        
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <p>４</p>
                        </th>                
                        <th>
                            <input type="radio" name="question4" value="ア"  v-model="question4">
                        </th>
                        <th>
                            <input type="radio" name="question4" value="イ"  v-model="question4">                
                        </th>
                        <th>
                            <input type="radio" name="question4" value="ウ"  v-model="question4">        
                        </th>
                        <th>
                            <input type="radio" name="question4" value="エ"  v-model="question4">        
                        </th>
                    </tr>
                </table>
            </div>
            <div v-if="problem.type === 'ThreeBlanksFixOfOneSentence'">1文章3つ穴埋め
                <table> 
                    <tr>
                        <th></th>
                        <th>ア</th>
                        <th>イ</th>
                        <th>ウ</th>
                    </tr>
                    <tr>
                        <th>
                            <p>１</p>
                        </th>                
                        <th>
                            <input type="radio" name="question1" value="ア">
                        </th>
                        <th>
                            <input type="radio" name="question1" value="イ">                
                        </th>
                        <th>
                            <input type="radio" name="question1" value="ウ">        
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <p>２</p>
                        </th>                
                        <th>
                            <input type="radio" name="question2" value="ア">
                        </th>   
                        <th>
                            <input type="radio" name="question2" value="イ">                
                        </th>
                        <th>
                            <input type="radio" name="question2" value="ウ">        
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <p>３</p>
                        </th>
                        <th>
                            <input type="radio" name="question3" value="ア">
                        </th>
                        <th>
                            <input type="radio" name="question3" value="イ">                
                        </th>
                        <th>
                            <input type="radio" name="question3" value="ウ">        
                        </th>
                    </tr>
                </table>
            </div>
            <div v-if="problem.type === 'LongSentenceReading'">長文読解
                <table> 
                    <tr>
                        <th></th>
                        <th>ア</th>
                        <th>イ</th>
                        <th>ウ</th>
                    </tr>
                    <tr>
                        <th>
                            <p>１</p>
                        </th>                
                        <th>
                            <input type="radio" name="question1" value="ア">
                        </th>
                        <th>
                            <input type="radio" name="question1" value="イ">                
                        </th>
                        <th>
                            <input type="radio" name="question1" value="ウ">        
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <p>２</p>
                        </th>                
                        <th>
                            <input type="radio" name="question2" value="ア">
                        </th>   
                        <th>
                            <input type="radio" name="question2" value="イ">                
                        </th>
                        <th>
                            <input type="radio" name="question2" value="ウ">        
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <p>３</p>
                        </th>
                        <th>
                            <input type="radio" name="question3" value="ア">
                        </th>
                        <th>
                            <input type="radio" name="question3" value="イ">                
                        </th>
                        <th>
                            <input type="radio" name="question3" value="ウ">        
                        </th>
                    </tr>
                </table>
            </div>
            <div v-if="problem.type === 'OneBlankFixOfOneSentence'">1文章穴埋め
                <table> 
                    <tr>
                        <th></th>
                        <th>ア</th>
                        <th>イ</th>
                        <th>ウ</th>
                    </tr>
                    <tr>
                        <th>
                            <p>１</p>
                        </th>                
                        <th>
                            <input type="radio" name="question1" value="ア">
                        </th>
                        <th>
                            <input type="radio" name="question1" value="イ">                
                        </th>
                        <th>
                            <input type="radio" name="question1" value="ウ">        
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <p>２</p>
                        </th>                
                        <th>
                            <input type="radio" name="question2" value="ア">
                        </th>   
                        <th>
                            <input type="radio" name="question2" value="イ">                
                        </th>
                        <th>
                            <input type="radio" name="question2" value="ウ">        
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <p>３</p>
                        </th>
                        <th>
                            <input type="radio" name="question3" value="ア">
                        </th>
                        <th>
                            <input type="radio" name="question3" value="イ">                
                        </th>
                        <th>
                            <input type="radio" name="question3" value="ウ">        
                        </th>
                    </tr>
                </table>
            </div>
            <div v-if="problem.type === 'fixBlank'">
                <input type="text" name ="question1">
            </div>

            <div v-if="problem.type === 'selectOneFromChoices'">
                <input type="radio" name="question1" value="ア">ア
            </div>
        </form>
        <button class="next-button" @click="score();$emit('nextproblem',[question1,question2,question3,question4,question5]);resetData()">次の問題へ</button>
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
            this.$emit(
                'nextproblem',
                [
                    this.question1,
                    this.question2,
                    this.question3,
                    this.question4,
                    this.question5]);
            console.log('afterNextProblem');
            this.resetData();
        },
        score:function(){
            let score = 0;
            let fullScore = 0;
            const solution = this.problem.solution;
            const answer = [
                this.question1,
                this.question2,
                this.question3,
                this.question4,
                this.question5];
            switch (this.problem.type){
                case 'SortFourElement':
                case 'ThreeBlankFixOfOneSentence':
                    let successFlg = true;
                    answer.forEach((ans,index)=>{
                        if (ans !== solution[index] && solution[index] !== '') successFlg = false;                        
                    });
                    if(successFlg) score += this.problem.points[0];
                    fullScore += this.problem.points[0];
                    break;
                case 'LongSentenceReading':
                    break;
                default:
                    answer.forEach((ans,index)=>{
                        if (ans === solution[index] && solution[index] !== '') score += this.problem.points[index]
                        fullScore += this.problem.points[index];
                    })
            }
            console.log(`score of previous problem is ${score}/${fullScore}`);
        }
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
