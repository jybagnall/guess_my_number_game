import { View, StyleSheet, Alert, Text, FlatList } from "react-native";
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

export default function GameScreen({
  pickedNumber,
  setIsGameOver,
  round,
  setRound,
}) {
  const initialGuess = generateRandomBetween(1, 100, pickedNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

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

  return (
    <View style={styles.container}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
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
      {/* 
      <FlatList
        data={round}
        inverted
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listText}>{item}</Text>
          </View>
        )}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 12,
    marginVertical: 8,
    width: "80%",
    borderRadius: 8,
  },
  listText: {
    fontSize: 16,
  },
});
