import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    height: '500px',
    maxWidth: '400px',
    maxHeight: '100%',
  },
  media: {
    height: '250px',
    width: '250px',
    display: 'block',
    padding: '20px',
    maxHeight: '90%',
    maxWidth: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
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
