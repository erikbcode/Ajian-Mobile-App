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
      backgroundColor: 'rgb(135, 31, 31)',
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
      flexBasis: '32%',
      alignItems: 'center',
      paddingTop: 2,
      paddingBottom: 2,
    },
    scroll_view: {
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
    tabTextSelected: {
      fontSize: 18,
      color: '#a7aaad',
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
      paddingTop: StatusBar.currentHeight + 20,
      paddingBottom: 20,
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
      marginTop: 30,
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