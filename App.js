import { StyleSheet, ImageBackground } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import { LinearGradient } from "expo-linear-gradient";
import bgImg from "./assets/images/background.png";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync(); // 앱 시작 시 스플래시 유지

export default function App() {
  const [pickedNumber, setPickedNumber] = useState(null);
  const [gameIsOver, setIsGameOver] = useState(false);
  const [round, setRound] = useState([]);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Bold.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // 폰트 로딩 후 스플래시 숨기기
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  function handleNewGame() {
    setPickedNumber(null);
    setIsGameOver(false);
    setRound([]);
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.red500, Colors.red400, Colors.red300]}
        style={styles.root}
        start={{ x: 0, y: 0 }} // 시작점 (왼쪽 위)
        end={{ x: 1, y: 1 }} // 끝점 (오른쪽 아래)
      >
        <ImageBackground
          source={bgImg}
          resizeMode="cover"
          style={styles.root}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.root}>
            {pickedNumber && !gameIsOver && (
              <GameScreen
                pickedNumber={pickedNumber}
                setPickedNumber={setPickedNumber}
                setIsGameOver={setIsGameOver}
                round={round}
                setRound={setRound}
              />
            )}
            {!pickedNumber && !gameIsOver && (
              <StartGameScreen setPickedNumber={setPickedNumber} />
            )}
            {gameIsOver && (
              <GameOverScreen
                pickedNumber={pickedNumber}
                round={round}
                handleNewGame={handleNewGame}
              />
            )}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
