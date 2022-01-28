let servers = [
    "iphone-stun.strato-iphone.de:3478",
    "numb.viagenie.ca:3478",
    "stun.12connect.com:3478",
    "stun.12voip.com:3478",
    "stun.1und1.de:3478",
    "stun.3cx.com:3478",
    "stun.acrobits.cz:3478",
    "stun.actionvoip.com:3478",
    "stun.advfn.com:3478",
    "stun.altar.com.pl:3478",
    "stun.antisip.com:3478",
    "stun.avigora.fr:3478",
    "stun.bluesip.net:3478",
    "stun.cablenet-as.net:3478",
    "stun.callromania.ro:3478",
    "stun.callwithus.com:3478",
    "stun.cheapvoip.com:3478",
    "stun.cloopen.com:3478",
    "stun.commpeak.com:3478",
    "stun.cope.es:3478",
    "stun.counterpath.com:3478",
    "stun.counterpath.net:3478",
    "stun.dcalling.de:3478",
    "stun.demos.ru:3478",
    "stun.dus.net:3478",
    "stun.easycall.pl:3478",
    "stun.easyvoip.com:3478",
    "stun.ekiga.net:3478",
    "stun.epygi.com:3478",
    "stun.etoilediese.fr:3478",
    "stun.faktortel.com.au:3478",
    "stun.freecall.com:3478",
    "stun.freeswitch.org:3478",
    "stun.freevoipdeal.com:3478",
    "stun.gmx.de:3478",
    "stun.gmx.net:3478",
    "stun.halonet.pl:3478",
    "stun.hoiio.com:3478",
    "stun.hosteurope.de:3478",
    "stun.infra.net:3478",
    "stun.internetcalls.com:3478",
    "stun.intervoip.com:3478",
    "stun.ipfire.org:3478",
    "stun.ippi.fr:3478",
    "stun.ipshka.com:3478",
    "stun.it1.hr:3478",
    "stun.ivao.aero:3478",
    "stun.jumblo.com:3478",
    "stun.justvoip.com:3478",
    "stun.l.google.com:19302",
    "stun.linphone.org:3478",
    "stun.liveo.fr:3478",
    "stun.lowratevoip.com:3478",
    "stun.lundimatin.fr:3478",
    "stun.mit.de:3478",
    "stun.miwifi.com:3478",
    "stun.modulus.gr:3478",
    "stun.myvoiptraffic.com:3478",
    "stun.netappel.com:3478",
    "stun.netgsm.com.tr:3478",
    "stun.nfon.net:3478",
    "stun.nonoh.net:3478",
    "stun.nottingham.ac.uk:3478",
    "stun.ooma.com:3478",
    "stun.ozekiphone.com:3478",
    "stun.pjsip.org:3478",
    "stun.poivy.com:3478",
    "stun.powervoip.com:3478",
    "stun.ppdi.com:3478",
    "stun.qq.com:3478",
    "stun.rackco.com:3478",
    "stun.rockenstein.de:3478",
    "stun.rolmail.net:3478",
    "stun.rynga.com:3478",
    "stun.schlund.de:3478",
    "stun.sigmavoip.com:3478",
    "stun.sip.us:3478",
    "stun.sipdiscount.com:3478",
    "stun.sipgate.net:10000",
    "stun.sipgate.net:3478",
    "stun.siplogin.de:3478",
    "stun.sipnet.net:3478",
    "stun.sipnet.ru:3478",
    "stun.sippeer.dk:3478",
    "stun.siptraffic.com:3478",
    "stun.sma.de:3478",
    "stun.smartvoip.com:3478",
    "stun.smsdiscount.com:3478",
    "stun.solcon.nl:3478",
    "stun.solnet.ch:3478",
    "stun.sonetel.com:3478",
    "stun.sonetel.net:3478",
    "stun.sovtest.ru:3478",
    "stun.srce.hr:3478",
    "stun.stunprotocol.org:3478",
    "stun.t-online.de:3478",
    "stun.tel.lu:3478",
    "stun.telbo.com:3478",
    "stun.tng.de:3478",
    "stun.twt.it:3478",
    "stun.uls.co.za:3478",
    "stun.unseen.is:3478",
    "stun.usfamily.net:3478",
    "stun.viva.gr:3478",
    "stun.vivox.com:3478",
    "stun.vo.lu:3478",
    "stun.voicetrading.com:3478",
    "stun.voip.aebc.com:3478",
    "stun.voip.blackberry.com:3478",
    "stun.voip.eutelia.it:3478",
    "stun.voipblast.com:3478",
    "stun.voipbuster.com:3478",
    "stun.voipbusterpro.com:3478",
    "stun.voipcheap.co.uk:3478",
    "stun.voipcheap.com:3478",
    "stun.voipgain.com:3478",
    "stun.voipgate.com:3478",
    "stun.voipinfocenter.com:3478",
    "stun.voipplanet.nl:3478",
    "stun.voippro.com:3478",
    "stun.voipraider.com:3478",
    "stun.voipstunt.com:3478",
    "stun.voipwise.com:3478",
    "stun.voipzoom.com:3478",
    "stun.voys.nl:3478",
    "stun.voztele.com:3478",
    "stun.webcalldirect.com:3478",
    "stun.wifirst.net:3478",
    "stun.xtratelecom.es:3478",
    "stun.zadarma.com:3478",
    "stun1.faktortel.com.au:3478",
    "stun1.l.google.com:19302",
    "stun2.l.google.com:19302",
    "stun3.l.google.com:19302",
    "stun4.l.google.com:19302",
    "stun.nextcloud.com:443",
    "relay.webwormhole.io:3478"
];
/**
 * Helper method to check if a STUN address is reachable.
 * 
 * @param address The Domain and port of the STUN server.
 * @param _timeout The connection timeout (Limit when the connection takes too long). By default is 6 seconds.
 * @returns 
 */
 function isStunAddressUp(address, _timeout){
    _timeout = _timeout || 6000;
    let response = {
        myIpAddress: "",
        stun: address,
        ipv6Supported: true,
        errors: []
    };

    let checker = new Promise((resolve, reject) => {
        const pc = new RTCPeerConnection({
            iceServers: [
                {urls: `stun:${address}?transport=udp`}
            ]
        });
        
        pc.onicecandidate = (e) => {
            if (!e.candidate) return;

            // If a srflx candidate was found, notify that the STUN server works and provide the IP
            if(e.candidate.type == "srflx"){
                response.myIpAddress = e.candidate.address;
                pc.close();
            }
        };
        
        // Log errors:
        // Remember that in most of the cases, even if its working, you will find a STUN host lookup received error
        // Chrome tried to look up the IPv6 DNS record for server and got an error in that process. However, it may still be accessible through the IPv4 address
        pc.onicecandidateerror = (e) => {
            if(e.address == "[0:0:0:x:x:x:x:x]"){
                response.ipv6Supported = false;
            }
            
            response.errors.push(e);
        };
        
        pc.onclose = function () {
            console.log("datachannel close");
        };
        
        var dc = pc.createDataChannel('ourcodeworld-rocks');
        pc.createOffer().then(offer => pc.setLocalDescription(offer));

        dc.onclose = function (e) {
            resolve(response);
        };
    });

    let timeout = new Promise(function(resolve, reject){
        setTimeout(function() {
            reject(response);
        }, _timeout);
    });

    return Promise.race([checker, timeout]);
}

for(let i=0;i<servers.length;i++){
    isStunAddressUp(servers[i], 2000).then(function(result){
        console.log(result);
        console.log('hello');
        // `result` Should contain an object like this:
        //{
        //    "myIpAddress": "[::ffff:xxx.xxx.xx.xx]",
        //    "stun": "stun.ipfire.org:3478",
        //    "ipv6Supported": true,
        //    "errors": []
        //}
    }).catch(function(err){
        // Something went wrong
        console.log(err);
    });
}

    


