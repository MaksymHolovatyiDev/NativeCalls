import { useEffect, useState } from 'react';

import InCallManager from 'react-native-incall-manager';

import { View } from 'react-native';
import { RTCView } from 'react-native-webrtc';

import {
  MicOn,
  MicOff,
  VideoOff,
  VideoOn,
  CameraSwitch,
  CallEnd,
} from '../assets';

import IconContainer from '../components/IconContainer/IconContainer';

export const WebrtcRoomScreen = ({
  localStream,
  remoteStream,
  setlocalStream,
  peerConnection,
  setType,
}: any) => {
  const [localMicOn, setlocalMicOn] = useState(true);

  // Handling Camera status
  const [localWebcamOn, setlocalWebcamOn] = useState(true);

  // Destroy WebRTC Connection
  function leave() {
    peerConnection.current.close();
    setlocalStream(null);
    setType('JOIN');
  }

  // Enable/Disable Mic
  function toggleMic() {
    localMicOn ? setlocalMicOn(false) : setlocalMicOn(true);
    localStream.getAudioTracks().forEach((track: any) => {
      localMicOn ? (track.enabled = false) : (track.enabled = true);
    });
  }

  // Switch Camera
  function switchCamera() {
    localStream.getVideoTracks().forEach((track: any) => {
      track._switchCamera();
    });
  }

  // Enable/Disable Camera
  function toggleCamera() {
    localWebcamOn ? setlocalWebcamOn(false) : setlocalWebcamOn(true);
    localStream.getVideoTracks().forEach((track: any) => {
      localWebcamOn ? (track.enabled = false) : (track.enabled = true);
    });
  }

  useEffect(() => {
    InCallManager.start();
    InCallManager.setKeepScreenOn(true);
    InCallManager.setForceSpeakerphoneOn(true);

    return () => {
      InCallManager.stop();
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#050A0E',
        paddingHorizontal: 12,
        paddingVertical: 12,
      }}
    >
      {localStream ? (
        <RTCView
          objectFit={'cover'}
          style={{ flex: 1, backgroundColor: '#050A0E' }}
          streamURL={localStream.toURL()}
        />
      ) : null}
      {remoteStream ? (
        <RTCView
          objectFit={'cover'}
          style={{
            flex: 1,
            backgroundColor: '#050A0E',
            marginTop: 8,
          }}
          streamURL={remoteStream.toURL()}
        />
      ) : null}
      <View
        style={{
          marginVertical: 12,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
      >
        <IconContainer
          backgroundColor={'red'}
          onPress={() => {
            leave();
            setlocalStream(null);
          }}
          Icon={() => {
            return <CallEnd height={26} width={26} fill="#FFF" />;
          }}
        />
        <IconContainer
          style={{
            borderWidth: 1.5,
            borderColor: '#2B3034',
          }}
          backgroundColor={!localMicOn ? '#fff' : 'transparent'}
          onPress={() => {
            toggleMic();
          }}
          Icon={() => {
            return localMicOn ? (
              <MicOn height={24} width={24} fill="#FFF" />
            ) : (
              <MicOff height={28} width={28} fill="#1D2939" />
            );
          }}
        />
        <IconContainer
          style={{
            borderWidth: 1.5,
            borderColor: '#2B3034',
          }}
          backgroundColor={!localWebcamOn ? '#fff' : 'transparent'}
          onPress={() => {
            toggleCamera();
          }}
          Icon={() => {
            return localWebcamOn ? (
              <VideoOn height={24} width={24} fill="#FFF" />
            ) : (
              <VideoOff height={36} width={36} fill="#1D2939" />
            );
          }}
        />
        <IconContainer
          style={{
            borderWidth: 1.5,
            borderColor: '#2B3034',
          }}
          backgroundColor={'transparent'}
          onPress={() => {
            switchCamera();
          }}
          Icon={() => {
            return <CameraSwitch height={24} width={24} fill="#FFF" />;
          }}
        />
      </View>
    </View>
  );
};
