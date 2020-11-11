import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    width: '100%',
    height: '45%',
    backgroundColor: '#8257e5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    height: '55%',
    backgroundColor: '#F0F0F7',
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  background: {
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontSize: 40,
    fontFamily: 'Archivo_400Regular',
    color: '#C1BCCC',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins_400Regular',
    width: 250,
    color: '#6A6180',
  },
  footer: {
    flex: 1,
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pageIndicator: {
    flexDirection: 'row',
  },
  square1: {
    width: 4,
    height: 4,
    backgroundColor: '#8257E5',
    marginRight: 7,
    borderRadius: 1,
  },
  square2: {
    width: 4,
    height: 4,
    backgroundColor: '#C1BCCC',
    borderRadius: 1,
  },
});

export default styles;
