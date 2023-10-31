import IconContainer from '../IconContainer/IconContainer';
import { CallEnd } from './asset/idnex';
import { useEndCall } from './lib/hooks';

export const EndCallButton = () => {

    const onCallEnd = useEndCall();

  return (
    <IconContainer
      backgroundColor={'red'}
      onPress={onCallEnd}
      Icon={() => {
        return <CallEnd height={26} width={26} fill="#FFF" />;
      }}
    />
  );
};
