import { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { CardHeader } from '@mui/material';
import { Location } from './location';
import { Episodes } from './episodes';

export interface BadgeProps {
    status: CharacterStatus;
}

const badgeColorByStatus: {[key in CharacterStatus]: string} = {
   'Alive' : '#55cc44',
   'Dead' : '#d63d2e',
   'Unknown' : '#9e9e9e',
};

const StyledBadge = styled(Badge)<BadgeProps>(({
    theme,
    status,
}) => ({
    '& .MuiBadge-badge': {
      backgroundColor:  badgeColorByStatus[status],
      color: badgeColorByStatus[status],
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
}));

export const CharacterCard: FC<{data: ICharacter}> = ({data}) => {
  const locationId: number | null = data.location.url ? parseInt(data.location.url.split('/').slice(-1)[0]) : null;
  const originId: number | null = data.origin.url ? parseInt(data.origin.url.split('/').slice(-1)[0]) : null;
  const episodeIds: number[] | null = data.episode ? data.episode.map(x=> parseInt(x.split('/').slice(-1)[0])) : null;

  return (
    <Card
        sx={{
            height: '100%'
        }}
    >
        <CardHeader
            avatar={
                <StyledBadge
                    overlap="circular"
                    color="primary"
                    status={data.status}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar 
                        src={data.image}
                        alt={data.name}
                    />
                </StyledBadge>
            }
            title={data.name}
            subheader={`${data.status} - ${data.species}`}
        />
        <CardContent>
            <Location type="location" id={locationId} />
            <Location type="origin" id={originId} />
            <Episodes ids={episodeIds} />
        </CardContent>
    </Card>
  );
}
