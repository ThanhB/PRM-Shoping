import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import apiInstance from "../api";

const ProductDetailScreen = ({ route }) => {
  const { productTypeId } = route.params;
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await apiInstance.get(
          `/product-types/${productTypeId}`
        );
        setProductDetail(response.data.data);
      } catch (error) {
        setError("Failed to load product details");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetail();
  }, [productTypeId]);

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

  if (!productDetail) {
    return (
      <View>
        <Text>Product detail not found</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>{productDetail.name}</Text>
      <Text>Slug: {productDetail.slug}</Text>
      <Text>
        Created At: {new Date(productDetail.createdAt).toLocaleDateString()}
      </Text>
      <Text>
        Updated At: {new Date(productDetail.updatedAt).toLocaleDateString()}
      </Text>
    </View>
  );
};

export default ProductDetailScreen;
