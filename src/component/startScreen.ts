import Vue from "vue";
import { Problem } from "../problem";
import { imitationSpiWeb1 } from "../problemSets/imitationSpiWeb1";
import { WhiteAcademyPractice1} from "../problemSets/WhiteAcademyPractice1";

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
        <select name="testtype" v-model="testType">
            <option :value="imitationSpiWeb1">SPIWEbテスト1</option>
            <option :value="WhiteAcademyPractice1">WhiteAcademy練習1</option>
        </select>
    </div>
    <div id ='start-button' class="btn btn-primary" @click="startExam">start</div>
</div>
`;

export const startScreen = Vue.extend({
    template,
    data:function(){
        return {
            candidateName:'',
            candidateEmail:'',
            testType:Object,
            imitationSpiWeb1,
            WhiteAcademyPractice1
        }
    },
    methods:{
        startExam:function(){
            const candidateStatus = {
                name: this.candidateName,
                email:this.candidateEmail,
                test: this.testType,
            }
            this.$emit('startexamination',candidateStatus);
        }
    }
});
