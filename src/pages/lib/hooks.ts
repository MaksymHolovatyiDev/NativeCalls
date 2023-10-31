import { useEffect, useState, useRef } from 'react';

import {
  mediaDevices,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';

import { useData } from '../../shared/provider';
import { ICEcallSocketProps } from '../../shared/Types';

export const usePages = () => {
  const {
    socket,
    otherUserId,
    setType,
    peerConnection,
    setlocalStream,
    setRemoteStream,
  } = useData();

  let remoteRTCMessage: any = useRef(null);

  function sendICEcandidate(data: ICEcallSocketProps) {
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
          .then(() => {
            console.log('SUCCESS');
          })
          .catch((err: any) => {
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
          setlocalStream(stream);

          for (const track of stream._tracks) {
            peerConnection.current.addTrack(track, stream);
          }
        })
        .catch(error => {
          console.log(error);
        });
    });

    peerConnection.current.addEventListener('track', (event: any) => {
      setRemoteStream(event.streams[0]);
    });

    peerConnection.current.addEventListener('icecandidate', (event: any) => {
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

  return { remoteRTCMessage };
};
