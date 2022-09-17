import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    progress: {
        borderBottom: '10px solid rgba(0, 151, 196, 0.5)',
    },

    time: {
        borderBottom: '10px solid rgba(255, 0, 0, 0.5)',
    },
    
    chartsCard: {
        [theme.breakpoints.up('sm')]: {
          display: 'flex',
          direction: 'column',
          justifyContent: 'space-evenly',
          padding: '0 30px',
        },
        textAlign: 'center',
        
    },
      
    doughnut: {
        [theme.breakpoints.only('lg')]: {
            width: '300px',
        },   
        [theme.breakpoints.only('md')]: {
            width: '250px',
        },   
        [theme.breakpoints.only('sm')]: {
            width: '250px',
        },   
    },

    progressList: {
        maxHeight: '30vh',
        overflow: 'auto',
      },
}));