import { View } from 'react-native';
import { EndCallButton } from '../../entities/EndCallButton';
import { MicControl } from '../../features/MicControl';
import { CameraControl } from '../../features/CameraControl';
import { styles } from './styles';
import { useControlPanel } from './lib/hooks';

export const ControlPanel = () => {
  useControlPanel();

  return (
    <View style={styles.root}>
      <EndCallButton />
      <MicControl />
      <CameraControl />
    </View>
  );
};
