//* React native
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";

//* Hooks
import { useRoute, useNavigation } from "@react-navigation/native";

//* Firebase
import { auth } from "../firebase/firebaseConfig";

//* Utils
import Bg from "../../assets/background.jpg";
import Congrats from "../../assets/congrats.jpg";

export const Details = () => {
  const routeData = useRoute();
  const navigation = useNavigation();

  const handleLogout = async () => {
    await auth.signOut();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={Bg} resizeMode="cover" style={styles.background}>
        <Text style={styles.userText}>Seu E-mail de usuário é:</Text>

        <Text style={styles.userText}>{routeData.params?.user}</Text>

        <Image source={Congrats} style={styles.image} />
        <TouchableOpacity style={styles.btnLogin} onPress={handleLogout}>
          <Text style={styles.btnContent}>Sair</Text>
        </TouchableOpacity>
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
    justifyContent: "center",
    width: "100%",
    gap: 10,
  },
  userText: {
    fontSize: 20,
    fontWeight: "500",
  },
  image: {
    width: 400,
    resizeMode: "contain",
  },
  btnLogin: {
    width: 350,
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
