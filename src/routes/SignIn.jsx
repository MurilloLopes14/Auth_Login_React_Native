//* React native
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

//* Hooks
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

//* Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { onValue, push, ref } from "firebase/database";

//* Utils
import Bg from "../../assets/background.jpg";

export const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    status: false,
    message: "",
  });
  const [error, setError] = useState({
    errorCode: "",
    errorMsg: "",
  });

  const navigation = useNavigation();

  const handleSignIn = async () => {
    if (!email || !password || !name) {
      setMessage({ status: true, message: "Preencha todos os campos!" });
      setTimeout(() => {
        setMessage({ status: false, message: "" });
      }, 2000);

      return;
    }

    //Validate number of characters in name state
    const charName = name.split("");
    if (charName.length < 5) {
      setMessage({
        status: true,
        message: "O nome precisa ter no mínimo 5 caracteres",
      });

      setTimeout(() => {
        setMessage({ status: false, message: "" });
      }, 2000);

      return;
    }

    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        alert(`Seu ID é: ${res.user.uid}`);
        setName("");
        navigation.navigate("Login");

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
            placeholder="Digite seu nome"
            onChangeText={(value) => setName(value)}
            value={name}
            style={styles.input}
          />
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
          <TouchableOpacity style={styles.btn} onPress={handleSignIn}>
            <Text style={styles.btnContent}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.btnContent}>Já possui conta? Entrar</Text>
          </TouchableOpacity>
        </View>
        {/* Error messages */}
        {error.status && error.errorCode === "auth/email-already-in-use" ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorMessage}>
              Usuário já existente, tente outro E-mail por favor
            </Text>
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
