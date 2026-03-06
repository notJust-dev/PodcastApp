import { NativeTabs } from 'expo-router/unstable-native-tabs'

export default function TabsLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="home">
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="new">
        <NativeTabs.Trigger.Icon sf="plus.circle.fill" md="add_circle" />
        <NativeTabs.Trigger.Label>New</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="library">
        <NativeTabs.Trigger.Icon sf="books.vertical.fill" md="library_books" />
        <NativeTabs.Trigger.Label>Library</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}
