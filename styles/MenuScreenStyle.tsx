import { StyleSheet, Dimensions, StatusBar } from "react-native";

const ajianRed : string = 'rgb(135, 31, 31)';

export const banner_styles = StyleSheet.create({
    container: {
      flex: 1,
      minHeight: 110,
      maxHeight: '100%',
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: ajianRed,
      marginTop: 34,
      paddingTop: 10,
      zIndex: 2,
    },
    text: {
      fontFamily: 'Ubuntu',
      fontSize: 16,
      fontWeight: 'normal',
      color: 'white',
      zIndex: 1,
      marginLeft: 10,
    },
  });

export const styles = StyleSheet.create({
    smallMargin: {
        marginTop: 20,
    },
    scrollView: {
      backgroundColor: ajianRed,
    },
    container: {
      backgroundColor: ajianRed,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 30,
      paddingBottom: 30,
      width: Dimensions.get('window').width,
    },
    menuContainer: {
      backgroundColor: ajianRed,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20,
      paddingBottom: 10,
    },
    tabContainer: {
      backgroundColor: ajianRed,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 10,
      columnGap: 20,
    },
    headerContainerParent: {
      backgroundColor: ajianRed,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: StatusBar.currentHeight + 50,
    },
    tabStyle: {
      backgroundColor: 'white',
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      width: '100%',
      borderRadius: 1,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: 'black',
      marginTop: 30,
      marginBottom: 0,
    },
    tabButton: {
      backgroundColor: 'white',
      flexBasis: '32%',
      alignItems: 'center',
      paddingTop: 8,
      paddingBottom: 8,
    },
    

    textParent: {
      backgroundColor: ajianRed,
      fontFamily: 'Ubuntu',
      fontWeight: 'normal',
      textAlign: 'center',
      color: 'white',
      margin: 'auto',
      fontSize: 18,
    },
    tabTextUnselected: {
      backgroundColor: 'white',
      fontWeight: 'bold',
      color: ajianRed,
    },
    tabTextSelected: {
      backgroundColor: 'white',
      fontSize: 18,
      color: 'rgb(100, 31, 31)',
    },
    tabContent: {
      fontWeight: 'bold',
      fontSize: 12,
      paddingBottom: 10,
    },
    headerText: {
      fontWeight: 'bold',
      fontSize: 40,
      paddingBottom: 35,
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 5,
    },
    menuTitle: {
      fontWeight: 'bold',
      fontSize: 24,
      paddingBottom: 10,
    },
    itemItemText: {
      fontWeight: 'bold',
      textAlign: 'center',
    },
    itemDescriptionText: {
      fontSize: 12,
      maxWidth: 300,
    },
    itemPriceText: {
      fontWeight: 'bold',
      fontSize: 12,
    },
    loadingText: {
      paddingTop: 30,
      fontWeight: 'bold',
      fontsize: 18,
    },

    separator: {
      marginVertical: 30,
      height: 2,
      width: '80%',
    },
    smallSeparator: {
      marginVertical: 2,
      height: 2,
      width: '60%',
    },
  });