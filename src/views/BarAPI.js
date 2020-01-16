import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, FlatList, Text } from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'
import GridItem from '../components/GridItem'
import { appUrl } from '../config'
import {
    updateNoOfItemInBar,
    populateItemsInBar
} from '../store/actions/barActions'
import { populateMoreItemsInBar } from '../store/actions/moreItemsToOrderActions'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { Spinner } from 'react-native-ui-kitten'

class BarAPI extends Component {
    constructor() {
        super()
        this.state = {
            isLoadingBarItems: true,
            barItems: []
        },
            this.limit = 10;
    }

    componentWillMount() {
        this.getBarItems();
    }

    getBarItems() {
        // let url = appUrl + `/getItemsFromNewBar?page=1&limit=${this.limit}`
        let url = '',
            location = ''
        if (this.props.staffData.Branch === 'Old Bar') {
            url = appUrl + '/getItemsFromOldBar'
            location = 'OldBar'
        } else if (this.props.staffData.Branch === 'New Bar') {
            url = appUrl + `/getItemsFromNewBar`
            location = 'NewBar'
        }
        // let url = appUrl + `/getItemsFromNewBar`

        axios
            .get(url)
            .then(async response => {
                if (response.data.hasItems) {
                    console.log('response.data.hasItems: ', response.data.items);
                    this.setState({ barItems: response.data.items })
                    this.props.populateItemsInBar(response.data.items)
                    this.limit = this.limit + 10
                    this.setState({
                        isLoadingBarItems: false
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    renderGridItem = ({ item, index }) => (
        <GridItem
            item={item}
            index={index}
            onChange={(value, eventType, itemId) => {
                this.props.updateNoOfItemInBar(value, index, itemId)
            }}
        />
    )

    render() {
        // let dataBar = this.state.barItems;
        let dataBar = this.props.bar;

        return (
            <View style={styles.gridContainer}>
                {this.state.isLoadingBarItems ? (
                    <View style={styles.emptyContainer}>
                        <Spinner size="giant" status="alternative" />
                    </View>
                ) : this.props.bar.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <MaterialIcon name="hourglass-empty" size={50} color="gray" />
                        <Text style={styles.emptyText}>None Found.</Text>
                    </View>
                ) : (
                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1, }}>
                                <FlatList
                                    data={dataBar}
                                    extraData={this.props}
                                    keyExtractor={item => item.itemId}
                                    renderItem={this.renderGridItem}
                                    horizontal={false}
                                    numColumns={2}
                                    contentContainerStyle={styles.gridLayout}
                                // onEndReached={this.loadMore.bind(this)}
                                />
                            </ScrollView>
                        )}
            </View>
        )
    }
}

mapStateToProps = state => {
    
    return {
        bar: state.barReducer.bar,
        barCheckOut: state.barReducer.barCheckOut,
        staffData: state.homeReducer.staffData
    }
}

mapDispatchToProps = dispatch => {
    return {
        updateNoOfItemInBar: (value, index, itemId) => {
            dispatch(updateNoOfItemInBar(value, index, itemId))
        },
        populateItemsInBar: value => {
            dispatch(populateItemsInBar(value))
            dispatch(populateMoreItemsInBar(value))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BarAPI)

const styles = StyleSheet.create({
    gridContainer: {
        flex: 1,
        backgroundColor: '#eee',
        padding: 5
    },
    gridLayout: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    emptyContainer: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyText: {
        fontSize: 16,
        color: 'gray',
        marginTop: 10
    }
})
