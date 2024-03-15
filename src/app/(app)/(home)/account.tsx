import {
  Button,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Title from '@/components/title';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { router, Stack } from 'expo-router';
import { useSession } from '@/context/AuthContext';
import { useGetAccount } from '@/api/account';
import Toast from 'react-native-toast-message';
import LoadingView from '@/components/loading-view';
import { useGetOwnPosts } from '@/api/posts';
import Caption from '@/components/caption';
import PostsList from '@/components/posts-list';
import RetryView from '@/components/retry-view';

export default function Account() {
  const { signOut } = useSession();
  const { colorScheme } = useColorScheme();
  const account = useGetAccount();
  const posts = useGetOwnPosts();

  if (account.isPending) {
    return <LoadingView />;
  }

  if (account.isError) {
    Toast.show({
      type: 'customToast',
      text1: 'Error loading profile',
      text2: account.error.message,
      position: 'bottom',
      visibilityTime: 8000,
    });
    return (
      <>
        <Button title='logout' onPress={() => signOut()} />
        <RetryView
          refetch={async () => {
            await Promise.all([posts.refetch(), account.refetch()]);
          }}
        />
      </>
    );
  }

  if (posts.isError) {
    Toast.show({
      type: 'customToast',
      text1: 'Error',
      text2: posts.error.message,
      position: 'bottom',
      visibilityTime: 8000,
    });
  }

  const onRefresh = async () => {
    await posts.refetch();
  };

  return (
    <>
      <Stack.Screen options={{ headerTitle: 'Account' }} />
      <ScrollView
        className={'flex-1 px-4 dark:bg-black'}
        refreshControl={
          <RefreshControl
            refreshing={posts.isRefetching}
            onRefresh={onRefresh}
          />
        }
      >
        <View className='items-center'>
          <Ionicons
            name='person-circle'
            size={100}
            color={
              colorScheme === 'dark'
                ? 'rgba(255, 255,255, 0.7)'
                : 'rgba(0, 0, 0, 0.6)'
            }
            className='mt-8'
          />
          <Title
            text={account.data.firstName + ' ' + account.data.lastName}
            className='pb-0 pt-1'
          />
          <Text
            className={'text-lg text-background-600 dark:text-background-400'}
          >
            {'@' + account.data.user}
          </Text>
        </View>
        <View className={'mt-8 gap-2'}>
          <View className='my-4 mt-0 divide-y divide-yellow-300 rounded-2xl bg-white pl-4 dark:bg-background-900'>
            <Pressable
              onPress={() => router.push('/edit-account')}
              className='flex-row items-center justify-between border-b-[0.7px] border-b-black/10 py-3 pr-4 pt-4 active:opacity-70 dark:border-b-white/10'
            >
              <Text className='p-0 text-lg text-black dark:text-white'>
                Edit profile
              </Text>
              <Ionicons
                name='chevron-forward'
                size={20}
                color={
                  colorScheme === 'light'
                    ? 'rgba(0, 0, 0, 0.4)'
                    : 'rgba(255, 255, 255, 0.4)'
                }
              />
            </Pressable>
            <Pressable
              onPress={() => {
                router.push('/edit-preferences');
              }}
              className='flex-row items-center justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 active:opacity-70 dark:border-b-white/10'
            >
              <Text className='p-0 text-lg text-black dark:text-white'>
                Edit dietary preferences
              </Text>
              <Ionicons
                name='chevron-forward'
                size={20}
                color={
                  colorScheme === 'light'
                    ? 'rgba(0, 0, 0, 0.4)'
                    : 'rgba(255, 255, 255, 0.4)'
                }
              />
            </Pressable>
            <Pressable className='flex-row items-center justify-between border-b-[0.7px] border-b-black/10 py-3 pb-3 pr-4 active:opacity-70 dark:border-b-white/10'>
              <Text className='p-0 text-lg text-red-500'>Change password</Text>
              <Ionicons
                name='chevron-forward'
                size={20}
                color={
                  colorScheme === 'light'
                    ? 'rgba(0, 0, 0, 0.4)'
                    : 'rgba(255, 255, 255, 0.4)'
                }
              />
            </Pressable>
            <Pressable
              onPress={() => {
                signOut();
              }}
              className='flex-row items-center justify-between py-3 pb-4 pr-4 active:opacity-70'
            >
              <Text className='p-0 text-lg text-red-500'>Log out</Text>
              <Ionicons
                name='chevron-forward'
                size={20}
                color={
                  colorScheme === 'light'
                    ? 'rgba(0, 0, 0, 0.4)'
                    : 'rgba(255, 255, 255, 0.4)'
                }
              />
            </Pressable>
          </View>
        </View>
        <Caption text='Your posts' />
        <View className={'items-center gap-3 pb-4'}>
          <PostsList
            posts={posts.data}
            isPending={posts.isPending}
            isError={posts.isError}
            refetch={posts.refetch}
          />
        </View>
      </ScrollView>
    </>
  );
}
