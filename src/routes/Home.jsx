//* React native
import { View, Image, StyleSheet, Button } from "react-native";

//* Hooks
import { useNavigation } from "@react-navigation/native";

//* Utils
import HomeSVG from "../../assets/home.jpg";

export const Home = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.container}>
        <Image source={HomeSVG} style={styles.image} />
        <Button title="Perfil" onPress={() => navigation.navigate("Profile")} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    resizeMode: "contain",
    height: 100,
  },
});
