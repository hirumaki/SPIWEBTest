import axios from "axios";
import Vue from "vue";

const template = `
<div class="start-screen">
    <div class ="name-area">
        <p>貴方の名前を記入してください</p>
        <input type="text" placeholder="名前をフルネームで記入" v-model = "candidateName">
    </div>`
    //簡易テスト用ではmail-areaをコメントアウト
    /*
    +`<div class="mail-area">
        <p>貴方のメールアドレスを記入して下さい</p>
        <input type="text" placeholder="メールアドレスを記入" v-model="candidateEmail">
    </div>`
    */
    +`<div class="test-type-area">
        <p>受験したいテストを選んで下さい</p>
        <select name="selectedTest" v-model="selectedTest">
            <option v-for="test in testList" :value ="test.value">{{test.name}}</option>
        </select>
    </div>
    <div class="policy-agreement">
        <input class="policy-agreement-child" type="checkbox" v-model="agreed">
        <span class="policy-agreement-child"><a href="https://avalon-consulting.jp/policy" target="_blank">ホワイトアカデミーの個人情報保護方針</a>に同意します。</span>
    </div>
    <div class = 'alert-box'　v-html="alert"></div>
    <div id ='start-button' @click="checkForms">start</div>
</div>
`;

export const startScreen = Vue.extend({
    template,
    data:function(){
        return {
            agreed:false,
            alert:'',
            candidateName:'',
            candidateEmail:'',
            testList:['',''],
            selectedTest:'simpleTest1'//初期値をここに書き込む（v-ifとv-forの併用ができない）
        }
    },
    created:async function(){
            const testListPath = "../TestJsons/testList.json";
            //const testListPath = "../web_test/TestJsons/testList.json";//X-server向けのデプロイ時にアクティブ
            await axios.get(testListPath)
            .then((request)=>{
              this.testList = request.data.testList;
            });
    },
    methods:{
        checkForms:function(){
            this.alert = ""
            if (this.candidateName === '') this.alert += '名前を入力してください<br>';
            //if (this.candidateEmail === '') this.alert += 'メールアドレスを入力してください<br>';
            if (!this.agreed) this.alert += '個人情報保護方針に同意してください';
            if (this.alert === '') this.checkTested();
            
        },
        checkTested:async function(){
            /*
            const tested:boolean = await axios.get(`apps/grades/tested/name/${this.candidateName}/mail/${this.candidateEmail}/type/${this.selectedTest}`)
            .then((data)=>{
                if (data.data) this.alert = '既に受検済です。'
                return data.data;
            })
            .catch((error)=>{
                this.alert = '通信エラーが発生しました。もう一度お試しください。';
                return true;
            });
            if(!tested) this.startExam();
            */
            this.startExam();//
        },
        startExam:function(){
            const candidateStatus = {
                name: this.candidateName,
                mail:this.candidateEmail,
                test: this.selectedTest,
            }
            this.$emit('startexamination',candidateStatus);
        }
    },
});
