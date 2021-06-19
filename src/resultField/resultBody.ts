import Vue from "vue";
import { Problem } from "../problem";


const template =  `
<div id = 'result-body'>
    <div> 最終得点は{{ fullScore }}点満点中、{{ score }}点です。</div>
</div>
`;

export const resultBody = Vue.extend({
    props:{
        score:Number,
        fullScore:Number,
        counter:Number,
    },
    template,    
});
