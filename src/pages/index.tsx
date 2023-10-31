import { RoutesNames } from '../shared/RoutesNames';

import { JoinScreen } from './Join/JoinScreen';
import { IncomingCallScreen } from './IncomingCall/IncomingCallScreen';
import { OutgoingCallScreen } from './OutgoingCall/OutgoingCallScreen';
import { WebrtcRoomScreen } from './WebrtcRoom/WebrtcRoomScreen';

import { useData } from '../shared/provider';
import { usePages } from './lib/hooks';

export const Pages = () => {
  const { type } = useData();

  const { remoteRTCMessage } = usePages();

  switch (type) {
    case RoutesNames.Join:
      return <JoinScreen />;
    case RoutesNames.Incoming:
      return <IncomingCallScreen remoteRTCMessage={remoteRTCMessage} />;
    case RoutesNames.Outgoing:
      return <OutgoingCallScreen />;
    case RoutesNames.Room:
      return <WebrtcRoomScreen />;
    default:
      return null;
  }
};
