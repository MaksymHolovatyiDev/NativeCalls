import { StyleSheet } from 'react-native';
import { colors } from '../../shared/colors';

export const styles = StyleSheet.create({
  contaiener: {
    padding: 35,
    backgroundColor: colors.BlackSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },

  text: {
    fontSize: 18,
    color: '#D0D4DD',
  },
  idContainer: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
  },
  id: {
    fontSize: 32,
    color: '#ffff',
    letterSpacing: 6,
  },
});
