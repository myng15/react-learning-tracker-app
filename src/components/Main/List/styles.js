import { makeStyles } from '@material-ui/core/styles';
import { red, blue } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  avatarMedia: {
    color: '#fff',
    backgroundColor: blue[500],
  },

  avatarProject: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
  },

  list: {
    maxHeight: '50vh',
    overflow: 'auto',
  },

  listSection: {
    backgroundColor: 'inherit',
  },

  listSubheader: {
    fontSize: '1.2em',
    fontWeight: 'bold',
    backgroundColor: 'rgba(117, 112, 192, 0.3)',
  },
  
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));
