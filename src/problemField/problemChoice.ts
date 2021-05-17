import Vue from "vue";


export const problemChoice = Vue.extend({
    props:{
        problemType:[],
        problemChoice:String
    },
    template: `
    <button @click="$emit('nextproblem')">次の問題へ</button>`,
});
