import Vue from 'vue';

const msg:string = 'HelloWorld';
console.log(msg);
console.log('HEllo!!');

const Component = Vue.extend({
    el:'#app',
    data: {message:'Hello Vue!'}
});
