import Vue from "vue";


export const problemStatement = Vue.extend({
    props:{
        problemBody:String
    },
    template: `
    <div>
    <p>{{ problemBody }}</p>
    </div>`,
});
