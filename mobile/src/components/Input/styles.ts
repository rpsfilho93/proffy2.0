import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 64,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E6E6F0',
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,

    justifyContent: 'center',
  },
  containerOnFocus: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#6A6180',
    width: '90%',
    paddingRight: 10,
  },
  placeholder: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    color: '#9C98A6',
  },
  seePasswordIcon: {
    marginLeft: 10,
  },
});

export default styles;
