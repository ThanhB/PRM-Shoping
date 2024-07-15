import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import apiInstance from "../api";
import Icon from "react-native-vector-icons/AntDesign";
import CategoryCart from "../components/CategoryCart";
import ProductCard from "../components/ProductCard";
import { laptopImg, phoneImg, tabletImg, watchImg } from "../data/CategoryImg";
import { Link } from "@react-navigation/native";

const ProductListScreen = ({ route }) => {
  const controllerRef = useRef(null);
  const [numColumns, setNumColumns] = useState(2);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    route.params?.categoryId || ""
  );
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProducts();
    }, 50); // Adjust the delay as needed

    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [search, selectedCategory]);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  const fetchProducts = async () => {
    setLoading(true);

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    try {
      const url = `/products/public/?limit=10&page=1&order=created%20asc&search=${search}&productType=${selectedCategory}`;
      console.log("API URL:", url);
      const response = await apiInstance.get(url, {
        signal,
      });
      console.log("API Response:", response.data);
      setProducts([...response.data.data.products]);
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCategory = (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory("");
      return;
    }
    setSelectedCategory(categoryId);
  };

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

        <Link to={{ screen: "Shopping" }} style={styles.cartIcon}>
          <Icon name="shoppingcart" size={24} />
        </Link>
      </View>

      {/* Category */}
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>Shop by Category</Text>
        <TouchableOpacity onPress={() => handleSelectCategory("")}>
          <Text style={styles.viewAllText}>View all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categories}>
        <TouchableOpacity
          onPress={() => {
            console.log("Selected category: Điện thoại");
            handleSelectCategory("65b7ac418a715ba76369ffda");
          }}
        >
          <CategoryCart
            title="Điện thoại"
            image={phoneImg}
            selected={selectedCategory === "65b7ac418a715ba76369ffda"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("Selected category: Laptop");
            handleSelectCategory("65bf868d26359fc46beaa898");
          }}
        >
          <CategoryCart
            title="Laptop"
            image={laptopImg}
            selected={selectedCategory === "65bf868d26359fc46beaa898"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("Selected category: Máy tính bảng");
            handleSelectCategory("65c4bd7f813792e7c8fde3db");
          }}
        >
          <CategoryCart
            title="Máy tính bảng"
            image={tabletImg}
            selected={selectedCategory === "65c4bd7f813792e7c8fde3db"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("Selected category: Đồng hồ");
            handleSelectCategory("65c4bd89813792e7c8fde3e0");
          }}
        >
          <CategoryCart
            title="Đồng hồ"
            image={watchImg}
            selected={selectedCategory === "65c4bd89813792e7c8fde3e0"}
          />
        </TouchableOpacity>
      </View>

      {/* Products */}
      <View style={styles.productContainer}>
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          numColumns={numColumns}
          ListEmptyComponent={() => {
            if (loading) return null;

            return (
              <View style={styles.centered}>
                <Text>No products found</Text>
              </View>
            );
          }}
          contentContainerStyle={styles.flatListContainer}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => <ProductCard item={item} />}
        />

        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
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
    width: "90%",
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
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
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
  loading: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
});

export default ProductListScreen;
