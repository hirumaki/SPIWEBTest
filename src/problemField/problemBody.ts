import Vue from "vue";


export const problemBody = Vue.extend({
    props:{
        problem:{
            type:Object
        }
    },
    template: `
    <div id="problem-body" class="first-half">
        <div class="body">
            <p>{{ problem.body }}</p>
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
        }
    }
});
