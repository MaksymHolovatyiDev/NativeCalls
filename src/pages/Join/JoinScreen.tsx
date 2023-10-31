import {
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { styles } from './styles';
import { CallToUser } from '../../features/CallToUser';
import { CallerId } from '../../entities/CallerId';

export const JoinScreen = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.root}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <CallerId />
          <CallToUser />
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
