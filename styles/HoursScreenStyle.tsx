import { StyleSheet, StatusBar } from "react-native";

const ajianRed : string = 'rgb(135, 31, 31)';

export const styles = StyleSheet.create({
  containerParent: {
    backgroundColor: ajianRed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    backgroundColor: ajianRed,
    marginBottom: 0,
  },
  dayContainer: {
    flex: 1,
    elevation: 3,
    // zIndex: 1,
    paddingTop: 40,
  },
  hoursContainer: {
    flex: 1,
    marginTop: 50,
    marginBottom: 10,
  },
  // shadow: {
  //   shadowOffset: { width: -2, height: 5 },
  //   shadowColor: 'black',
  //   shadowOpacity: 0.5,
  //   elevation: 3,
  //   // background color must be set
  //   backgroundColor : "#0000" // invisible color
  // },
  parentText: {
    backgroundColor: ajianRed,
    fontFamily: 'Ubuntu',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 40,
    marginTop: StatusBar.currentHeight ? StatusBar.currentHeight + 50 : 50,
    marginBottom: 400,
  },
  addressText: {
    fontSize: 20,
    marginTop: 50,
  },
  dayText: {
    fontSize: 18,
  },
  hoursText: {
    fontWeight: 'normal',
    fontSize: 16,
    marginTop: 5,
  },
  loadingView: {
    flex: 1,
    backgroundColor: ajianRed,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    paddingTop: 30,
    fontWeight: 'bold',
    fontSize: 18,
  },
  separator: {
    marginVertical: 5,
    height: 2,
    width: '80%',
  },
  dayMargin: {
    backgroundColor: ajianRed,
    marginBottom: 14,
  },
  mobileButton: {
    backgroundColor: ajianRed,
    marginBottom: 50, 
    marginTop: 30,
  },
});
