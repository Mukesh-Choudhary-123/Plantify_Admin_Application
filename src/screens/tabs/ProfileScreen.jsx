import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../../../assets/images/icon2.png')}
        />
        <Text style={styles.headerText}>Plantify Admin</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Admin Profile</Text>
        <Text style={styles.label}>Name: <Text style={styles.value}>Mukesh Choudhary</Text></Text>
        <Text style={styles.label}>Role: <Text style={styles.value}>Super Admin</Text></Text>
        <Text style={styles.label}>Email: <Text style={styles.value}>admin@plantify.com</Text></Text>

        <View style={styles.separator} />

        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.label}>Support Email: <Text style={styles.value}>support@plantify.com</Text></Text>
        <Text style={styles.label}>Phone: <Text style={styles.value}>+91 98765 43210</Text></Text>
        <Text style={styles.label}>Office Address:</Text>
        <Text style={styles.value}>
          2nd Floor, Green Tech Tower,{'\n'}
          MG Road, Jaipur, Rajasthan - 302001
        </Text>
      </View>
    </View>
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 10,
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
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  value: {
    fontWeight: '500',
    color: '#111',
  },
  separator: {
    marginVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
});

export default ProfileScreen;
