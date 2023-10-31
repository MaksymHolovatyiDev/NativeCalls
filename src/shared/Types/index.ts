import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket } from 'socket.io-client';

export interface ContextValue {
  type: string;
  setType: (type: any) => void;
  otherUserId: { current: any };
  callerId: string;
  peerConnection: any;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  localStream: any;
  setlocalStream: (data: any) => void;
  remoteStream: any;
  setRemoteStream: (data: any) => void;
}

export interface ICEcandidateSocketProps {
  callerId: string | null;
  rtcMessage: {
    label: any;
    id: string;
    candidate: any;
  };
}

export interface ICEcallSocketProps
  extends Pick<ICEcandidateSocketProps, 'rtcMessage'> {
  calleeId: string | null;
  rtcMessage: {
    label: any;
    id: string;
    candidate: any;
  };
}
