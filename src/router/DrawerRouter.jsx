//* Drawer navigator
import { createDrawerNavigator } from "@react-navigation/drawer";

//* Stack routes
import { HomeStack } from "./HomeStack";
import { AuthStack } from "./AuthStack";

const Drawer = createDrawerNavigator();

export const DrawerRoutes = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomeStack" component={HomeStack} />
      <Drawer.Screen
        name="Auth"
        component={AuthStack}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};
