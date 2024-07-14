import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  StyleSheet,
} from "react-native";
import apiInstance from "../api";
import Icon from "react-native-vector-icons/AntDesign";
import CategoryCart from "../components/CategoryCart";
import ProductCard from "../components/ProductCard";
import { laptopImg, phoneImg, tabletImg, watchImg } from "../data/CategoryImg";

const ProductListScreen = ({ navigation }) => {
  const [numColumns, setNumColumns] = useState(2);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url = `/products/public/?limit=10&page=1&order=created%20asc&search=${search}&productType=${selectedCategory}`;
      console.log("API URL:", url);
      const response = await apiInstance.get(url);
      console.log("API Response:", response.data);
      setProducts(response.data.data.products);
    } catch (error) {
      setError("Failed to load products");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, selectedCategory]);

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
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Searchbar */}
      <View style={styles.searchContainer}>
        <View style={[styles.shadowProp, styles.searchBar]}>
          <TextInput
            placeholder="Search something..."
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
          {search ? (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Icon name="closecircle" size={20} style={styles.icon} />
            </TouchableOpacity>
          ) : (
            <Icon name="search1" size={20} style={styles.icon} />
          )}
        </View>

        <TouchableOpacity style={styles.cartIcon}>
          <Icon name="shoppingcart" size={24} />
        </TouchableOpacity>
      </View>

      {/* Category */}
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>Shop by Category</Text>
        <TouchableOpacity onPress={() => setSelectedCategory("")}>
          <Text style={styles.viewAllText}>View all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categories}>
        <TouchableOpacity
          onPress={() => {
            console.log("Selected category: Điện thoại");
            setSelectedCategory("65b7ac418a715ba76369ffda");
          }}
        >
          <CategoryCart title="Điện thoại" image={phoneImg}/>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("Selected category: Laptop");
            setSelectedCategory("65bf868d26359fc46beaa898");
          }}
        >
          <CategoryCart title="Laptop"  image={laptopImg} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("Selected category: Máy tính bảng");
            setSelectedCategory("65c4bd7f813792e7c8fde3db");
          }}
        >
          <CategoryCart title="Máy tính bảng" image={tabletImg}/>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("Selected category: Đồng hồ");
            setSelectedCategory("65c4bd89813792e7c8fde3e0");
          }}
        >
          <CategoryCart title="Đồng hồ" image={watchImg}/>
        </TouchableOpacity>
      </View>

      {/* Products */}
      <View style={styles.productContainer}>
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          numColumns={numColumns}
          contentContainerStyle={styles.flatListContainer}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => <ProductCard item={item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: 10,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderRadius: 20,
    width: "80%",
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 5,
  },
  icon: {
    marginLeft: 5,
  },
  cartIcon: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  categoryContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewAllText: {
    fontSize: 14,
    color: "green",
  },
  categories: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  productContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
  flatListContainer: {
    paddingHorizontal: 5,
  },
  row: {
    justifyContent: "space-between",
  },
});

export default ProductListScreen;
