import { StyleSheet, StatusBar } from "react-native";

const ajianRed : string = 'rgb(135, 31, 31)';

export const styles = StyleSheet.create({
  containerParent: {
    backgroundColor: ajianRed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainerParent: {
    backgroundColor: ajianRed,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 400, // this controls map height
    marginTop: StatusBar.currentHeight + 50,
  },
  scrollContainer: {
    backgroundColor: ajianRed,
    marginBottom: 0,
  },
  dayContainer: {
    flex: 1,
    elevation: 3,
    paddingTop: 40,
  },
  hoursContainer: {
    flex: 1,
  },
  parentText: {
    backgroundColor: ajianRed,
    fontFamily: 'Ubuntu',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 40,
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  addressText: {
    fontSize: 20,
    marginBottom: 30,
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
