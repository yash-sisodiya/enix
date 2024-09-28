import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export const UserCard = ({
  url,
  name,
  email,
  phone,
}: {
  url?: string;
  name?: string;
  email?: string;
  phone?: string;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          alt=""
          source={{
            uri: url
              ? url
              : 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
          }}
          style={styles.profileAvatar}
        />

        <View>
          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.profileHandle}>{email}</Text>
          <Text style={styles.profileHandle}>{phone}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
  /** Profile */
  profile: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#000',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    marginRight: 12,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#292929',
  },
  profileHandle: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: '400',
    color: '#858585',
  },
});
