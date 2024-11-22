import React, { useEffect, useMemo, useState } from "react";
import ListItem from "../../components/cart/ListItem";
import NavBottom from "../../components/cart/NavBottom";
import Header from "../../components/cart/Header";
import { useSelector } from "react-redux";
import { View, StyleSheet, Image } from "react-native";

export default function CartScreen() {
  const carts = useSelector((state) => state.cart.items);
  const [cartCheck, setCartCheck] = useState([]);

  // Manage an array of checked states for each cart item
  const [checkedItems, setCheckedItems] = useState(
    carts.map(() => false) // Initialize as false for each item
  );

  // Toggle all checkboxes when "Tất cả" is checked/unchecked
  const toggleAllChecked = (isChecked) => {
    setCheckedItems(carts.map(() => isChecked));
  };

  // Calculate the total price and update checked item IDs
  const totalPrice = useMemo(() => {
    const ids = []; // Array to hold the IDs of checked items
    const total = carts.reduce((total, cart, index) => {
      if (checkedItems[index]) {
        ids.push(cart.id); // Assuming each cart item has an `id` property
        return total + cart.total;
      }
      return total;
    }, 0);

    // Update the cartCheck state with the IDs of checked items
    setCartCheck(ids);

    return total;
  }, [carts, checkedItems]);

  return (
    <View style={styles.container}>
      <Header quantity={carts.length} />
      {carts.length > 0 ? (
        <>
          <ListItem carts={carts} checkedItems={checkedItems} setCheckedItems={setCheckedItems} />
          <NavBottom
            setIsChecked={(isChecked) => toggleAllChecked(isChecked)}
            isChecked={checkedItems.every((item) => item)}
            items={cartCheck}
            totalPrice={totalPrice} // Pass the total price to NavBottom
            checkedCount={checkedItems.filter((item) => item).length} // Pass the count of checked items
            cartCheck={cartCheck} // Pass the checked item IDs to NavBottom if needed
          />
        </>
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Image style={{ width: 200, height: 200 }} source={require("../../assets/images/rejected.png")} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#212121",
    paddingVertical: 55,
    paddingTop: 85,
  },
});
