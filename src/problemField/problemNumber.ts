import Vue from "vue";


export const problemNumber = Vue.extend({
    props:{
        number:Number
    },
    template: `
    <div class="problem-number">
    <h2>第{{ number }}問</h2>
    </div>`,
});
