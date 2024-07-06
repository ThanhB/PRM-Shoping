import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import apiInstance from "../api";
import Icon from "react-native-vector-icons/AntDesign";
import CategoryCart from "../components/CategoryCart";
import ProductCard from "../components/ProductCard";

const ProductListScreen = ({ navigation }) => {
  const [numColumns, setNumColumns] = useState(2);
  const [text, setText] = useState("");
  const [productTypes, setProductTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const response = await apiInstance.get(
          "/product-types?limit=10&page=1&order=created%20asc"
        );
        setProductTypes(response.data.data.productTypes);
      } catch (error) {
        setError("Failed to load product types");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductTypes();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View className="bg-white h-screen py-3">
      {/* Searchbar */}
      <View className="flex flex-row justify-between items-center px-3">
        <View style={[styles.shadowProp, styles.searchBar]}>
          <TextInput placeholder="Search something..." />
          <Icon name="search1" size={12} />
        </View>

        <View className="w-[20%] flex justify-center items-center ">
          <Icon name="shoppingcart" size={20} />
        </View>
      </View>

      {/* Category */}
      <View className="mt-5 flex flex-row justify-between items-center px-3">
        <Text className="font-bold text-lg">Shop by Category</Text>
        <Text className="font-normal text-sm text-green-600">View all</Text>
      </View>

      <View className="mt-4 flex flex-row justify-center">
        <CategoryCart />
        <CategoryCart />
        <CategoryCart />
        <CategoryCart />
      </View>

      {/* Products */}
      <View className="flex justify-center w-full items-center mt-5">
        <FlatList
          data={productTypes}
          keyExtractor={(item) => item._id}
          numColumns={numColumns}
          contentContainerStyle={styles.flatListContainer}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <ProductCard item={item} key={item.id} />
            // <TouchableOpacity
            //   onPress={() =>
            //     navigation.navigate("ProductDetail", { productTypeId: item._id })
            //   }
            // >
            //   <View>
            //     <Text>{item.name}</Text>
            //     <Text>{item.slug}</Text>
            //     <Text>{new Date(item.createdAt).toLocaleDateString()}</Text>
            //   </View>
            // </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    borderWidth: 0.2,
    borderRadius: 2,
    width: "80%",
    borderColor: "#171717",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  row: {
    justifyContent: 'space-between',
  },
  flatListContainer: {
    paddingHorizontal: 5,
  },
});

export default ProductListScreen;
