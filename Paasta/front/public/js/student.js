const pc_config = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};
const SOCKET_SERVER_URL = "http://localhost:8080";
let localStreamRef=null;
let sendPCRef= null;
let receivePCsRef=[];
let users = [];
let localVideoRef = null;

const closeReceivePC = (id) => {
    if (!receivePCsRef[id]) return;
    receivePCsRef[id].close();
    delete receivePCsRef[id];
};

const createReceiverOffer = async (pc, senderSocketID) => {
  try {
    const sdp = await pc.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });
    console.log("create receiver offer success");
    await pc.setLocalDescription(new RTCSessionDescription(sdp));

    if (!socketRef) return;
    socketRef.emit("receiverOffer", {
      sdp,
      receiverSocketID: socketRef.id,
      senderSocketID,
      roomID: "1234",
    });
  } catch (error) {
    console.log(error);
  }
}

window.onload = () => {
    document.getElementById('my-button').onclick = () => {
        init();
    }
}

async function init() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    document.getElementById("video").srcObject = stream;
    const peer = createPeer();
    stream.getTracks().forEach(track => peer.addTrack(track, stream));
}


function createPeer() {
    const peer = new RTCPeerConnection(pc_config);
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);

    return peer;
}

async function handleNegotiationNeededEvent(peer) {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    const payload = {
        sdp: peer.localDescription
    };

    const { data } = await axios.post('/broadcast', payload);
    const desc = new RTCSessionDescription(data.sdp);
    peer.setRemoteDescription(desc).catch(e => console.log(e));
}


