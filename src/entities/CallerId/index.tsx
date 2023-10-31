import { View, Text } from 'react-native';

import { useData } from '../../shared/provider';

import { styles } from './styes';

export const CallerId = () => {
  const { callerId } = useData();

  return (
    <View style={styles.contaiener}>
      <Text style={styles.text}>Your Caller ID</Text>
      <View style={styles.idContainer}>
        <Text style={styles.id}>{callerId}</Text>
      </View>
    </View>
  );
};
