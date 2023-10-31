import IconContainer from '../../entities/IconContainer/IconContainer';
import { CameraSwitch, VideoOff, VideoOn } from './assets';
import { useCamera } from './lib/hooks';
import { styles } from './styles';

export const CameraControl = () => {
  const { toggleCamera, switchCamera, localWebcamOn } = useCamera();

  return (
    <>
      <IconContainer
        style={styles.root}
        backgroundColor={!localWebcamOn ? '#fff' : 'transparent'}
        onPress={() => {
          toggleCamera();
        }}
        Icon={() => {
          return localWebcamOn ? (
            <VideoOn height={24} width={24} fill="#FFF" />
          ) : (
            <VideoOff height={36} width={36} fill="#1D2939" />
          );
        }}
      />
      <IconContainer
        style={styles.root}
        backgroundColor={'transparent'}
        onPress={() => {
          switchCamera();
        }}
        Icon={() => {
          return <CameraSwitch height={24} width={24} fill="#FFF" />;
        }}
      />
    </>
  );
};
