import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Header as NativeHeader } from "react-native-elements";
import { Content, DatePicker } from "native-base";
import { DataTable } from "react-native-paper";
import axios from "axios";
import PopupMenu from "../components/PopupMenu";

export default function Summary({ navigation }) {
  console.log('navigation.params');
  console.log(navigation.params);
  console.log(navigation?.params?.staffData);

  const [state, setState] = useState({
    isLoading: false,
    activeSummary: "Store Inventory",
    // staffData: navigation?.params?.staffData
  });

  useEffect(() => {});

  const makeRequest = () => {
    let url = appUrl + "/getStoreInventory",
      Staff_ID = this.props.staffData.Staff_ID,
      chosenDate = this.state.chosenDate;

    axios
      .post(url, { Staff_ID, chosenDate })
      .then(async (response) => {
        if (response.data.hasItems) {
          const sales = response.data.sales;
          this.props.populateItemsInSales(sales);
          if (sales.length > 0) {
            const totalSales = sales.reduce(
              (total, obj) => obj.transactionTotalAmount + total,
              0
            );
            this.setState({
              totalSales,
            });
          }
        }
        this.setState({
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onPopupEvent = (eventName, index) => {
    let activeSummary = state.activeSummary;
    if (index === 0) {
      activeSummary = "Store Inventory";
    } else if (index === 1) {
      activeSummary = "Sales History";
    } else if (index === 2) {
      activeSummary = "Expenses History";
    }
    setState({ ...state, activeSummary });
  };

  return (
    <View style={styles.layoutContainer}>
      <NativeHeader
        centerComponent={
          <View style={styles.centerWrapper}>
            <Text style={styles.centerText}>{state.activeSummary}</Text>
          </View>
        }
        rightComponent={
          <View style={styles.rightWrapper}>
            <PopupMenu
              actions={["Store Inventory", "Sales History", "Expenses History"]}
              onPress={onPopupEvent}
            />
          </View>
        }
        containerStyle={{
          backgroundColor: "#2e88ce",
          justifyContent: "space-around",
        }}
      />
      <View style={styles.contentWrapper}>
        {state.isLoading ? (
          <View style={styles.emptyContainer}>
            <ActivityIndicator size="large" color="#2e88ce" />
          </View>
        ) : (
          <>
            <DataTable>
              <ScrollView horizontal>
                <View>
                  <DataTable.Header>
                    <DataTable.Title style={styles.singleCell}>
                      Dessert
                    </DataTable.Title>
                    <DataTable.Title style={styles.singleCell} numeric>
                      Calories
                    </DataTable.Title>
                    <DataTable.Title style={styles.singleCell} numeric>
                      Fat
                    </DataTable.Title>
                    <DataTable.Title style={styles.singleCell}>
                      Dessert
                    </DataTable.Title>
                    <DataTable.Title style={styles.singleCell} numeric>
                      Calories
                    </DataTable.Title>
                    <DataTable.Title style={styles.singleCell} numeric>
                      Fat
                    </DataTable.Title>
                  </DataTable.Header>

                  <DataTable.Row>
                    <DataTable.Cell style={styles.singleCell}>
                      Frozen yogurt
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.singleCell} numeric>
                      159
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.singleCell} numeric>
                      6.0
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.singleCell}>
                      Frozen yogurt
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.singleCell} numeric>
                      159
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.singleCell} numeric>
                      6.0
                    </DataTable.Cell>
                  </DataTable.Row>

                  <DataTable.Row>
                    <DataTable.Cell style={styles.singleCell}>
                      Ice cream sandwich
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.singleCell} numeric>
                      237
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.singleCell} numeric>
                      8.0
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.singleCell}>
                      Ice cream sandwich
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.singleCell} numeric>
                      237
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.singleCell} numeric>
                      8.0
                    </DataTable.Cell>
                  </DataTable.Row>
                </View>
              </ScrollView>

              <DataTable.Pagination
                page={1}
                numberOfPages={3}
                onPageChange={(page) => {
                  console.log(page);
                }}
                label="1-2 of 6"
              />
            </DataTable>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
    backgroundColor: "#eee",
  },
  contentWrapper: {
    padding: 16,
    height: "100%",
  },
  emptyContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  rightWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  centerWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 40,
  },
  centerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  singleCell: {
    width: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});
