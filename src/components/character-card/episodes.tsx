import { Chip, List, ListItem, ListSubheader, Skeleton, Stack } from '@mui/material';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { EpisodesService } from '../../service';

export const Episodes: FC<{
    ids: number[] | null;
}> = ({ ids }) => {
  const { status, data } = useQuery(
    ['episodes', ids],
    () => EpisodesService.getByIds(ids!),
    {
      enabled: !!ids,
      keepPreviousData: true,
      staleTime: 5000
    }
  );

  return (
    <List
      subheader={<ListSubheader>episodes</ListSubheader>}
    >
      <ListItem>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={1}
          sx={{
            overflowX: 'auto',
            overflowY: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {status === 'loading' ?
          <>
            <Skeleton variant="text" height={24} width={50} /> 
            <Skeleton variant="text" height={24} width={60} /> 
            <Skeleton variant="text" height={24} width={40} /> 
          </>
          : (data && data?.length > 0) ? data.map(item =>
              <Chip
                key={item.id}
                label={item.name}
                variant="outlined"
                size="small"
              />
            ) : '-'
          }
        </Stack>
      </ListItem>
    </List>
  );
}
