import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const styles = theme => ({
    card: {
        width: 300,
        display: 'inline-block',
        margin: '2em',
        float: 'left'
    },
    root: {
        width: '94%',
        margin: 'auto',
        display: 'inline-block'
    },
    inline: {
        display: 'inline',
    },
    media: {
        height: 200,
     },
    cardActionBtn:{
        float: 'right'
    },
    h6:{
        padding: 0
    },
    outlinedSearch:{
     width: "85%",
     backgroundColor: "#fff"
    }
});

class CharacterList extends React.Component {
    state = {
        response: [],
        data: []
    }
    constructor(props) {
        super(props);
        this.state.response = []
        this.state.searchResult = '';
    }

    componentDidMount () {
        const option = {
            cache: false,
            contentType: 'application/json'
        }
        axios.get('/getCharacterList', option)
            .then((response) => {
            this.setState({ response: response.data})
            this.setState({ data: response.data})

    }).catch(err => console.log("Axios err: ", err))
    }

    searchFilter = name => event => {
        let text = event.target.value;
        if (text !== undefined && this.state.searchResult !== undefined) {
            this.setState({ [name]: text });
            this.setState({ searchResult: text });
        } else{
            text = this.state.searchResult;
        }

        if(text.trim().length === 0) {
            this.setState({ response: this.state.data})
        } else{
            const data = this.state.data.filter(function(item){
                return item.character.toLowerCase().indexOf(text.toLowerCase()) !== -1;
            });
            console.log(data.length);
            this.setState({ response: data})
        }
    };
    componentWillMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const { classes } = this.props;
        const character = this.state.response.map((item) =>
         <Card className={classes.card} key= { item.id }>
            <CardMedia className={classes.media}
                      image={`./resources/${item.img}`}
                      title={item.character} />
            <CardContent>
                <Typography variant="h6" component="h6" className={classes.h6}>
                    {item.character}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActionBtn}>
                <Link size="medium" to={`/character/${item.character}-${item.id}`} className={classes.button}> CHARACTER DETAILS </Link>
            </CardActions>

        </Card>
         );
        return (
         <div className = { classes.root }>
            <TextField id="outlinedSearch" label="Search Star-Wars Characters" type="search" className={classes.outlinedSearch}
                                  margin="normal"
                                  variant="outlined" onChange={this.searchFilter('searchResult')} value={this.state.searchResult}/>
            {character}
         </div>
         )
    }
}

CharacterList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CharacterList);