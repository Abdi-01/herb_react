import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    maxWidth: '100%',
    maxHeight: '550px',
  },
  media: {
    height: '300px',
    width: '300px',
    display: 'block',
    maxHeight: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '100%',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

// backdropFilter: 'blur(16px) saturate(180%)',
//   webkitBackdropFilter: 'blur(16px) saturate(180%)';

//   borderRadius: '12px';
//   border: '1px solid rgba(255, 255, 255, 0.125)';
