import Vue from "vue";


const template =  `
<div id = 'result-body'>
    <h3 id="result-title">{{ candidateName }}さんの受験結果</h3>
    <div id="result"> {{ fullScore }}点満点中、{{ score }}点でした。</div>
</div>
`;

export const resultBody = Vue.extend({
    props:{
        candidateName:String,
        score:Number,
        fullScore:Number,
        counter:Number,
    },
    template,
});
