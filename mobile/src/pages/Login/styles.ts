import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  banner: {
    backgroundColor: '#8257E5',
    height: 280,
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
    paddingHorizontal: 30,
    paddingTop: 30,
    backgroundColor: '#FAFAFC',
    height: 400,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    color: '#32264D',
  },
  newAccount: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#8257E5',
  },
  rememberForgotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberButton: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginRight: 15,
  },
  rememberButtonActive: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: '#04D361',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rememberText: {
    color: '#9C98A6',
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
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
