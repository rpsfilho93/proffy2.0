import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E6E6F0',
    backgroundColor: '#FAFAFC',
    height: 54,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 9,

    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    color: '#9C98A6',
    marginBottom: 5,
  },
  input: {
    fontSize: 14,
    color: '#6A6180',
    fontFamily: 'Poppins_400Regular',
  },
});

export default styles;
