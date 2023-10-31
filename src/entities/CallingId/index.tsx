import { View, Text } from 'react-native';

import { styles } from './styles';

import { useData } from '../../shared/provider';

export const CallingId = ({ incoming = false }: { incoming?: boolean }) => {
  const { otherUserId } = useData();

  return (
    <View style={styles.root}>
      <Text style={incoming ? styles.text : styles.textIncomming}>
        {incoming ? `${otherUserId.current} is calling..` : 'Calling to...'}
      </Text>

      {!incoming && <Text style={styles.id}>{otherUserId.current}</Text>}
    </View>
  );
};
