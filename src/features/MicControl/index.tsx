import IconContainer from '../../entities/IconContainer/IconContainer';
import { MicOff, MicOn } from './assets';
import { useMic } from './lib';
import { styles } from './styles';

export const MicControl = () => {
  const { toggleMic, localMicOn } = useMic();

  return (
    <IconContainer
      style={styles.root}
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
  );
};
