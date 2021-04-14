import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Keypad } from './NumberKeypad/Keypad';

export default function HomeScreen() {
  const [goodQty, setGoodQty] = useState<string>('1');
  const [goodQty2, setGoodQty2] = useState<string>('2');

  const [isMyKeyboardVisible, setMyKeyboardVisible] = useState(false);

  const onPress = (visibleMyKeyboard: boolean) => {
    Keyboard.dismiss();
    setMyKeyboardVisible(visibleMyKeyboard);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableOpacity
        style={isMyKeyboardVisible ? styles.inputFocus : styles.input}
      >
        <Text onPress={() => onPress(!isMyKeyboardVisible)}>
          {goodQty}
        </Text>
      </TouchableOpacity>

      <TouchableWithoutFeedback onPress={() => onPress(false)}>
        <View style={styles.inner}>
          <TextInput style={styles.input} value={goodQty2} onFocus={() => setMyKeyboardVisible(false)}/>
        </View>
      </TouchableWithoutFeedback>

      { isMyKeyboardVisible &&
          <View style={{height: 200, width: '100%', backgroundColor: "#DDDDDD"}}>
            <Keypad />
          </View>
      }
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    // padding: 24,
    flex: 1,
    justifyContent: "flex-start"
  },
  header: {
    fontSize: 36,
    marginBottom: 48
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: 100,
  },
  inputFocus: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: 100,
    backgroundColor: 'red'
  },
});