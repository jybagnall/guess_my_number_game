import {
  View,
  Image,
  Text,
  ScrollView,
  Dimensions,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import Title from "../components/ui/Title";
import successImg from "../assets/images/success.png";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

export default function GameOverScreen({ pickedNumber, round, handleNewGame }) {
  const { width, height } = useWindowDimensions();

  // 화면 방향에 따라 이미지 크기 결정
  let imageSize = 300;

  if (width < 380) {
    imageSize = 150; // 작은 기기
  }
  if (height < 400) {
    imageSize = 100; // 가로 모드일 때 높이가 작으면 더 줄이기
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        <Title>Game Over</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image style={styles.image} source={successImg} />
        </View>
        <Text style={styles.summaryText}>
          Opponent tried <Text style={styles.highlight}>{round.length}</Text>{" "}
          rounds to guess <Text style={styles.highlight}>{pickedNumber}</Text>
        </Text>
        <PrimaryButton onPress={handleNewGame}>Start New Game</PrimaryButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: Colors.primary500,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  highlight: {
    fontFamily: "open-sans-bold",
    color: Colors.accent500,
  },
});
