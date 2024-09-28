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

const App = () => {
  const [users, setUsers] = useState<UsersListInterface>({ users: [] });
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();
  const limit = 10;

  const fetchUsers = async (newPage: number) => {
    if (!hasMore) return;
    try {
      if (newPage === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      const response = await fetch(
        `https://dummyjson.com/users?sortBy=firstName&order=asc&limit=${limit}&skip=${(newPage - 1) * limit}`,
      );
      const data = await response.json();

      if (data.users.length < limit) {
        setHasMore(false);
      }

      setUsers(prevState => ({
        users: newPage === 1 ? data.users : [...prevState.users, ...data.users],
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleLoadMore = () => {
    if (!loadingMore && !loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  if (loading && page === 1) {
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
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.8}
          ListFooterComponent={
            loadingMore ? <ActivityIndicator size="small" /> : null
          }
        />
      </View>
    </MainLayout>
  );
};

export default App;
