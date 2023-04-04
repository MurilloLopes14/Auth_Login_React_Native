//* Stack navigator
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignIn } from "../routes/SignIn";
import { Login } from "../routes/Login";
import { Details } from "../routes/Details";

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackVisible: false,
      }}
    >
      <Stack.Screen
        name="Signin"
        component={SignIn}
        options={{ title: "Cadastrar" }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Entrar" }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{ title: "Usuário" }}
      />
    </Stack.Navigator>
  );
};
