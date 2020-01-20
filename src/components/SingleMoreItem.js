import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TextInput,
  TouchableWithoutFeedback,
  ToastAndroid,
} from "react-native";
import { connect } from "react-redux";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { getImage } from "../config";

class SingleMoreItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newValue: 0
    };
  }

  onUpdate = (type, value) => {
    let amount = this.props.item.noInCheckOut,
      quantity = this.props.item.Quantity;

    switch (type) {
      case "increment":
        let newAmount = amount + 1;
        if (newAmount > quantity) {
          ToastAndroid.show(
            "Item cannot be more than quantity in inventory!",
            ToastAndroid.SHORT
          );
        } else {
          amount = newAmount;
        }
        break;
      case "decrement":
        amount = amount - (amount ? 1 : 0);
        break;
      case "input":
        if (value > quantity) {
          ToastAndroid.show(
            "Item cannot be more than quantity in inventory!",
            ToastAndroid.SHORT
          );
        } else {
          amount = value;
        }
        break;
      default:
        break;
    }
    this.setState({
      newValue: amount
    });
    this.props.onChange(amount, type);
  };

  render() {
    return (
      <View style={styles.itemContainer}>
        <TouchableWithoutFeedback onPress={() => this.onUpdate("increment")}>
          <View>
            <ImageBackground
              source={{ uri: getImage(this.props.item.image.url) }}
              style={styles.itemBgImage}
              resizeMode="contain"
            />
            <View style={styles.itemAndPriceContainer}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.itemNameText}
              >
                {this.props.item.name}
              </Text>
              <Text
                style={styles.itemPriceText}
              >{`₦${this.props.item.price}`}</Text>
            </View>
            <View style={styles.counterContainer}>
              <TouchableWithoutFeedback
                onPress={() => this.onUpdate("increment")}
              >
                <EntypoIcon name="plus" size={30} color="#c98811" />
              </TouchableWithoutFeedback>
              <TextInput
                style={styles.counterText}
                onChangeText={userInput =>
                  this.onUpdate("input", Number(userInput))
                }
                value={this.state.newValue.toString()}
                keyboardType={"numeric"}
                selectTextOnFocus
              />
              <TouchableWithoutFeedback
                onPress={() => this.onUpdate("decrement")}
              >
                <EntypoIcon name="minus" size={30} color="#c98811" />
              </TouchableWithoutFeedback>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    currentTab: state.homeReducer.currentTab
  };
};

export default connect(mapStateToProps, null)(SingleMoreItem);

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2,
    padding: 5,
    maxWidth: "45%",
    margin: 10
  },
  itemBgImage: {
    width: "100%",
    height: 80
  },
  itemBgCheckBoxContainer: {
    flex: 1,
    alignItems: "flex-end"
  },
  itemAndPriceContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  itemNameText: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 15
  },
  itemPriceText: {
    color: "gray"
  },
  counterContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 7
  },
  counterText: {
    fontSize: 20,
    borderColor: "transparent"
  }
});
