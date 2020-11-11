import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    backgroundColor: '#8257e5',
    width: '100%',
    height: '47%',
    resizeMode: 'contain',

    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontFamily: 'Poppins_400Regular',
    color: '#D4C2FF',
  },
  quitButton: {
    height: 45,
    width: 45,
    borderRadius: 8,
    backgroundColor: '#774DD6',

    justifyContent: 'center',
    alignItems: 'center',
  },
  quitIcon: {
    height: 25,
    width: 25,
  },
  content: {
    height: '100%',
    paddingHorizontal: 40,
    backgroundColor: '#FAFAFC',
    justifyContent: 'flex-start',
  },
  title: {
    fontFamily: 'Poppins_400Regular',
    color: '#6A6180',
    fontSize: 20,
    lineHeight: 30,
    marginTop: 30,
  },
  titleBold: {
    fontFamily: 'Poppins_600SemiBold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  button: {
    height: 150,
    width: '48%',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 24,
    justifyContent: 'space-between',
  },
  buttonPrimary: {
    backgroundColor: '#8257e5',
  },
  buttonSecondary: {
    backgroundColor: '#04D361',
  },
  buttonText: {
    fontFamily: 'Archivo_700Bold',
    color: '#FFF',
    fontSize: 20,
  },
  totalConnections: {
    fontFamily: 'Poppins_400Regular',
    color: '#9C98A6',
    fontSize: 12,
    lineHeight: 20,
    maxWidth: 140,
    marginTop: 10,
  },
});

export default styles;
