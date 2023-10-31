import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';

import TextInputContainer from '../../entities/TextInputContainer';
import { useCall } from './lib/hooks';
import { useData } from '../../shared/provider';

export const CallToUser = () => {
  const { processCall } = useCall();
  const { otherUserId, setType } = useData();

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Enter call id of another user</Text>
      <TextInputContainer
        placeholder={'Enter Caller ID'}
        value={otherUserId.current}
        setValue={(text: any) => {
          otherUserId.current = text;
        }}
        keyboardType={'number-pad'}
      />
      <TouchableOpacity
        onPress={() => {
          processCall();
          setType('OUTGOING_CALL');
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Call Now</Text>
      </TouchableOpacity>
    </View>
  );
};
