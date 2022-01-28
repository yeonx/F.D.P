
<template>
    <div class="wrapper">

        <div class="content">
            <h4>학생 정보 입력</h4>
            <div class='col-input'>
                <label for="room_id">방 코드: </label>
                <input @keyup.enter="goStudent" v-model="roomNumber" id="room_id"/><br>
            </div>
            <div class='col-input'>
                <label for="user_name">사용자명: </label>
                <input @keyup.enter="goStudent" v-model="userName" id="user_name"/><br> 
            </div>

            <button @click="goStudent">접속하기</button>
            <div style='clear:both'></div>
        </div>
    </div>
</template>

<script>
export default {
    components:{
    },
    data(){
        return{
            isModalViewed: true,
            roomNumber:'',
            userName:'',
        }
    },
    methods:{
        goStudent(){
            if(this.roomNumber==="" || this.userName===""){
                alert('방 코드 및 사용자명을 입력해주세요.');
                return;
            }
            this.$router.push({name: 'Student', params: {roomNumber: this.roomNumber, userName:this.userName}})
        }
    }
}
</script>

<style scoped>

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background:#E0E0E0;
}

.content {
  font-size: 1.5rem;
  padding: 3rem;
  border-radius: 1rem;
  background: #F5F5F5;
}
h4{
    margin-top:0px;
}
input{
    margin-left:20px;
    float:right;
    padding:10px;
    outline:none;
    height:2rem;
    background:#E0E0E0;
}
.col-input{
    margin-bottom:10px;
}
button{
    width:100%;
    margin-top:20px;
    background:#E0E0E0;
    outline:none;
    border:none;
    padding:5px;
}
</style>