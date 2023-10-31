import { View } from 'react-native';

import { CallingId } from '../../entities/CallingId';
import { CallAction } from '../../features/CallAction';
import { styles } from './styles';

export const IncomingCallScreen = ({ remoteRTCMessage }: any) => {
  return (
    <View style={styles.root}>
      <CallingId incoming />
      <CallAction incoming remoteRTCMessage={remoteRTCMessage} />
    </View>
  );
};
