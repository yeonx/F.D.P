<template>
  <div>
    <div>
      <video
        muted
        ref="localVideoRef"
        autoPlay
      />
      <br>
      <button class="btn-mute" @click="muteVideo">Video</button>
      <button class="btn-mute" @click="muteAudio">Audio</button>
    </div>
      
    <div v-for="user in this.users" :key="user.id">
      <Video :stream="user.stream" id="remote" ref="remoteVideoRef" muted autoplay/>
      
    </div>
              
    <Chatting :roomNumber="roomNumber" :userName="userName" :socket="socketRef" class='right-side'></Chatting>
  </div>
</template>

<script>
/* eslint-disable */
import Video from '../components/Video.vue';
import Chatting from '../components/Chatting.vue';
import io from "socket.io-client";
const pc_config = { iceServers: [ { urls: "stun:stun.l.google.com:19302", }, ]};
const SOCKET_SERVER_URL = "http://localhost:8080";
export default {
  name:'Params',
  props:["roomNumber","userName"],
  async created(){
    console.log(this.roomNumber);
    this.socketRef= io.connect(SOCKET_SERVER_URL);
    await this.getLocalStream();

    this.socketRef.on("userEnter", (data) => {
      this.createReceivePC(data.id);
    });

    this.socketRef.on(
      "allUsers",
      (data) => {
        data.users.forEach((user) => this.createReceivePC(user.id));
      }
    );

    this.socketRef.on("userExit", (data) => {
      this.closeReceivePC(data.id);
      const users= this.users;
      this.users=users.filter((user) => user.id !== data.id)
    });

    this.socketRef.on(
      "getSenderAnswer",
      async (data) => {
        try {
          if (!this.sendPCRef) return;
          console.log("get sender answer");
          console.log(data.sdp);
          await this.sendPCRef.setRemoteDescription(
            new RTCSessionDescription(data.sdp)
          );
        } catch (error) {
          console.log(error);
        }
      }
    );

    this.socketRef.on(
      "getSenderCandidate",
      async (data) => {
        try {
          if (!(data.candidate && this.sendPCRef)) return;
          console.log("get sender candidate");
          await this.sendPCRef.addIceCandidate(
            new RTCIceCandidate(data.candidate)
          );
          console.log("candidate add success");
        } catch (error) {
          console.log(error);
        }
      }
    );

    this.socketRef.on(
      "getReceiverAnswer",
      async (data) => {
        try {
          console.log(`get socketID(${data.id})'s answer`);
          const pc = this.receivePCsRef[data.id];
          if (!pc) return;
          await pc.setRemoteDescription(data.sdp);
          console.log(`socketID(${data.id})'s set remote sdp success`);
        } catch (error) {
          console.log(error);
        }
      }
    );

    this.socketRef.on(
      "getReceiverCandidate",
      async (data) => {
        try {
          console.log(data);
          console.log(`get socketID(${data.id})'s candidate`);
          const pc = this.receivePCsRef[data.id];
          if (!(pc && data.candidate)) return;
          await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
          console.log(`socketID(${data.id})'s candidate add success`);
        } catch (error) {
          console.log(error);
        }
      }
    );

    
  },
  unmounted(){
      if (this.socketRef) {
        this.socketRef.disconnect();
      }
      if (this.sendPCRef) {
        this.sendPCRef.close();
      }
      this.users.forEach((user) => this.closeReceivePC(user.id));
  },
  components:{
    Video,
    Chatting
  },
  
  data:()=> {
    return {
      socketRef:null,
      localStreamRef: null,
      sendPCRef: null,
      receivePCsRef: [],
      users:[],
      stream:null,
    }
  },
  computed:{
    localVideoRef(){
      return this.$refs.localVideoRef;
    },
    remoteVideoRef(){
      return this.$refs.remoteVideoRef;
    }
  },
  methods:{
    muteVideo(e){
      const target =e.target;
      target.classList.toggle('mute-toggled');
      this.stream
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    },
    muteAudio(e){
      const target = e.target;
      target.classList.toggle('mute-toggled');
      if(target==="Audio off"){
        target==="Audio On";
      }else{
        target="Audio off";
      }
       this.stream
        .getAudioTracks()
        .forEach((track) => (track.enabled = !track.enabled));
   
    },
    closeReceivePC(id){
      if (!this.receivePCsRef[id]) return;
      this.receivePCsRef[id].close();
      delete this.receivePCsRef[id];
    },
    async createReceiverOffer(pc, senderSocketID){
      try {
        const sdp = await pc.createOffer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true,
        });
        console.log("create receiver offer success");
        await pc.setLocalDescription(new RTCSessionDescription(sdp));

        if (!this.socketRef) return;
        this.socketRef.emit("receiverOffer", {
          sdp,
          receiverSocketID: this.socketRef.id,
          senderSocketID,
          roomID: this.roomNumber,
        });
      } catch (error) {
        console.log(error);
      }
    },
    createReceivePC(id){
      try {
          console.log(`socketID(${id}) user entered`);
          const pc = this.createReceiverPeerConnection(id);
          if (!(this.socketRef && pc)) return;
          this.createReceiverOffer(pc, id);
        } catch (error) {
          console.log(error);
        }
    },
    createReceiverPeerConnection(socketID){
      try {
        const pc = new RTCPeerConnection(pc_config);

        // add pc to peerConnections object
        this.receivePCsRef = { ...this.receivePCsRef, [socketID]: pc };

        pc.onicecandidate = (e) => {
          if (!(e.candidate && this.socketRef)) return;
          console.log("receiver PC onicecandidate");
          this.socketRef.emit("receiverCandidate", {
            candidate: e.candidate,
            receiverSocketID: this.socketRef.id,
            senderSocketID: socketID,
          });
        };

        pc.oniceconnectionstatechange = (e) => {
          console.log(e);
        };

        pc.ontrack = (e) => {
          console.log("ontrack success");
          let users=this.users;
          users=users
              .filter((user) => user.id !== socketID)
              .concat({
                id: socketID,
                stream: e.streams[0],
              });
          this.users=users;
        };

        // return pc
        return pc;
      } catch (e) {
        console.error(e);
        return undefined;
      }
    },
    async getLocalStream(){
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: {
            width: 240,
            height: 240,
          },
        });
        this.localStreamRef = this.stream;
        if (this.localVideoRef) this.localVideoRef.srcObject = this.stream;
        if (!this.socketRef) return;

        this.createSenderPeerConnection();
        await this.createSenderOffer();

        this.socketRef.emit("joinRoom", {
          id: this.socketRef.id,
          roomID: this.roomNumber,
        });
      } catch (e) {
        console.log(`getUserMedia error: ${e}`);
      }
    },
    createSenderPeerConnection(){
      const pc = new RTCPeerConnection(pc_config);

      pc.onicecandidate = (e) => {
        if (!(e.candidate && this.socketRef)) return;
        console.log("sender PC onicecandidate");
        this.socketRef.emit("senderCandidate", {
          candidate: e.candidate,
          senderSocketID: this.socketRef.id,
        });
      };

      pc.oniceconnectionstatechange = (e) => {
        console.log(e);
      };

      if (this.localStreamRef) {
        console.log("add local stream");
        this.localStreamRef.getTracks().forEach((track) => {
          if (!this.localStreamRef) return;
          pc.addTrack(track, this.localStreamRef);
        });
      } else {
        console.log("no local stream");
      }

      this.sendPCRef = pc;
    },
    async createSenderOffer(){
      try {
        if (!this.sendPCRef) return;
        const sdp = await this.sendPCRef.createOffer({
          offerToReceiveAudio: false,
          offerToReceiveVideo: false,
        });
        console.log("create sender offer success");
        await this.sendPCRef.setLocalDescription(
          new RTCSessionDescription(sdp)
        );

        if (!this.socketRef) return;
        this.socketRef.emit("senderOffer", {
          sdp,
          senderSocketID: this.socketRef.id,
          roomID: this.roomNumber,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style>
video{
  width: 240px;
  height: 240px;
  margin: 5px;
  background-color: black;
}
.right-side{
  width:20%;
  height: 100%;
  right:0;
  top:0;
  background-color:#edf1f4;
  position: fixed;
}
.mute-toggled{
  background:red;
}
</style>