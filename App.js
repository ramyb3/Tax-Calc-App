import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  StatusBar,
  Keyboard,
} from "react-native";
import calculateTaxes from "./calc";

const inputs = [
  {
    placeholder: "הזן כמות נקודות זיכוי",
    data: "points",
  },
  {
    placeholder: "הזן סכום הפרשה לפנסיה",
    data: "pension",
  },
  {
    placeholder: "הזן משכורת ברוטו למס הכנסה",
    data: "irs",
  },
  {
    placeholder: "הזן משכורת ברוטו לביטוח",
    data: "insurance",
  },
];

export default function App() {
  const [irs, setIrs] = useState(false);
  const [insurance, setInsurance] = useState(false);
  const [data, setData] = useState({});
  const [taxes, setTaxes] = useState([]);

  useEffect(() => {
    let obj = {};

    for (let i = 0; i < inputs.length; i++) {
      obj = { ...obj, [inputs[i].data]: null };
    }

    setData(obj);
  }, []);

  useEffect(() => {
    if (insurance) {
      alert("משכורת ברוטו לביטוח לאומי (המצויינת בצד התלוש)");
    }
  }, [insurance]);

  useEffect(() => {
    if (irs) {
      alert("משכורת ברוטו המצויינת בתלוש (ברוטו למס הכנסה)");
    }
  }, [irs]);

  const calc = () => {
    Keyboard.dismiss();
    setTaxes(calculateTaxes(data));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      <Text adjustsFontSizeToFit style={{ fontSize: 30, textAlign: "center" }}>
        מחשבון מיסים לשכירים לחודשי 2023
      </Text>
      {inputs.map((field, index) => {
        return (
          <TextInput
            key={index}
            style={styles.input}
            onFocus={() => {
              if (field.data === "irs") {
                if (!irs) {
                  Keyboard.dismiss();
                }

                setIrs(true);
              } else if (field.data === "insurance") {
                if (!insurance) {
                  Keyboard.dismiss();
                }

                setInsurance(true);
              }
            }}
            onChangeText={(e) => setData({ ...data, [field.data]: e })}
            value={data[field.data]}
            placeholder={field.placeholder}
            keyboardType="decimal-pad"
          />
        );
      })}
      <Pressable style={styles.button} onPress={calc}>
        <Text style={styles.buttonText}>חשב מיסים</Text>
      </Pressable>

      {taxes.map((item, index) => {
        return (
          <Text key={index} style={styles.taxes}>
            {item.text}: {item.num}₪
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(242, 211, 159)",
    alignItems: "center",
    gap: 18,
  },
  input: {
    padding: 5,
    height: 40,
    minWidth: 280,
    fontSize: 15,
    backgroundColor: "white",
  },
  button: {
    height: 40,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A9A9A9",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 600,
    color: "white",
  },
  taxes: {
    color: "rgb(13, 17, 255)",
    fontSize: 20,
    fontWeight: 600,
  },
});
