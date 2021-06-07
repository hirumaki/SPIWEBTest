import Vue from "vue";
import Problem from "./problems";


export const problemBody = Vue.extend({
    props:{
        problem:{
            type:Object
        }
    },
    template: `
    <div class="body-and-timer problem-body">
        <div class="body">
            <p>{{ problem.body }}</p>
        </div>
        <div class="statement">
            <div v-if="problem.statement.length !=1">
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
    }
});
