import axios from "axios";
import Vue from "vue";

const template = `
<div class="start-screen">
    <div class ="name-area">
        <p>貴方の名前を記入してください</p>
        <input type="text" placeholder="名前をフルネームで記入" v-model = "candidateName">
    </div>
    <div class="mail-area">
        <p>貴方のメールアドレスを記入して下さい</p>
        <input type="text" placeholder="メールアドレスを記入" v-model="candidateEmail">
    </div>
    <div class="test-type-area">
        <p>受験したいテストを選んで下さい</p>
        <select name="selectedTest" v-model="selectedTest">
            <option v-for="test in testList" :value ="test.value">{{test.name}}</option>
        </select>
    </div>
    <div class="policy-agreement">
        <input class="policy-agreement-child" type="checkbox">
        <span class="policy-agreement-child">ホワイトアカデミーの個人情報保護方針に同意します。</span>
    </div>
    <div id ='start-button' @click="startExam">start</div>
</div>
`;

export const startScreen = Vue.extend({
    template,
    data:function(){
        return {
            candidateName:'',
            candidateEmail:'',
            testList:['',''],
            selectedTest:'WhiteAcademyTest1'//初期値をここに書き込む（v-ifとv-forの併用ができない）
        }
    },
    created:async function(){
            await axios.get("../TestJsons/testList.json")
            .then((request)=>{
              this.testList = request.data.testList;
              console.log('loading testList');
              console.log(this.testList);
            });
    },
    methods:{
        startExam:function(){
            const candidateStatus = {
                name: this.candidateName,
                email:this.candidateEmail,
                test: this.selectedTest,
            }
            this.$emit('startexamination',candidateStatus);
        }
    }
});
