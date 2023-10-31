import { StyleSheet } from 'react-native';
import { colors } from '../../shared/colors';

export const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.BlackSecondary,
    padding: 40,
    marginTop: 25,
    justifyContent: 'center',
    borderRadius: 14,
  },
  text: {
    fontSize: 18,
    color: colors.WhiteSecondary,
  },
  button: {
    height: 50,
    backgroundColor: colors.Blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    color: colors.White,
  },
});
