import { View, TouchableOpacity } from 'react-native';

import { styles } from './styles';

import { CallAnswer, CallEnd } from './assets';
import { colors } from '../../shared/colors';
import { useCallAction } from './lib/hooks';

export const CallAction = ({
  incoming = false,
  remoteRTCMessage,
}: {
  incoming?: boolean;
  remoteRTCMessage?: any;
}) => {
  const OnButtonPerss = useCallAction(incoming, remoteRTCMessage);

  return (
    <View style={styles.root}>
      <TouchableOpacity
        onPress={OnButtonPerss}
        style={{
          ...styles.button,
          backgroundColor: incoming ? colors.Green : colors.Red,
        }}
      >
        {incoming ? (
          <CallAnswer height={28} fill={'#fff'} />
        ) : (
          <CallEnd width={50} height={12} />
        )}
      </TouchableOpacity>
    </View>
  );
};
