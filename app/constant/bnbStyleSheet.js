import { StyleSheet } from "react-native";
import colors from "../config/colors";
import fonts from "../config/fonts";
import styling from "../config/styling";

export default StyleSheet.create({
  bubbleContainer: {
    borderRadius: styling.mediumCornerRadius,
    backgroundColor: colors.white,
    height: 50,
    width: "100%",
    paddingHorizontal: 10,
    borderColor: "gray",
    shadowColor: "blue",
    shadowOpacity: 0.9,
    shadowRadius: 10,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    justifyContent: "center",
    alignSelf: "center",
  },
  background: {
    backgroundColor: colors.redAirBNB,
    paddingLeft: 5,
    paddingRight: 5,
  },
  bodyBackground: {
    backgroundColor: colors.redAirBNBSoft,
    paddingLeft: 5,
    paddingRight: 5,
  },
  headerText: {
    fontFamily: "Raleway_700Bold",
    fontSize: 25,
    paddingLeft: 11,
    paddingVertical: 15,
    color: colors.white,
  },
  headerTextBlack: {
    fontFamily: "Raleway_700Bold",
    fontSize: 25,
    paddingLeft: 11,
    paddingVertical: 15,
    color: "black",
  },
  subHeaderText: {
    fontSize: 20,
    fontFamily: "Raleway_600SemiBold",
    color: "black",
  },
  subTitle: {
    fontSize: fonts.semi,
    fontWeight: fonts.bold,
    fontFamily: "Raleway_400Regular",
  },
  centerView: {
    alignSelf: "center",
    justifyContent: "center",
  },
  centerText: {
    textAlign: "center",
    textAlignVertical: "center",
  },
  divider: {
    width: "80%",
    margin: 20,
  },
  bodyView: {
    alignItems: "center",
  },
  normalText: {
    fontFamily: "Raleway_400Regular",
  },
  mediumText: {
    fontFamily: "Raleway_500Medium",
  },
  semiBoldText: {
    fontFamily: "Raleway_600SemiBold",
  },
  bnbButton: {
    borderRadius: 10,
    padding: 5,
    backgroundColor: colors.redAirBNB,
  },
  bnbButtonText: {
    color: colors.white,
  },
  separator: {
    marginVertical: styling.separator,
  },
});
