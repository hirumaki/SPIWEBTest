import Vue from "vue";

export const problemBody = Vue.extend({
    props:{
        problem:{
            type:Object
        }
    },
    data:function(){
        return {
            style :{
                "overflow-y":"scroll"
            }
        }
    },
    template: `
    <div id="problem-body" class="first-half">
        <div id="body" v-if="problem.body.length<200">
            <p  v-html="problem.body"
                style="height:200px;"
                ></p>
        </div>
        <div id="body" v-else>
            <p>次の文章を読んで、後の問題に答えなさい</p>
            <p  v-html="problem.body"
                style="height:200px; overflow-y:scroll"
            ></p>
        </div>
        <div class="statement">
            <div v-if="
                [
                    'SortFourElement',
                    'ThreeBlanksFixOfOneSentence'
                ].includes(problem.type)">
                <span v-for="statement in problem.statement">
                    {{ statement }}
                </span>   
            </div>
            <div v-else-if="problem.statement.length !=1">
                <div v-for="(statement,index) in problem.statement">
                    <p>
                        {{ index+1 }}:{{ statement }}
                    </p>
                </div>
            </div>
            <div v-else>
                <div>
                    <p v-html="problem.statement[0]"></p>
                </div>
            </div>
        </div>
    </div>`,
    created:function(){
    },
    watch:{
        problem:function(){
            if(this.problem === undefined) this.$destroy();
            console.log(this.problem.body.length);
        }
    }
});
