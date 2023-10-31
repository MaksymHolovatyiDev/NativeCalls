import { useState } from 'react';
import { useData } from '../../../shared/provider';

export const useCamera = () => {
  const [localWebcamOn, setlocalWebcamOn] = useState(true);

  const { localStream } = useData();

  function switchCamera() {
    localStream.getVideoTracks().forEach((track: any) => {
      track._switchCamera();
    });
  }

  function toggleCamera() {
    localWebcamOn ? setlocalWebcamOn(false) : setlocalWebcamOn(true);
    localStream.getVideoTracks().forEach((track: any) => {
      localWebcamOn ? (track.enabled = false) : (track.enabled = true);
    });
  }

  return { toggleCamera, switchCamera, localWebcamOn };
};
