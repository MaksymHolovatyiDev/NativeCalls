import { View } from 'react-native';

import { Stream } from '../../entities/Stream';
import { ControlPanel } from '../../widgets/ControlPanel';
import { styles } from './styles';

export const WebrtcRoomScreen = () => {
  return (
    <View style={styles.root}>
      <Stream />
      <ControlPanel />
    </View>
  );
};
