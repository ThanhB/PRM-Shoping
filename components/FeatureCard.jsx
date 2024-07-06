import { View, Text, StyleSheet, Image, Button, Alert } from "react-native";
import React from "react";

const FeatureCard = () => {
  return (
    <View style={[styles.card, styles.shadowProp]}>
      <View className="w-2/3 p-1 h-32">
        <Text style={styles.heading}>Trade-in and save</Text>
        <Text className="text-sm">Enjoy Greate unfront saving</Text>
        <Text className="text-sm">Enjoy Greate unfront saving</Text>

        <View style={styles.learnMoreBtn}>
        <Button title="Learn More" color="black" onPress={() => Alert.alert('Button with adjusted color pressed')}/>
        </View>
      </View>
      <View className="w-1/3 h-32">
        <Image source={require('../assets/feature-img-1.jpg')} className="w-full h-full object-cover rounded-md"/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    columnGap: 2,
    width: 320,
    marginVertical: 10,
    marginEnd: 20
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  learnMoreBtn: {
    backgroundColor: '#7AF97AF0',
    marginTop:24,
    width: '70%',
    borderRadius: 8,
  },
});

export default FeatureCard;
