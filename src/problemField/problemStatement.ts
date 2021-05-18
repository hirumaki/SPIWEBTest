import Vue from "vue";


export const problemStatement = Vue.extend({
    props:{
        problemBody:String
    },
    template: `
    <div class='problem-statement'>
    <p>{{ problemBody }}問題本体</p>
    </div>`,
});
