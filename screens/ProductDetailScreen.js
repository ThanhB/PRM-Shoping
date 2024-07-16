import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RenderHtml from "react-native-render-html";
import apiInstance from "../api";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");

const ProductDetailScreen = ({ route }) => {
  const { productTypeId, totalReviews, averageRating } = route.params;
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const addItemToCart = () => {
    if (productDetail.countInStock > 0) {
      const itemData = {
        id: productDetail._id,
        name: productDetail.name,
        price: productDetail.price,
        image: productDetail.image,
        countInStock: productDetail.countInStock,
      };
      setAddedToCart(true);
      dispatch(addToCart(itemData));
      Toast.show({
        type: "success",
        text1: "Added to Cart",
        text2: `${productDetail.name} has been added to your cart.`,
      });
      setTimeout(() => {
        setAddedToCart(false);
      }, 60000);
    } else {
      Toast.show({
        type: "error",
        text1: "Out of Stock",
        text2: "Sorry, this item is currently out of stock.",
      });
    }
  };

  const cartItems = useSelector((state) => state.cart.cart);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await apiInstance.get(
          `/products/public/${productTypeId}`
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
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!productDetail) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Product detail not found</Text>
      </View>
    );
  }

  const discountLabel =
    productDetail.discount > 0 ? (
      <View style={styles.discountBadge}>
        <Text style={styles.discountText}>-{productDetail.discount}%</Text>
      </View>
    ) : null;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={20}
          color="#ffd700"
        />
      );
    }
    return stars;
  };

  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(productDetail.price);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: productDetail.image }}
          style={styles.productImage}
          resizeMode="contain"
        />
        {discountLabel}
      </View>
      <Text style={styles.productName}>{productDetail.name}</Text>
      <View style={styles.priceAndStockContainer}>
        <Text style={styles.productPrice}>Price: {formattedPrice}</Text>
        <Text style={styles.productStock}>
          Stock: {productDetail.countInStock}
        </Text>
      </View>
      <View style={styles.ratingContainer}>
        {renderStars(Math.round(averageRating || 0))}
        <Text style={styles.ratingText}>
          {averageRating !== undefined ? averageRating : "N/A"} (
          {totalReviews !== undefined ? totalReviews : 0} reviews)
        </Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={addItemToCart}>
        {addedToCart ? (
          <View>
            <Text style={styles.addedToCart}>Added to Cart</Text>
          </View>
        ) : (
          <Text style={styles.addedToCart}>Add to Cart</Text>
        )}
      </TouchableOpacity>
      <View style={styles.descriptionContainer}>
        <Text style={styles.sectionTitle}>Product Description:</Text>
        <RenderHtml
          contentWidth={width - 32}
          source={{ html: productDetail.description }}
          tagsStyles={htmlStyles}
        />
      </View>
      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  imageContainer: {
    position: "relative",
    marginBottom: 16,
  },
  productImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  discountBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#ff3d00",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  discountText: {
    color: "#fff",
    fontWeight: "bold",
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  priceAndStockContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e91e63",
  },
  productStock: {
    fontSize: 16,
    color: "#333",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  ratingText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 8,
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  addButton: {
    marginTop: 5,
    marginBottom: 30,
    backgroundColor: "#ff9800",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

const htmlStyles = {
  p: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  span: {
    fontSize: 14,
    color: "#333",
  },
};

export default ProductDetailScreen;
