import React from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker  } from "react-native-maps";

function ShopMapScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 10.841264574875142,
          longitude: 106.80978643671563,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={MapView.PROVIDER_GOOGLE}
      >
        <Marker
          coordinate={{ latitude: 10.841264574875142, longitude: 106.80978643671563 }}
          title={"Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh"}
        />
      </MapView>
      <View style={styles.aboutShop}>
        <Text style={styles.aboutTitle}>About Shop</Text>
        <Text>Address: Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh </Text>
        <Text>Open Hours: 8:00 AM - 5:00 PM</Text>
        <Text>Phone: 0123456789</Text>
        <Text>Email: thanhbtse161127@fpt.edu.vn</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  aboutShop: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  aboutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
    paddingBottom: 5,
  },
});

export default ShopMapScreen;