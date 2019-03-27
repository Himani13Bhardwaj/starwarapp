import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CardMedia from '@material-ui/core/CardMedia';
import axios from 'axios';
const styles = theme => ({
    card: {
        width: '70%',
        backgroundColor: "#fafafa",
        margin: "auto"
    },
    cardContent:{
        textAlign: 'left',
        padding: '2em',
        width: '70%',
        display: 'inline-block',
        float: 'right'
    },
    media:{
        width: '21%',
        margin: '10px',
        display: 'block',
        float: 'left',
        height: '300px',
        boxShadow: "2px 3px 3px 3px #CCC;"
    },
    cardAction:{
        display: 'inline-flex'
    },
    title:{
        marginTop: '1em'
    },
    p:{
        letterSpacing: '2px',
        lineHeight: '2em',
        fontSize: '16px'
    },
    button:{
        margin: theme.spacing.unit,
    }
});

class Details extends React.Component {
    state = {
        data: {
            skills: []
        }
    }

    componentDidMount () {
        const handle  = this.props.match.params.details;
        console.log( handle );
        axios.get('/getCharacterDeatils/'+ handle )
            .then((response) => {
                this.setState({ data: response.data})
            }).catch(err => console.log("Axios err: ", err))
    }
    render() {
        const {classes} = this.props;
        return (
            <Card className={classes.card}>
            <CardMedia className={classes.media}
                                      image={`../resources/${this.state.data.img}`}
                                      title={this.state.data.title} />
            <CardContent className={classes.cardContent}>

                <Typography variant="h5" component="h2">
                        {this.state.data.character}
                </Typography>
                    <Divider light />
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Portray By - {this.state.data.portray}
                </Typography>

                <Typography variant="h5" component="h5">
                        Description:
                </Typography>
                <Typography component="p" className={classes.p}>
                    {this.state.data.description}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardAction}>
                <Button size="medium" variant="contained" color="primary" className={classes.button}>Share Information</Button>
            </CardActions>
            <Divider light />
        </Card>
        )
    }
}

Details.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Details);
