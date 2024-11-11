import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import "./styles.css";

const normalizeNumber = (text: string) => {
  return text.replace(",", ".").trim();
};

const getResult = (percent: number) => {
  if (isNaN(percent)) return "0";
  if (percent <= 30) return "1";
  else if (percent <= 36) return "2-";
  else if (percent <= 42) return "2";
  else if (percent <= 49) return "2+";
  else if (percent <= 55) return "3-";
  else if (percent <= 64) return "3";
  else if (percent <= 70) return "3+";
  else if (percent <= 76) return "4-";
  else if (percent <= 83) return "4";
  else if (percent <= 89) return "4+";
  else if (percent <= 94) return "5-";
  else return "5";
};

export default function App() {
  const [gained, setGained] = useState(0);
  const [gainedText, setGainedText] = useState("");

  const [max, setMax] = useState(0);
  const [maxText, setMaxText] = useState("");

  const [percent, setPercent] = useState(0);

  const [result, setResult] = useState("");

  useEffect(() => {
    console.log(new Date().toISOString());
  }, []);

  const updateGainedPoints = (text: string) => {
    const normalized = normalizeNumber(text);
    const number = Number(normalized);
    if (!isNaN(number)) {
      setGainedText(normalized);
      setGained(number);
    }
  };

  const updateMaxPoints = (text: string) => {
    const normalized = normalizeNumber(text);
    const number = Number(normalizeNumber(text));
    if (!isNaN(number)) {
      setMaxText(normalized);
      setMax(number);
    }
  };

  useEffect(() => {
    calculateResult();
  }, [gained, max]);

  const calculateResult = () => {
    const calculatedPercent = (gained / max) * 100;

    const percent =
      isNaN(calculatedPercent) || !isFinite(calculatedPercent)
        ? undefined
        : Number(calculatedPercent.toFixed(2));

    const result = getResult(Math.round(percent ?? 0));
    setPercent(percent ?? 0);
    setResult(result);
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusBar} />
      <ScrollView style={styles.scrollView} keyboardDismissMode="on-drag">
        <Text style={styles.title}>Kalkulator ocen</Text>

        <View style={styles.inputsContainer}>
          <Text style={styles.inputTitle}>Max</Text>
          <Text style={styles.inputTitle}>Zdobyte</Text>
        </View>

        {
          <View style={styles.inputsContainer}>
            <View style={{ flex: 1, margin: 20 }}>
              <TextInput
                style={styles.input}
                keyboardType="decimal-pad"
                onChangeText={(text) => updateMaxPoints(text)}
                value={maxText}
              />
            </View>

            <View style={{ flex: 1, margin: 20 }}>
              <TextInput
                style={styles.input}
                keyboardType="decimal-pad"
                onChangeText={(text) => updateGainedPoints(text)}
                value={gainedText}
              />
            </View>
          </View>
        }

        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Ocena:</Text>
          <Text style={styles.resultsText}>{result}</Text>
        </View>

        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Procent:</Text>
          <Text style={styles.resultsText}>{percent}</Text>
        </View>

        <View style={styles.resultsTable}>
          <View style={styles.resultsTableRow}>
            <Text style={styles.tableCellLeft}>Ocena</Text>
            <Text style={styles.tableCellRight}>Procent</Text>
          </View>
          <View style={styles.resultsTableRow}>
            <Text style={styles.tableCellLeft}>5</Text>
            <Text style={styles.tableCellRight}>95 - 100</Text>
          </View>
          <View style={styles.resultsTableRow}>
            <Text style={styles.tableCellLeft}>5-</Text>
            <Text style={styles.tableCellRight}>90 - 94</Text>
          </View>
          <View style={styles.resultsTableRow}>
            <Text style={styles.tableCellLeft}>4+</Text>
            <Text style={styles.tableCellRight}>84 - 89</Text>
          </View>
          <View style={styles.resultsTableRow}>
            <Text style={styles.tableCellLeft}>4</Text>
            <Text style={styles.tableCellRight}>77 - 83</Text>
          </View>
          <View style={styles.resultsTableRow}>
            <Text style={styles.tableCellLeft}>4-</Text>
            <Text style={styles.tableCellRight}>71 - 76</Text>
          </View>
          <View style={styles.resultsTableRow}>
            <Text style={styles.tableCellLeft}>3+</Text>
            <Text style={styles.tableCellRight}>65 - 70</Text>
          </View>
          <View style={styles.resultsTableRow}>
            <Text style={styles.tableCellLeft}>3</Text>
            <Text style={styles.tableCellRight}>56 - 64</Text>
          </View>
          <View style={styles.resultsTableRow}>
            <Text style={styles.tableCellLeft}>3-</Text>
            <Text style={styles.tableCellRight}>50 - 55</Text>
          </View>
          <View style={styles.resultsTableRow}>
            <Text style={styles.tableCellLeft}>2+</Text>
            <Text style={styles.tableCellRight}>43 - 49</Text>
          </View>
          <View style={styles.resultsTableRow}>
            <Text style={styles.tableCellLeft}>2</Text>
            <Text style={styles.tableCellRight}>37 - 42</Text>
          </View>
          <View style={styles.resultsTableRow}>
            <Text style={styles.tableCellLeft}>2-</Text>
            <Text style={styles.tableCellRight}>31 - 36</Text>
          </View>
          <View style={[styles.resultsTableRow, { borderBottomWidth: 1 }]}>
            <Text style={styles.tableCellLeft}>1</Text>
            <Text style={styles.tableCellRight}>0 - 30</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  statusBar: {
    height: Constants.statusBarHeight,
  },
  title: {
    fontSize: 20,
    padding: 20,
    alignSelf: "center",
    fontWeight: "bold",
  },
  inputsContainer: {
    flexDirection: "row",
  },
  inputTitle: {
    flex: 1,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    fontSize: 30,
    textAlign: "center",
  },
  resultsContainer: {
    margin: 10,
    flexDirection: "row",
  },
  resultsTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  resultsText: {
    marginLeft: 10,
    fontSize: 20,
  },
  resultsTable: {
    margin: 20,
  },
  resultsTableRow: {
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  tableCellLeft: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
    borderRightColor: "black",
    borderRightWidth: 1,
  },
  tableCellRight: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
  },
});
