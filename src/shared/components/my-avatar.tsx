import createAvatar from '@/utils/createAvatar';

import { MAvatarProps } from './@material-extend/MAvatar';
import { MAvatar } from './@material-extend';

export default function MyAvatar({ ...other }: MAvatarProps) {
  const user = { photoURL: '', displayName: 'Fuong' };

  return (
    <MAvatar
      src={user?.photoURL}
      alt={user?.displayName}
      color={user?.photoURL ? 'default' : createAvatar(user?.displayName).color}
      {...other}
    >
      {createAvatar(user?.displayName).name}
    </MAvatar>
  );
}
