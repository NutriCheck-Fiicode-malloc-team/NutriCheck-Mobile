import * as DropdownMenu from 'zeego/dropdown-menu';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';

export default function DeleteDropdown({ onDelete }: { onDelete: () => void }) {
  const { colorScheme } = useColorScheme();

  return (
    <DropdownMenu.Root style={{ width: 40 }}>
      <DropdownMenu.Trigger style={{ width: 40, alignItems: 'center' }}>
        <View>
          <Ionicons
            name='ellipsis-horizontal'
            size={20}
            color={colorScheme === 'dark' ? 'white' : 'black'}
          />
        </View>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          <DropdownMenu.Item
            key={'delete'}
            onSelect={onDelete}
            destructive={true}
          >
            <DropdownMenu.ItemIcon ios={{ name: 'trash' }}>
              <Ionicons
                name='trash'
                size={20}
                color={colorScheme === 'dark' ? 'white' : 'black'}
              />
            </DropdownMenu.ItemIcon>
            <DropdownMenu.ItemTitle children={'Delete'} />
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
