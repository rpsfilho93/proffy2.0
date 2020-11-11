import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  banner: {
    height: '40%',
    backgroundColor: '#8257E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    height: '60%',
    paddingHorizontal: 30,
    paddingTop: 30,
    backgroundColor: '#FAFAFC',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    color: '#32264D',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#6A6180',
    lineHeight: 25,
    marginBottom: 16,
  },
});

export default styles;
