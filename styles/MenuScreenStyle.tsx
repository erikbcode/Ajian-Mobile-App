import { StyleSheet, Dimensions, StatusBar } from "react-native";

export const banner_styles = StyleSheet.create({
    container: {
      flex: 1,
      minHeight: 110,
      maxHeight: '100%',
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: 'rgb(135, 31, 31)',
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
    container: {
      backgroundColor: 'rgb(135, 31, 31)',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 30,
      paddingBottom: 30,
      width: Dimensions.get('window').width,
    },
    menuContainer: {
      backgroundColor: 'rgb(135, 31, 31)',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20,
      paddingBottom: 10,
    },
    tabContainer: {
      backgroundColor: 'rgb(135, 31, 31)',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 10,
      columnGap: 20,
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
    scrollView: {
      backgroundColor: 'rgb(135, 31, 31)',
      paddingTop: StatusBar.currentHeight,
    },

    textParent: {
      backgroundColor: 'rgb(135, 31, 31)',
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
      color: 'rgb(135, 31, 31)',
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
      // fontFamily: 'Ubuntu',
      // color: 'white',
      fontWeight: 'bold',
      fontSize: 40,
      paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 50 : 50,
      paddingBottom: 35,
    },
    shadow: {
      shadowOffset: { width: -2, height: 5 },
      shadowColor: 'black',
      shadowOpacity: 0.5,
      elevation: 3,
      // background color must be set
      backgroundColor : "#0000" // invisible color
    },
    menuTitle: {
      fontWeight: 'bold',
      fontSize: 24,
      paddingBottom: 10,
    },
    itemItemText: {
      // fontFamily: 'Ubuntu',
      // margin: 'auto',
      // fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    itemDescriptionText: {
      // fontFamily: 'Ubuntu',
      // margin: 'auto',
      // fontWeight: 'normal',
      // textAlign: 'center',
      fontSize: 12,
      maxWidth: 300,
    },
    itemPriceText: {
      // fontFamily: 'Ubuntu',
      // margin: 'auto',
      // textAlign: 'center',
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