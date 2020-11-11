import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  header: {
    backgroundColor: '#774DD6',
    width: '100%',
    height: '13%',

    paddingTop: 20,
    paddingHorizontal: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#D4C2FF',
  },
  banner: {
    height: '35%',
    backgroundColor: '#8257E5',
    padding: 30,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Archivo_700Bold',
    color: '#fff',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#D4C2FF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  card: {
    flexGrow: 1,
    marginTop: -30,
    height: '100%',

    paddingVertical: 10,
  },
  form: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  formTitle: {
    fontSize: 20,
    fontFamily: 'Archivo_500Medium',
    color: '#32264D',

    borderBottomWidth: 1,
    borderBottomColor: '#E6E6F0',

    paddingBottom: 8,
    marginVertical: 20,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingBottom: 20,
  },
  avatar: {
    height: 56,
    width: 56,
    borderRadius: 28,
    marginRight: 20,
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Archivo_700Bold',
    color: '#32264D',
  },
  scheduleContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderBottomWidth: 1,
    borderBottomColor: '#E6E6F0',

    paddingBottom: 8,
    marginVertical: 20,
  },
  scheduleTitle: {
    fontSize: 20,
    fontFamily: 'Archivo_500Medium',
    color: '#32264D',
  },
  newScheduleText: {
    color: '#8257E5',
    fontSize: 14,
    fontFamily: 'Archivo_700Bold',
  },
  timeContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#6A6180',
  },
  deleteSchedule: {
    height: 20,
    width: 110,
    backgroundColor: '#fff',
    top: 10,
    alignSelf: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  deleteText: {
    fontSize: 12,
    fontFamily: 'Archivo_500Medium',
    color: '#E33D3D',
  },
  containerStyle: {
    width: 140,
  },
  footer: {
    backgroundColor: '#FAFAFC',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E6E6F0',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  warningContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  warningTitle: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#8257E5',
  },
  warningDescription: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#A0A0B2',
  },
});

export default styles;
