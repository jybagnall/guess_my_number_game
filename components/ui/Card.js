import { View, useWindowDimensions, StyleSheet } from "react-native";

import Colors from "../../constants/colors";

export default function Card({ children }) {
  const { width, height } = useWindowDimensions();

  // 📌 화면 크기에 따라 marginTop 동적으로 조정
  const marginTopDistance = width < 380 ? 18 : 36;
  // 📌 세로 길이가 짧으면 padding을 줄여서 가로 모드에서도 적절하게 보이도록
  const cardPadding = height < 400 ? 12 : 16;

  return (
    <View
      style={[
        styles.card,
        { marginTop: marginTopDistance, padding: cardPadding },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 24,
    backgroundColor: Colors.primary500,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
