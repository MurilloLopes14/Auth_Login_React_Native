//* Stack navigator
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Profile } from "../routes/Profile";
import { Home } from "../routes/Home";

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};
