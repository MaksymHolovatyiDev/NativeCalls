import { useState } from 'react';
import { useData } from '../../../shared/provider';

export const useMic = () => {
  const [localMicOn, setlocalMicOn] = useState(true);

  const { localStream } = useData();

  function toggleMic() {
    localMicOn ? setlocalMicOn(false) : setlocalMicOn(true);
    localStream.getAudioTracks().forEach((track: any) => {
      localMicOn ? (track.enabled = false) : (track.enabled = true);
    });
  }

  return { toggleMic, localMicOn };
};
