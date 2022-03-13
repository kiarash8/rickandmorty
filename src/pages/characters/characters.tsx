import { Alert, Grid, Pagination, Stack } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { CharacterCard } from '../../components/character-card/character-card';
import { CharacterService } from '../../service';

export const Characters: FC = () => {
  const queryClient = useQueryClient();
  const rowsPerPage = 20;
  const [page, setPage] = useState(1);
  const { status, data } = useQuery(
    ['characters', page],
    () => CharacterService.getAll(
      page,
    ),
    {
      keepPreviousData: true,
      staleTime: 5000
    }
  );

  // Prefetch the next page!
  useEffect(() => {
    if (data?.info.next) {
      queryClient.prefetchQuery(['characters', page + 1], () =>
        CharacterService.getAll(page + 1)
      )
    }
  }, [data, page, queryClient]);

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };
 
  return (
  <Stack>
    {status === 'loading' ? (
      <Alert severity="info">Loading...</Alert>
    ) : status === 'error' ? (
      <Alert severity="error">Error</Alert>
    ) : (
      <Grid container spacing={3}>
        {data?.results.map(character => (
          <Grid
            item
            key={character.id}
            xs={12}
            md={6}
            lg={4}
            xl={3}
          >
            <CharacterCard data={character} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="center"
          >              
            <Pagination
              count={data?.info ? Math.ceil(data?.info.count/rowsPerPage) : 0}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </Grid>
      </Grid>
    )}
  </Stack>
  );
}


