import { StyleSheet } from 'react-native';
import { colors } from '../../shared/colors';

export const styles = StyleSheet.create({
  root: {
    padding: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  text: {
    fontSize: 16,
    color: colors.WhiteSecondary,
  },
  textIncomming: {
    fontSize: 36,
    marginTop: 12,
    color: '#ffff',
  },
  id: {
    fontSize: 36,
    marginTop: 12,
    color: colors.White,
    letterSpacing: 6,
  },
});
