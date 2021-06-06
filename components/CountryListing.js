import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import CountryComponent from './CountryComponent'
function CountryListing() {
    const [api, setApi] = useState("https://restcountries.eu/rest/v2/all")
    const [countries, setCountries] = useState([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const fetchCountries = async (api) => {
            const response = await axios
                .get(api)
                .catch((err) => {
                    console.log("Err: ", err);
                });
            console.log(response)
            if (response !== undefined) {
                setCountries(response.data);
            }
        };
        if (inputValue === null || inputValue === "") {
            setApi("https://restcountries.eu/rest/v2/all")
        } else {
            setApi(`https://restcountries.eu/rest/v2/name/${inputValue}`)
        }
        fetchCountries(api);
    }, [api, inputValue]);

    console.log("Countries :", countries);
    return (
        <div>
            <Grid
                style={{ backgroundColor: "#f5f5f5" }}
                container
                direction="column"
                alignItems="center"
                justify="center"
            >
                <TextField
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    label="Country"
                    placeholder="Enter country name"
                    className="inputWidth"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <CountryComponent countries={countries} />
        </div>
    )
}

export default CountryListing