import { StyleSheet, StatusBar } from "react-native";

export const styles = StyleSheet.create({
  containerParent: {
    backgroundColor: 'rgb(135, 31, 31)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    backgroundColor: 'rgb(135, 31, 31)',
    marginBottom: 0,
  },
  dayContainer: {
    flex: 1,
    elevation: 3,
    zIndex: 1,
  },
  hoursContainer: {
    flex: 1,
    marginTop: 50,
    marginBottom: 50,
  },

  parentText: {
    backgroundColor: 'rgb(135, 31, 31)',
    fontFamily: 'Ubuntu',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 40,
    marginTop: StatusBar.currentHeight + 50,
    marginBottom: 400,
  },
  addressText: {
    // fontFamily: 'Ubuntu',
    // color: 'white',
    // fontWeight: 'bold',
    fontSize: 20,
    marginTop: 50,
  },
  // title: {
  //   // fontFamily: 'Ubuntu',
  //   // color: 'white',
  //   // textAlign: 'center',
  //   // fontWeight: 'bold',
  //   fontSize: 20,
  //   paddingBottom: 15,
  // },
  dayText: {
    // fontFamily: 'Ubuntu',
    // color: 'white',
    // textAlign: 'center',
    // fontWeight: 'bold',
    fontSize: 18,
  },
  hoursText: {
    // fontFamily: 'Ubuntu',
    // color: 'white',
    // textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 16,
    marginTop: 5,
  },

  separator: {
    marginVertical: 5,
    height: 2,
    width: '80%',
  },
  dayMargin: {
    backgroundColor: 'rgb(135, 31, 31)',
    marginBottom: 14,
  },
});
