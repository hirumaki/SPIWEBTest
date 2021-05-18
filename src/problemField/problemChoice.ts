import Vue from "vue";

const template = `
<div class="problem-choices">
    <div v-if="type === 'IdiomStructure'">
        
    </div>



    <p v-else-if="problemType === 'BlankFixOfThreeSentences'">3文章穴埋めの問題</p>
    <button class="next-button" @click="$emit('nextproblem')">次の問題へ</button>
</div>

`;


export const problemChoice = Vue.extend({
    props:{
        type:String,
        problemChoice:Array,
    },
    template,
});
