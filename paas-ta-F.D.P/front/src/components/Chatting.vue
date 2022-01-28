<template>
  <div class='chat-root'>
    <h2>시험 중 메시지</h2>
    <div class='chat-list'>
        <ul class='list-box'>
            <li v-for="message in messages" :key="message.id">
                {{message}}
            </li>
        </ul>
    </div>
    <div class='chat-div'>
        <input @keyup.enter="sendMessage" v-model="message" class='chat-input' type="text"/>
        <button @click="sendMessage" class='btn-chat'>입력</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
    mounted(){
        console.log(this.roomNumber);
        this.socket.on("onMessage", (data) => {
            console.log(data);
            this.messages.push(`${data.name}: ${data.msg}`);
        });
    },
    data(){
        return{
            message:'',
            messages:[]
        }
    },
    props:['socket','userName','roomNumber'],
    methods:{
        sendMessage(){
            const msg = this.message;
            this.message='';
            this.socket.emit('onMessage',{
                name:this.userName,
                msg,
                id: this.socket.id,
                roomID: this.roomNumber,
            });
            this.messages.push(`${this.userName}: ${msg}`);
        }
    }
}
</script>

<style scoped>
.chat-root{
    padding:2%;
}
.chat-list{
    padding:7%;
    height: 85%;
    overflow-y:scroll;
    background:white;
    border-radius: 20px;
}
.chat-list > ul > li{
    margin-top:2px;
}
.chat-div{
    margin-top:20px;
}
.chat-input{
    padding:15px;
    background:white;
    width:70%;
    height: 30px;
    margin-right:10px;
    outline:none;
}
.btn-chat{
    cursor:pointer;
    color:white;
    outline:none;
    border:none;
    background-color:#4893f7;
    height:40px;
    padding:5px;
    width:70px;
    border-radius: 50px;
}
</style>