import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#8257E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 500,
    width: 500,
  },
  title: {
    width: 250,
    color: '#fff',
    fontSize: 32,
    fontFamily: 'Archivo_700Bold',
    lineHeight: 37,
    textAlign: 'center',

    marginTop: 20,
    marginBottom: 20,
  },
  subtitle: {
    width: 250,
    textAlign: 'center',

    lineHeight: 24,
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#D4C2FF',
  },
  button: {
    width: 300,
    borderRadius: 8,
    backgroundColor: '#04D361',
    height: 56,

    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Archivo_700Bold',
  },
});

export default styles;
