import Vue from "vue";


export const problemBody = Vue.extend({
    props:{
        problembody:String
    },
    template: `
    <div class="problem-body">
    <p>{{ problembody }}</p>
    </div>`,
});
