import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {useGetSellersQuery, useUpdateSellerMutation} from '../../api/seller';
import ToggleSwitch from 'toggle-switch-react-native';

const HomeScreen = () => {
  const {data, isLoading, isError} = useGetSellersQuery();
  const [updateSeller] = useUpdateSellerMutation();
  const [sellerStatus, setSellerStatus] = useState({});

  useEffect(() => {
    if (data?.data) {
      const initialStatus = {};
      data.data.forEach(seller => {
        initialStatus[seller._id] = seller.isApproved;
      });
      setSellerStatus(initialStatus);
    }
  }, [data]);

  const handleToggle = (sellerId, isOn) => {
    updateSeller({ id: sellerId, isApproved: isOn });
  
    setTimeout(() => {
      ToastAndroid.show(
        `Seller ${isOn ? 'approved' : 'disapproved'}`,
        ToastAndroid.SHORT
      );
    }, 1000); 
  };
  
  

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image
        source={require("../../../assets/images/user.png")}
        style={styles.avatar}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
      <ToggleSwitch
        isOn={sellerStatus[item._id] || false}
        onColor="#4CAF50"
        offColor="#E0E0E0"
        thumbOnStyle={styles.thumbStyle}
        thumbOffStyle={styles.thumbStyle}
        trackOnStyle={styles.trackStyle}
        trackOffStyle={styles.trackStyle}
        size="medium"
        onToggle={isOn => handleToggle(item._id, isOn)}
        animationSpeed={200}
      />
    </View>
  );

  if (isLoading) return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#56D1A7" />
    </View>
  );

  if (isError) return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>⚠️ Failed to load data</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../../../assets/images/icon2.png')}
        />
        <Text style={styles.headerText}>Plantify Admin</Text>
      </View>

      <FlatList
        data={data?.data}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.flatListContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No sellers found</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom:10
  },
  logo: {
    height: 35,
    width: 43,
    borderRadius: 8,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    marginLeft: 12,
    letterSpacing: 0.25,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
    marginRight: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  email: {
    fontSize: 14,
    color: '#666666',
  },
  thumbStyle: {
    borderRadius: 12,
  },
  trackStyle: {
    borderRadius: 16,
  },
  separator: {
    height: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 16,
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888888',
    marginTop: 20,
    fontSize: 16,
  },
});

export default HomeScreen;