import { UsersListInterface } from '@/common/interface';
import MainLayout from '@/components/layouts/MainLayout';
import { UserCard } from '@/components/Molecules/UserCard';
import { formatName } from '@/utils';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';

const users = [
  { id: '1', name: 'User 1' },
  { id: '2', name: 'User 2' },
  { id: '3', name: 'User 3' },
];

const App = () => {
  const [users, setUsers] = useState<UsersListInterface>({ users: [] });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);
  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <MainLayout>
      <View style={{ flex: 1, padding: 10 }}>
        <FlatList
          data={users?.users}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: '/(tabs)/profile',
                  params: { id: item.id },
                });
              }}
            >
              <UserCard
                name={formatName(item?.firstName, item?.lastName)}
                email={item?.email}
                phone={item?.phone}
                url={item?.image}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </MainLayout>
  );
};

export default App;
