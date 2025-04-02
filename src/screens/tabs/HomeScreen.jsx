import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useGetSellersQuery, useUpdateSellerMutation } from '../../api/seller';
import ToggleSwitch from 'toggle-switch-react-native';

const HomeScreen = () => {
  const { data, isLoading, isError } = useGetSellersQuery();
    console.log('Data :- ', data);
    const [updateSeller ] = useUpdateSellerMutation();

  const [sellerStatus, setSellerStatus] = useState({});

  useEffect(() => {
    if (data && data.data) {
      const initialStatus = {};
      data.data.forEach((seller) => {
        initialStatus[seller._id] = seller.isApproved;
      });
      setSellerStatus(initialStatus);
    }
  }, [data]);

  const handleToggle = (sellerId, isOn) => {
    console.log(`Seller ${sellerId} changed to:`, isOn);
    updateSeller({id:sellerId , isApproved:isOn})
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
      <ToggleSwitch
        isOn={sellerStatus[item._id] || false}
        onColor="green"
        offColor="red"
        size="small"
        onToggle={(isOn) => handleToggle(item._id, isOn)}
        animationSpeed={300}
      />
    </View>
  );

  if (isLoading) return <Text style={styles.statusText}>Loading...</Text>;
  if (isError) return <Text style={styles.statusText}>Error loading data</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>PLANTIFY ADMIN</Text>
      </View>
      <FlatList
        data={data?.data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: 60,
    width: '100%',
    backgroundColor: '#0D986A',
    justifyContent: 'center',
  },
  headerText: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  flatListContent: {
    padding: 10,
  },
  itemContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'pink',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
  },
  statusText: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default HomeScreen;
