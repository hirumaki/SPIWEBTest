import Vue from "vue";

const template = `
<div class="problem-statement">
    <div class="statement-area second-half">問題</div>
    <div class="answer-area second-half">回答欄
        <div v-if="type === 'IdiomStructure'">熟語の構造問題
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
                        <input type="radio" name="question1" value="ア">
                    </th>
                    <th>
                        <input type="radio" name="question1" value="イ">                
                    </th>
                    <th>
                        <input type="radio" name="question1" value="ウ">        
                    </th>
                    <th>
                        <input type="radio" name="question1" value="エ">
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
                    <th>
                        <input type="radio" name="question2" value="エ">
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
                    <th>
                        <input type="radio" name="question3" value="エ">
                    </th>
                </tr>
                <tr>
                    <th>
                        <p>４</p>
                    </th>
                    <th>
                        <input type="radio" name="question4" value="ア">
                    </th>
                    <th>
                        <input type="radio" name="question4" value="イ">                
                    </th>
                    <th>
                        <input type="radio" name="question4" value="ウ">        
                    </th>
                    <th>
                        <input type="radio" name="question4" value="エ">
                    </th>
                </tr>
            </table>
        </div>
        <div v-else-if="type === 'OneBlankFixOfThreeSentences'">3文章穴埋めの問題
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
        <div v-else-if="type === 'SortFourElement'">文章並び替えの問題
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
                        <input type="radio" name="question1" value="ア">
                    </th>
                    <th>
                        <input type="radio" name="question1" value="イ">                
                    </th>
                    <th>
                        <input type="radio" name="question1" value="ウ">        
                    </th>
                    <th>
                        <input type="radio" name="question1" value="エ">        
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
                    <th>
                        <input type="radio" name="question2" value="エ">        
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
                    <th>
                        <input type="radio" name="question3" value="エ">        
                    </th>
                </tr>
                <tr>
                    <th>
                        <p>４</p>
                    </th>                
                    <th>
                        <input type="radio" name="question4" value="ア">
                    </th>
                    <th>
                        <input type="radio" name="question4" value="イ">                
                    </th>
                    <th>
                        <input type="radio" name="question4" value="ウ">        
                    </th>
                    <th>
                        <input type="radio" name="question4" value="エ">        
                    </th>
                </tr>
            </table>
        </div>
        <div v-else-if="type === 'ThreeBlanksFixOfOneSentence'">1文章3つ穴埋め
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
        <div v-else-if="type === 'LongSentenceReading'">長文読解
            <div class=>
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
        <div v-else-if="type === 'OneBlankFixOfOneSentence'">1文章穴埋め
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
        <button class="next-button" @click="$emit('nextproblem')">次の問題へ</button>
    </div>
</div>
`;

export const problemStatement = Vue.extend({
    props:{
        type:String,
        choices:Array,
    },
    template,
    created: function(){
    }
});
