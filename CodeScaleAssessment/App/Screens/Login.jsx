/** @format */

import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../Config/FirebaseConfig";
import { useToast } from "react-native-toast-notifications";
import { useTheme, useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Entypo } from "@expo/vector-icons";

const Login = () => {
  //const colors = useTheme().colors;
  const toast = useToast();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [loading, setLoading] = useState(false); // to show loading indicator
  const auth = FIREBASE_AUTH; // firebase auth object

  const handleLogout = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const signInFunc = async () => {
    if (!email || !password) {
      alert("All fields are required.");
    }
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Inside");
      toast.show("Welcome Back!", {
        type: "success",
        duration: 2000,
        dismissible: true,
      });
    } catch (error) {
      console.log(error);
      toast.show("Login Unsuccessful", {
        type: "danger",
      });
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={styles.containor}>
      <KeyboardAvoidingView behavior="padding">
        <Image
          source={require("../../assets/Thronepedia-removebg.png")} // Local file path
          style={{ width: 200, height: 200, alignSelf: "center" }}
        />

        <TextInput
          style={styles.input}
          value={email}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        ></TextInput>

        {/* password field */}
        <View style={styles.inputContainer}>
          <TextInput
            label={"Password"}
            style={styles.passwordInput}
            secureTextEntry={passwordVisible}
            value={password}
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
          ></TextInput>
          <Entypo
            name={passwordVisible ? "eye" : "eye-with-line"}
            size={24}
            color="gray"
            style={styles.eyeIcon}
            onPress={togglePasswordVisibility}
          />
        </View>
        <Text style={styles.forgotPwText}>Forgot Password?</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <>
            <>
              <TouchableOpacity
                style={styles.signupButton}
                onPress={() => signInFunc()}
              >
                <Text style={{ color: "#fff", fontSize: 15 }}>Sign In</Text>
              </TouchableOpacity>
            </>
          </>
        )}

        <View style={styles.signupView}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity
            style={styles.signUptext}
            onPress={() => handleSignUp()}
          >
            <Text style={styles.signUptext}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  containor: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  input: {
    marginVertical: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    fontSize: 15,
  },
  forgotPwText: {
    textAlign: "right",
    marginBottom: 60,
  },
  passwordInput: {
    flex: 1,
    height: 45,
    backgroundColor: "#fff",
    marginLeft: 10,
    fontSize: 15,
  },
  eyeIcon: {
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  signupView: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  signUptext: {
    color: "#2E94F9",
  },
  signupButton: {
    backgroundColor: "#0E86D4",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
    marginTop: 30,
    alignItems: "center",
  },
});
