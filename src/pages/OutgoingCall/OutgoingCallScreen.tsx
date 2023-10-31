import { View } from 'react-native';

import { styles } from './styles';

import { CallingId } from '../../entities/CallingId';
import { CallAction } from '../../features/CallAction';

export const OutgoingCallScreen = () => {
  return (
    <View style={styles.root}>
      <CallingId />
      <CallAction />
    </View>
  );
};
