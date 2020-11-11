import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e6e6f0',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#eee',
  },
  profileInfo: {
    marginLeft: 16,
  },
  name: {
    fontFamily: 'Archivo_700Bold',
    color: '#32264d',
    fontSize: 20,
  },
  subject: {
    fontFamily: 'Poppins_400Regular',
    color: '#6a6180',
    fontSize: 12,
    marginTop: 4,
  },
  bio: {
    marginHorizontal: 24,
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 27,
    color: '#6a6180',
    textAlign: 'justify',
  },
  scheduleContainer: {
    marginTop: 20,

    paddingTop: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E6E6F0',
  },
  title: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    color: '#9C98A6',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 11,
    paddingRight: 33,
    paddingBottom: 5,
  },
  dayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderWidth: 1,
    borderColor: '#E6E6F0',
    borderRadius: 8,

    paddingHorizontal: 10,
    marginBottom: 5,
  },
  scheduleText: {
    width: 80,
    color: '#6A6180',
    fontSize: 16,
    fontFamily: 'Archivo_700Bold',
  },
  footer: {
    backgroundColor: '#fafafc',
    padding: 24,
    alignItems: 'center',
    marginTop: 24,
  },
  priceContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontFamily: 'Poppins_400Regular',
    color: '#6a6180',
  },
  priceValue: {
    bottom: 2,
    fontFamily: 'Archivo_700Bold',
    color: '#8257e5',
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  favoriteButton: {
    backgroundColor: '#8257e5',
    width: 56,
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  isFavorite: {
    backgroundColor: '#e33d3d',
  },
  contactButton: {
    backgroundColor: '#04d361',
    flex: 1,
    height: 56,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  contactButtonText: {
    color: '#fff',
    fontFamily: 'Archivo_700Bold',
    fontSize: 16,
    marginLeft: 16,
  },
});

export default styles;
