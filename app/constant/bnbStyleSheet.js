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
  subTitle: {
    fontSize: fonts.semi,
    fontWeight: fonts.bold,
    fontFamily: "Raleway_400Regular",
  },
});
