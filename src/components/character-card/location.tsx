import { List, ListItem, ListItemText, ListSubheader, Skeleton } from '@mui/material';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { LocationService } from '../../service';

export const Location: FC<{
    type: 'origin' | 'location';
    id: number | null;
}> = ({
    type,
    id
}) => {
  const { status, data } = useQuery(
    ['location', id],
    () => LocationService.getById(id!),
    {
      enabled: !!id,
      keepPreviousData: true,
      staleTime: 5000
    }
  );

  const valueWrapper = (value: any) => {
    return status === 'loading' ? <Skeleton variant="text" width={30} /> : (id ? value : '-')
  }

  return (
    <List
      subheader={<ListSubheader>{type}</ListSubheader>}
    >
      <ListItem>
        <ListItemText secondary="name:" />
        {valueWrapper(data?.name)}
      </ListItem>
      <ListItem>
        <ListItemText secondary="dimension:" />
        {valueWrapper(data?.dimension)}
      </ListItem>
      <ListItem>
        <ListItemText secondary="amount of residents:" />
        {valueWrapper(data?.residents.length)}
      </ListItem>
    </List>
  );
}
