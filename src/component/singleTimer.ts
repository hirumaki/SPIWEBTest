import Vue from "vue";

const template = `
<div>
    <div style='height:20px;'></div>
    <div style='display:flex;'>
        <div class='margin-block'></div>
        <div class='body-block' v-bind:style="single1Color"></div>
        <div class='margin-block'></div>
        <div class='body-block' v-bind:style="single2Color"></div>
        <div class='margin-block'></div>
        <div class='body-block' v-bind:style="single3Color"></div>
        <div class='margin-block'></div>
        <div class='body-block' v-bind:style="single4Color"></div>
        <div class='margin-block'></div>
        <div class='body-block' v-bind:style="single5Color"></div>
        <div class='margin-block'></div>
        <div class='body-block' v-bind:style="single6Color"></div>
        <div class='margin-block'></div>
        <div class='body-block' v-bind:style="single7Color"></div>
        <div class='margin-block'></div>
        <div class='body-block' v-bind:style="single8Color"></div>
        <div class='margin-block'></div>
        <div class='body-block' v-bind:style="single9Color"></div>
        <div class='margin-block'></div>
        <div class='body-block' v-bind:style="single10Color"></div>
        <div class='margin-block'></div>
        <div class='body-block' v-bind:style="single11Color"></div>
        <div class='margin-block'></div>
        <div class='body-block' v-bind:style="single12Color"></div>
        <div class='margin-block'></div>
    </div>
</div>
`

export const singleTimer = Vue.extend({
    template,
    props :{limit:Number},    
    data : function (){
        return {
            sec : 0,
            limit : 5,
            single1Color : 'background-color:#AAA;',
            single2Color : 'background-color:#AAA;',
            single3Color : 'background-color:#AAA;',
            single4Color : 'background-color:#AAA;',
            single5Color : 'background-color:#AAA;',
            single6Color : 'background-color:#AAA;',
            single7Color : 'background-color:#888;',
            single8Color : 'background-color:#888;',
            single9Color : 'background-color:#888;',
            single10Color : 'background-color:#444;',
            single11Color : 'background-color:#444;',
            single12Color : 'background-color:#444;',

        }
    },
    methods:{
        count : function() {
            let self = this;
            setInterval(()=>{
                self.sec++;
                console.log('count');
                self.color();
            },1000);
        },
        color : function(){
            if(this.sec >= this.limit*1)  this.single1Color  = 'background-color:#008000;';
            if(this.sec >= this.limit*2)  this.single2Color  = 'background-color:#008000;';
            if(this.sec >= this.limit*3)  this.single3Color  = 'background-color:#008000;';
            if(this.sec >= this.limit*4)  this.single4Color  = 'background-color:#008000;';
            if(this.sec >= this.limit*5)  this.single5Color  = 'background-color:#008000;';
            if(this.sec >= this.limit*6)  this.single6Color  = 'background-color:#008000;';
            if(this.sec >= this.limit*7)  this.single7Color  = 'background-color:#ffff00;';
            if(this.sec >= this.limit*8)  this.single8Color  = 'background-color:#ffff00;';
            if(this.sec >= this.limit*9)  this.single9Color  = 'background-color:#ffa500;';
            if(this.sec >= this.limit*10) this.single10Color = 'background-color:#ffa500;';
            if(this.sec >= this.limit*11) this.single11Color = 'background-color:#ff0000;';
            if(this.sec >= this.limit*12) this.single12Color = 'background-color:#ff0000;';
            if(this.sec >= this.limit*13) console.log('end');
        }
    },
    created: function(){
        this.count();
    }

})
