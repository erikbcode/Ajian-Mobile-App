import { StyleSheet, StatusBar } from "react-native";

export const styles = StyleSheet.create({
  address: {
    fontFamily: 'Ubuntu',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 50,
  },
  scroll_background: {
    backgroundColor: 'rgb(135, 31, 31)',
    marginBottom: 0,
  },
  header_title: {
    fontFamily: 'Ubuntu',
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    paddingTop: StatusBar.currentHeight + 50,
    textAlign: 'center',
    marginBottom: 400,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    zIndex: 1,
  },
  hours_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 50,
  },
  title: {
    fontFamily: 'Ubuntu',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 15,
  },
  day_margin: {
    marginBottom: 14,
    // marginTop: 5,
  },
  day_title: {
    fontFamily: 'Ubuntu',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  hours: {
    fontFamily: 'Ubuntu',
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'center',
    marginTop: 5,
  },
  separator: {
    marginVertical: 5,
    height: 2,
    width: '80%',
  },
});
