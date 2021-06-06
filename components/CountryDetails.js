import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import MapIcon from '@material-ui/icons/Map';
import Button from '@material-ui/core/Button';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
    containerHeight: {
        minHeight: '100vh',
        backgroundColor: '#f5f5f5'
    },
    leftCard: {
        height: '100%',
        textAlign: 'center'
    },
    rightCard: {
        height: '100%'
    },
    countryDetailContainer: {
        marginTop: '5vh'
    },
    image: {
        width: '90%',
        borderRadius: '5px',
        border: '1px solid #2940d3',
    },
    mapButton: {
        marginTop: '3vh'
    },
    heading: {
        borderBottom: '2px solid #2940d3',
        paddingBottom: '5px'
    },
    information: {
        fontWeight: '400',
        marginTop: '2px',
        marginButtons: '2px'
    },
    informationLabel: {
        fontWeight: '600'
    },
    neighourButton: {
        marginLeft: '5px',
        marginTop: '3px'
    },
}));
function CountryDetails() {
    const classes = useStyles();
    const router = useRouter()

    const cId = router.query.cId;
    let [country, setCountry] = useState([])
    const { name, nativeName, alpha3Code, capital, population, region, subregion, latlng, area, borders, currencies, flag, demonym, altSpellings } = country;

    useEffect(() => {
        const fetchCountryDetail = async (cId) => {
            const response = await axios
                .get(`https://restcountries.eu/rest/v2/alpha/${cId}`)
                .catch((err) => {
                    console.log("Err: ", err);
                });
            setCountry(response.data);
        };
        if (cId && cId !== "") fetchCountryDetail(cId);

    }, [cId]);
    console.log(country)
    return (
        <Container maxWidth="lg" className={classes.countryDetailContainer}>
            {Object.keys(country).length === 0 ? (
                <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography variant="h3">Loading...</Typography></Grid>
            ) : (
                <Grid style={{ marginTop: '5vh' }} container sm spacing={2}>
                    <Grid item xs={12}>
                        <Button startIcon={<KeyboardBackspaceIcon />} onClick={(e) => { window.history.back(); }} variant="outlined" color="primary">
                            Go back
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.leftCard}>
                        <img src={flag} alt={name} className={classes.image} />
                        <Button
                            href={`https://www.google.com/maps/search/?api=1&query=${name}`}
                            variant="contained"
                            color="primary"
                            target="_blank"
                            className={classes.mapButton}
                            endIcon={<MapIcon />}
                        >
                            Open Map
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.rightCard}>
                        <Typography variant="h4" className={classes.heading}>{name} ({nativeName})</Typography>
                        <Typography variant="h6" className={classes.information}><span className={classes.informationLabel}>Capital: </span>{capital}</Typography>
                        <Typography variant="h6" className={classes.information}><span className={classes.informationLabel}>Country Code: </span>{alpha3Code}</Typography>
                        <Typography variant="h6" className={classes.information}><span className={classes.informationLabel}>Demonym: </span>{demonym}</Typography>
                        <Typography variant="h6" className={classes.information}><span className={classes.informationLabel}>Alt Spellings: </span>

                            {altSpellings && altSpellings.map((value) => {
                                return (
                                    <span key={value}>
                                        {value + ", "}
                                    </span>
                                )
                            })}

                        </Typography>
                        <Typography variant="h6" className={classes.information}><span className={classes.informationLabel}>Region: </span>{region}</Typography>
                        <Typography variant="h6" className={classes.information}><span className={classes.informationLabel}>Subregion: </span>{subregion}</Typography>
                        <Typography variant="h6" className={classes.information}><span className={classes.informationLabel}>Latitude: </span>
                            {latlng && latlng.map((value, index) => {
                                return (
                                    <span key={value}>
                                        {index === 0 && value}
                                    </span>
                                )
                            })}
                        </Typography>
                        <Typography variant="h6" className={classes.information}><span className={classes.informationLabel}>Longitude: </span>
                            {latlng && latlng.map((value, index) => {
                                return (
                                    <span key={value}>
                                        {index === 1 && value}
                                    </span>
                                )
                            })}
                        </Typography>
                        <Typography variant="h6" className={classes.information}><span className={classes.informationLabel}>Population: </span>{population}</Typography>
                        <Typography variant="h6" className={classes.information}><span className={classes.informationLabel}>Area: </span>{area} km<sup>2</sup></Typography>
                        <Typography variant="h6" className={classes.information}><span className={classes.informationLabel}>Currency: </span>
                            {currencies && currencies.map((value) => {
                                return (
                                    <span key={value}>
                                        {value.name} ({value.code}) -- ({value.symbol})
                                    </span>
                                )
                            })}
                        </Typography>
                        <Typography variant="h6" className={classes.information}><span className={classes.informationLabel}>Neighbours: </span>
                            {borders && borders.map((value) => {
                                return (

                                    <Button key={value} className={classes.neighourButton} href={`/country/${value}`} variant="outlined" color="primary">
                                        {value}
                                    </Button>
                                )
                            })}
                        </Typography>
                    </Grid>
                </Grid >
            )}
        </Container>
    )
}

export default CountryDetails