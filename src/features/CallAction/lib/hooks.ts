import { RTCSessionDescription } from 'react-native-webrtc';
import { ICEcandidateSocketProps } from '../../../shared/Types';
import { useData } from '../../../shared/provider';

export const useCallAction = (data: boolean, remoteRTCMessage: any) => {
  const { setType, otherUserId, socket, peerConnection } = useData();

  if (!data)
    return () => {
      setType('JOIN');
      otherUserId.current = null;
    };

  function answerCall(data: ICEcandidateSocketProps) {
    socket.emit('answerCall', data);
  }

  async function processAccept() {
    peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(remoteRTCMessage.current)
    );

    const sessionDescription = await peerConnection.current.createAnswer();

    await peerConnection.current.setLocalDescription(sessionDescription);
    answerCall({
      callerId: otherUserId.current,
      rtcMessage: sessionDescription,
    });
  }

  return () => {
    processAccept();
    setType('WEBRTC_ROOM');
  };
};
