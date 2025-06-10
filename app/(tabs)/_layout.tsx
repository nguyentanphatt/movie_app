import TabIcon from "@/components/TabIcon"
import { icons } from "@/constants/icons"
import { Tabs } from "expo-router"

const _Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarStyle: {
                    backgroundColor: '#0f0d23',
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom: 36,
                    height: 50,
                    position: 'absolute',
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: '#0f0d23'
                }
            }}
        >
            <Tabs.Screen 
                name="index" 
                options={{
                    title: 'Home', 
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <>
                            <TabIcon focused={focused} icon={icons.home} tabName="Home"/>
                        </>
                    )
                }} 
            />
            <Tabs.Screen 
                name="search" 
                options={{
                    title: 'Search', 
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <>
                            <TabIcon focused={focused} icon={icons.search} tabName="Search"/>
                        </>
                    )
                }} 
            />
            <Tabs.Screen 
                name="saved" 
                options={{
                    title: 'Saved', 
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <>
                            <TabIcon focused={focused} icon={icons.save} tabName="Saved"/>
                        </>
                    )
                }} 
            />
            <Tabs.Screen 
                name="profile" 
                options={{
                    title: 'Profile', 
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <>
                            <TabIcon focused={focused} icon={icons.person} tabName="Profile"/>
                        </>
                    )
                }} 
            />
        </Tabs>
    )
}

export default _Layout