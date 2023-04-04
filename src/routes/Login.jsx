//* React native
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  ActivityIndicator,
} from "react-native";

//* Hooks
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

//* Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

//* Utils
import Bg from "../../assets/background.jpg";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    status: false,
    message: "",
  });
  const [error, setError] = useState({
    status: false,
    errorCode: "",
    errorMsg: "",
  });

  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage({ status: true, message: "Preencha todos os campos!" });
      setTimeout(() => {
        setMessage({ status: false, message: "" });
      }, 2000);

      return;
    }
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        navigation.navigate("Details", { user: res._tokenResponse.email });

        return;
      })
      .catch((err) => {
        setError({ status: true, errorCode: err.code, errorMsg: err.message });
        return;
      });

    setEmail("");
    setPassword("");
    setLoading(false);
  };

  // Loading state screen
  if (loading)
    return (
      <ActivityIndicator size={100} color={"#a588f5"} style={{ flex: 1 }} />
    );

  return (
    <View style={styles.container}>
      <ImageBackground source={Bg} resizeMode="cover" style={styles.background}>
        {message.status ? (
          <Text style={styles.validateMsg}>{message.message}</Text>
        ) : (
          ""
        )}
        <View style={styles.formControl}>
          <TextInput
            placeholder="Digite seu E-mail"
            onChangeText={(value) => setEmail(value)}
            value={email}
            style={styles.input}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Digite sua Senha"
            onChangeText={(value) => setPassword(value)}
            value={password}
            style={styles.input}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.btn} onPress={handleLogin}>
            <Text style={styles.btnContent}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.btnContent}>
              Ainda não tem conta? Cadastrar-se
            </Text>
          </TouchableOpacity>
        </View>

        {/* Error messages */}
        {error.status && error.errorCode === "auth/user-not-found" ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorMessage}>Usuário não existente</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => setError({ status: false })}
            >
              <Text style={styles.btnContent}>Limpar erros</Text>
            </TouchableOpacity>
          </View>
        ) : (
          ""
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: 10,
  },
  validateMsg: {
    color: "rgb(204, 0, 0)",
    fontSize: 20,
    backgroundColor: "rgba(204, 0, 0, .2)",
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
  formControl: {
    gap: 10,
  },
  input: {
    width: 350,
    backgroundColor: "#fff",
    height: 40,
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
    paddingLeft: 10,
  },
  buttonsContainer: {
    alignItems: "center",
    margin: 10,
    gap: 10,
  },
  btn: {
    width: 350,
  },
  errorContainer: {
    alignItems: "center",
  },
  errorMessage: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  btnContent: {
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 10,
    backgroundColor: "#a588f5",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
  },
});
