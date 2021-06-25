import Vue from "vue";

const template = `
<div id="section-timer" class="first-half">
    <p>現在{{ second }}秒が経過しました。</p>
</div>
`;

export const sectionTimer = Vue.extend({
    template,
    data:
        function(){
            return {
                second:0
            }
        },
    methods:{
        count: function(){
            let self = this;
            setInterval(()=>{
                self.second++;

            },1000);
        }
    },
    created: function(){
        this.count();
    }
    
    
})
