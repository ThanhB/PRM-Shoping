import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const CategoryCart = ({ title, image, selected }) => {
  return (
    <View style={styles.card(selected)}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: (selected) => ({
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 8,
    padding: 10,
    margin: 5,
    width: 89,
    height: 89,
    backgroundColor: selected ? "green" : "white",
  }),
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  text: {
    fontSize: 10,
    textAlign: "center",
  },
});

export default CategoryCart;
