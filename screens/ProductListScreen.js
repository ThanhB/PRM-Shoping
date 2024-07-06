import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import apiInstance from "../api";

const ProductListScreen = ({ navigation }) => {
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
    <View>
      <FlatList
        data={productTypes}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProductDetail", { productTypeId: item._id })
            }
          >
            <View>
              <Text>{item.name}</Text>
              <Text>{item.slug}</Text>
              <Text>{new Date(item.createdAt).toLocaleDateString()}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ProductListScreen;
