//* Expo
import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";

//* RN navigator
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";

//* Drawer routes
import { DrawerRoutes } from "./router/DrawerRouter";

const App = () => {
  return (
    <>
      <StatusBar style="auto" translucent={false} />
      <NavigationContainer>
        <DrawerRoutes />
      </NavigationContainer>
    </>
  );
};

registerRootComponent(App);
