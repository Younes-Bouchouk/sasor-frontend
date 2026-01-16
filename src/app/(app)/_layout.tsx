import { Tabs } from "expo-router";

export default function AppLayout() {
  return (
    <Tabs screenOptions={{headerShown: true}}>
      <Tabs.Screen name="index" options={{title:"Accueil"}}/>
      <Tabs.Screen name="create" options={{title:"Créer"}}/>
      <Tabs.Screen name="events" options={{title:"Mes events"}}/>
      <Tabs.Screen name="search" options={{title:"Recherche"}}/>
      
    </Tabs>
  )
}