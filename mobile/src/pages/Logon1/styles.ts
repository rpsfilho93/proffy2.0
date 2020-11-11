import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    justifyContent: 'flex-end',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 20,
    marginTop: 20,
  },
  pageIndicator: {
    flexDirection: 'row',
  },
  square1: {
    width: 4,
    height: 4,
    backgroundColor: '#8257E5',
    marginRight: 7,
    borderRadius: 2,
  },
  square2: {
    width: 4,
    height: 4,
    backgroundColor: '#C1BCCC',
    borderRadius: 2,
  },
  title: {
    width: 260,
    paddingLeft: 20,
    color: '#32264D',
    fontSize: 32,
    fontFamily: 'Poppins_600SemiBold',

    marginBottom: 10,
  },
  subtitle: {
    width: 230,
    paddingLeft: 20,
    color: '#6A6180',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 24,
  },
  form: {
    marginTop: 100,
    paddingHorizontal: 20,
  },
  formTitle: {
    color: '#32264D',
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 20,
  },
  loginButton: {
    width: '100%',
    marginTop: 20,

    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    backgroundColor: '#DCDCE5',
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#9C98A6',
    fontSize: 16,
    fontFamily: 'Archivo_700Bold',
  },
});

export default styles;
