import Vue from "vue";

const template = `
<div id="section-timer">
    <p>現在<span v-if="minute!==0">{{ minute }}分</span>{{ second }}秒が経過しました。</p>
</div>
`;

export const sectionTimer = Vue.extend({
    template,
    data:
        function(){
            return {
                second:0,
                minute:0
            }
        },
    methods:{
        count: function(){
            setInterval(()=>{
                this.second++;
                if (this.second >= 60){
                    this.minute++;
                    this.second -= 60;
                }
            },1000);
        }
    },
    created: function(){
        this.count();
    }
    
    
})
