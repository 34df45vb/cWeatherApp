import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Geolocation from '@react-native-community/geolocation';


export const Loading = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.content}>
        <View style={{ width: 150, height: 20, borderRadius: 4 }} />
        <View style={styles.rowView}>
          <View style={{ width: 100, height: 20, borderRadius: 4 }} />
          <View
            style={{ marginTop: 6, width: 130, height: 20, borderRadius: 4 }}
          />
        </View>
      </View>
    </SkeletonPlaceholder>
  )
}

const App = () => {

  const [data, setData] = useState({}),
    [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    Geolocation.getCurrentPosition(pos => {
      apiCall(pos.coords)
    }, err => {
      console.error(err);
      alert("fetching position failed")
    });
  }, [])

  const apiCall = async (location) => {
    let resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&APPID=c20ea993eca4e6b34475fcc038c9f56c`)
    let response = await resp.json()
    setData(response)
    setIsLoading(false)
  }

  if (isLoading) {
    return (<Loading />)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>{data.name}</Text>
        <View style={styles.rowView}>
          <Text style={styles.text}>{data.weather[0].main}</Text>
          <Text style={styles.text}>{data.weather[0].description}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7e7e7e',
  },
  content: {
    paddingHorizontal: 15,
    marginTop: 20
  },
  text: {
    color: '#ffffff',
    fontSize: 18
  },
  rowView: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default App;
