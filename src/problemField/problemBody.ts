import Vue from "vue";


export const problemBody = Vue.extend({
    props:{
        problembody:String
    },
    template: `
    <div>
    <p>{{ problembody }}</p>
    </div>`,
});
