import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f7',
    justifyContent: 'flex-end',
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
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  filterText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'Archivo_400Regular',
    color: '#D4C2FF',
  },
  teacherList: {
    flex: 1,
    marginTop: -20,
  },
  searchForm: {
    marginTop: 20,
    paddingTop: 20,
    marginBottom: 20,

    borderTopWidth: 1,
    borderTopColor: '#9871F5',
  },
  label: {
    color: '#d4c2ff',
    fontFamily: 'Poppins_400Regular',
  },
  input: {
    height: 54,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16,
  },
  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputBlock: {
    width: '48%',
  },
  timeText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#6A6180',
  },
  submitButton: {
    backgroundColor: '#04d361',
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontFamily: 'Archivo_700Bold',
    fontSize: 16,
  },
  endOfList: {
    alignSelf: 'center',

    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#6A6180',
  }
});

export default styles;
