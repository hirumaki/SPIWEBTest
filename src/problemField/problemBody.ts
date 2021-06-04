import Vue from "vue";


export const problemBody = Vue.extend({
    props:{
        body:String,
        statements:Array
    },
    template: `
    <div class="body-and-timer problem-body">
        <div class="body">
            <p>{{ body }}</p>
        </div>
        <div class="statement">
            <div v-for="(statement,index) in statements">
                <p>
                    {{ index+1 }}:{{ statement }}
                </p>
            </div>
        </div>
    </div>`,
    created:function(){
        console.log(this.statements);
    }
});
