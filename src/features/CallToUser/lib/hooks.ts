import { useData } from '../../../shared/provider';
import { ICEcallSocketProps } from '../../../shared/Types';

export const useCall = () => {
  const { otherUserId, peerConnection, socket } = useData();

  function sendCall(data: ICEcallSocketProps) {
    socket.emit('call', data);
  }

  async function processCall() {
    const sessionDescription = await peerConnection.current.createOffer({
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: true,
      VoiceActivityDetection: true,
    });

    await peerConnection.current.setLocalDescription(sessionDescription);

    sendCall({
      calleeId: otherUserId.current,
      rtcMessage: sessionDescription,
    });
  }

  return { processCall };
};
