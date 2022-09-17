import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  time: {
      paddingBottom: '20px',
      marginBottom: theme.spacing(2),
  },

  main: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: '5%',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
    },
  },

  progress: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1),
    },
  },

  grid: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}));