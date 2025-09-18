import {
  View,
  StyleSheet,
  Alert,
  Text,
  FlatList,
  useWindowDimensions,
} from "react-native";
import Title from "../components/ui/Title";
import { useState, useEffect } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../constants/colors";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let min = 1;
let max = 100;

export default function GameScreen({ pickedNumber, setIsGameOver, setRound }) {
  const initialGuess = generateRandomBetween(1, 100, pickedNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    setRound([initialGuess]);
  }, []);

  useEffect(() => {
    if (currentGuess === pickedNumber) {
      setIsGameOver(true);
    }
  }, [currentGuess, pickedNumber]);

  useEffect(() => {
    min = 1;
    max = 100;
  }, []);

  function handleNextGuess(direction) {
    if (
      (direction === "lower" && currentGuess < pickedNumber) ||
      (direction === "greater" && currentGuess > pickedNumber)
    ) {
      Alert.alert("Oh, no!", "Wrong Direction", [
        { text: "Oops!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      max = currentGuess;
    } else {
      min = currentGuess + 1;
    }
    const newNum = generateRandomBetween(min, max, currentGuess);
    setCurrentGuess(newNum);
    setRound((prev) => [...prev, newNum]);
  }

  // 📌 동적 크기 계산
  const marginTopDistance = height < 400 ? 20 : 50; // 세로 길이가 짧으면 여백 줄임
  const cardPadding = width < 380 ? 12 : 24; // 작은 기기에서는 padding 줄이기

  return (
    <View style={[styles.container, { marginTop: marginTopDistance }]}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={{ padding: cardPadding }}>
        <Text>Higher or lower?</Text>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => handleNextGuess("greater")}>
              <Ionicons name="add" size={34} color={Colors.accent500} />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => handleNextGuess("lower")}>
              <Ionicons name="remove" size={34} color={Colors.accent500} />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  // listContainer: {
  //   flex: 1,
  //   padding: 16,
  // },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  // listItem: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   borderColor: "#ccc",
  //   borderWidth: 1,
  //   padding: 12,
  //   marginVertical: 8,
  //   width: "80%",
  //   borderRadius: 8,
  // },
  // listText: {
  //   fontSize: 16,
  // },
});
