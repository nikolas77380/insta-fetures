import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import productCurvyLines from '../../images/productCurvyLines.png';
import productValues1 from '../../images/productValues1.svg';
import productValues2 from '../../images/productValues2.svg';
import productValues3 from '../../images/productValues3.svg';

const styles = theme => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(30),
    display: 'flex',
    position: 'relative',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  image: {
    height: 55,
  },
  title: {
    textAlign: 'center',
    padding: '0 10px',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  label: {
    textAlign: 'center',
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
  },
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src={productCurvyLines}
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src={productValues1}
                alt="suitcase"
              />
              <Typography variant="h6" className={classes.title}>
                Efficiently manage Instagram assets
              </Typography>
              <Typography variant="h5" className={classes.label}>
                {'Maintain one place for your team to store, edit and publish on-brand images'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src={productValues2}
                alt="graph"
              />
              <Typography variant="h6" className={classes.title}>
                Streamline your posting process
              </Typography>
              <Typography variant="h5" className={classes.label}>
                {'Save time creating content by scheduling and publishing photos directly with Instagram publishing.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src={productValues3}
                alt="clock"
              />
              <Typography variant="h6" className={classes.title}>
                Message-level insights
              </Typography>
              <Typography variant="h5" className={classes.label}>
                {'Quickly identify messages that resonate with your Instagram audience by tracking performance at the post level.'}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);
