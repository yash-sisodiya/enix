import { User } from '@/common/interface';
import MainLayout from '@/components/layouts/MainLayout';
import { formatAddress, formatName } from '@/utils';
import { useLocalSearchParams } from 'expo-router';
import { Fragment, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function HomeScreen() {
  const { id } = useLocalSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await fetch(`https://dummyjson.com/users/${id}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserDetails();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" className="flex-1" />;
  }

  const basicDetails = [
    { label: 'Birth Date', value: user?.birthDate },
    { label: 'Age', value: user?.age },
    { label: 'Address', value: formatAddress(user?.address) },
    { label: 'Blood Group', value: user?.bloodGroup },
    { label: 'Height', value: user?.height },
    { label: 'Weight', value: user?.weight },
    { label: 'Eye Color', value: user?.eyeColor },
  ];
  return (
    <MainLayout isBack title={user?.firstName}>
      <ScrollView>
        {user && (
          <Fragment>
            <View style={styles.container}>
              <View style={styles.avatarContainer}>
                <Image
                  source={{
                    uri:
                      user?.image ||
                      'https://www.bootdey.com/img/Content/avatar/avatar6.png',
                  }}
                  style={styles.avatar}
                />
                <Text style={styles.name}>
                  {formatName(user?.firstName, user?.lastName)}
                </Text>
              </View>
              {basicDetails &&
                basicDetails.map(item => (
                  <View
                    style={styles.infoContainer}
                    key={`${item?.label}-profile`}
                  >
                    <Text style={styles.infoLabel}>{item?.label}:</Text>
                    <Text style={styles.infoValue}>{item?.value}</Text>
                  </View>
                ))}
            </View>
          </Fragment>
        )}
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
  infoValue: {
    marginTop: 5,
  },
});
