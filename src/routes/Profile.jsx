//* React native
import { View, Image, StyleSheet, Button } from "react-native";

//* Hooks
import { useNavigation } from "@react-navigation/native";

//* Utils
import User from "../../assets/user.png";

export const Profile = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.container}>
        <Image source={User} style={styles.image} />
        <Button title="Voltar" onPress={() => navigation.goBack("Home")} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  image: {
    width: 300,
    resizeMode: "contain",
    height: 100,
  },
});
