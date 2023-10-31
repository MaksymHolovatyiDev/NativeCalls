import { RTCView } from 'react-native-webrtc';

import { useData } from '../../shared/provider';
import { styles } from './styles';

export const Stream = () => {
  const { localStream, remoteStream } = useData();

  return (
    <>
      {localStream ? (
        <RTCView
          objectFit={'cover'}
          style={styles.local}
          streamURL={localStream.toURL()}
        />
      ) : null}
      {remoteStream ? (
        <RTCView
          objectFit={'cover'}
          style={styles.remote}
          streamURL={remoteStream.toURL()}
        />
      ) : null}
    </>
  );
};
