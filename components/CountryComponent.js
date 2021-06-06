import React from 'react'
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({
    imagecard: {
        width: 300,
        overflowX: "hidden",
    },
    imageHeight: {
        height: 180
    },
    loading: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

}));
function CountryComponent({ countries }) {
    const classes = useStyles();

    const renderList = countries.map((country) => {
        const { flag, alpha3Code, name, capital } = country;
        return (
            <Grid item key={alpha3Code}>
                <Paper>
                    <Card className={classes.imagecard}>
                        <CardActionArea href={`/country/${alpha3Code}`}>
                            <CardMedia
                                className={classes.imageHeight}
                                component="img"
                                alt={name}
                                image={flag}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {name}
                                </Typography>
                                <Typography variant="p" component="p">
                                    Capital: {capital}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Paper>
            </Grid>
        );
    });
    return (
        <Grid style={{ backgroundColor: '#f5f5f5', paddingTop: '2vh', minHeight: '100vh' }} container lg spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    {Object.keys(countries).length === 0 ? (
                        <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography variant="h3">Loading...</Typography></Grid>
                    ) : (renderList)}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CountryComponent