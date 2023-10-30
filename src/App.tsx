import { useEffect, useState, useRef } from 'react';

import SocketIOClient from 'socket.io-client'; // import socket io
// import WebRTC
import {
  mediaDevices,
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';

import { IncomingCallScreen } from './screens/IncomingCallScreen';
import { JoinScreen } from './screens/JoinScreen';
import { OutgoingCallScreen } from './screens/OutgoingCallScreen';
import { WebrtcRoomScreen } from './screens/WebrtcRoomScreen';

export default function App({}) {
  const [type, setType] = useState('JOIN');

  const [callerId] = useState(
    Math.floor(100000 + Math.random() * 900000).toString()
  );

  const otherUserId = useRef(null);

  // Stream of local user
  const [localStream, setlocalStream] = useState<any>(null);

  /* When a call is connected, the video stream from the receiver is appended to this state in the stream*/
  const [remoteStream, setRemoteStream] = useState<any>(null);

  // This establishes your WebSocket connection
  const socket = SocketIOClient('http://192.168.0.108:3500', {
    transports: ['websocket'],
    query: {
      callerId,
      /* We have generated this `callerId` in `JoinScreen` implementation */
    },
  });

  /* This creates an WebRTC Peer Connection, which will be used to set local/remote descriptions and offers. */
  const peerConnection = useRef(
    new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    })
  );

  let remoteRTCMessage: any = useRef(null);

  function sendICEcandidate(data: any) {
    socket.emit('ICEcandidate', data);
  }

  useEffect(() => {
    socket.on('newCall', data => {
      remoteRTCMessage.current = data.rtcMessage;
      otherUserId.current = data.callerId;
      setType('INCOMING_CALL');
    });

    socket.on('callAnswered', data => {
      remoteRTCMessage.current = data.rtcMessage;
      peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(remoteRTCMessage.current)
      );
      setType('WEBRTC_ROOM');
    });

    socket.on('ICEcandidate', data => {
      let message = data.rtcMessage;

      if (peerConnection.current) {
        peerConnection?.current
          .addIceCandidate(
            new RTCIceCandidate({
              candidate: message.candidate,
              sdpMid: message.id,
              sdpMLineIndex: message.label,
            })
          )
          .then(data => {
            console.log('SUCCESS');
          })
          .catch(err => {
            console.log('Error', err);
          });
      }
    });

    let isFront = false;

    mediaDevices.enumerateDevices().then((sourceInfos: any) => {
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          sourceInfo.kind == 'videoinput' &&
          sourceInfo.facing == (isFront ? 'user' : 'environment')
        ) {
          videoSourceId = sourceInfo.deviceId;
        }
      }

      mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            mandatory: {
              minWidth: 500, // Provide your own width, height and frame rate here
              minHeight: 300,
              minFrameRate: 30,
            },
            facingMode: isFront ? 'user' : 'environment',
            optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
          },
        })
        .then((stream: any) => {
          // Got stream!
          setlocalStream(stream);

          // setup stream listening

          for (const track of stream._tracks) {
            peerConnection.current.addTrack(track, stream);
          }
        })
        .catch(error => {
          console.log(error);
        });
    });

    peerConnection.current.addEventListener('track', event => {
      setRemoteStream(event.streams[0]);
    });

    peerConnection.current.addEventListener('icecandidate', event => {
      if (event.candidate) {
        sendICEcandidate({
          calleeId: otherUserId.current,
          rtcMessage: {
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate,
          },
        });
      } else {
        console.log('End of candidates.');
      }
    });

    return () => {
      socket.off('newCall');
      socket.off('callAnswered');
      socket.off('ICEcandidate');
    };
  }, []);

  switch (type) {
    case 'JOIN':
      return (
        <JoinScreen
          setType={setType}
          otherUserId={otherUserId}
          callerId={callerId}
          peerConnection={peerConnection}
          socket={socket}
        />
      );
    case 'INCOMING_CALL':
      return (
        <IncomingCallScreen
          setType={setType}
          otherUserId={otherUserId}
          socket={socket}
          peerConnection={peerConnection}
          remoteRTCMessage={remoteRTCMessage}
        />
      );
    case 'OUTGOING_CALL':
      return <OutgoingCallScreen setType={setType} otherUserId={otherUserId} />;
    case 'WEBRTC_ROOM':
      return (
        <WebrtcRoomScreen
          localStream={localStream}
          remoteStream={remoteStream}
          setlocalStream={setlocalStream}
          peerConnection={peerConnection}
          setType={setType}
        />
      );
    default:
      return null;
  }
}
