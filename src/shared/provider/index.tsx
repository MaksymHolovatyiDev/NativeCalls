import { createContext, useContext, ReactNode, useState, useRef } from 'react';

import SocketIOClient from 'socket.io-client';
import { RTCPeerConnection } from 'react-native-webrtc';

import { RoutesNames } from '../../shared/RoutesNames';
import { RandomizeId } from './lib';
import { ContextValue } from '../Types';

const DataContext = createContext<ContextValue>({} as ContextValue);

export const useData = () => useContext(DataContext);

const DataProvider = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState(RoutesNames.Join);

  const [localStream, setlocalStream] = useState<any>(null);
  const [remoteStream, setRemoteStream] = useState<any>(null);

  const [callerId] = useState(RandomizeId());

  const otherUserId = useRef(null);

  const peerConnection = useRef(
    new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    })
  );

  const socket = SocketIOClient('http://192.168.0.108:3500', {
    transports: ['websocket'],
    query: {
      callerId,
    },
  });

  const value = {
    type,
    setType,
    otherUserId,
    callerId,
    peerConnection,
    socket,
    localStream,
    setlocalStream,
    remoteStream,
    setRemoteStream,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
