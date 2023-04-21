import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './BaseCurrencySelect.css';
import * as CurrencyUtils from "../util/CurrencyUtils";

export default function BaseCurrencySelect(props) {

    const [baseCurrency, setBaseCurrency] = React.useState(props.baseCurrency);

    const handleChange = (event) => {
        console.log("handleChange() : " + event.target.value);
        let selectedCurrency = CurrencyUtils.getCurrencyFromId(event.target.value)
        setBaseCurrency(selectedCurrency);
        props.stateChanger(selectedCurrency);
    };

    return (
        <Box className="MuiSelect-box" sx={{minWidth: 50}}>
            <FormControl fullWidth>
                <Select
                    className="MuiSelect-select"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={baseCurrency.id}
                    onChange={handleChange}
                >
                    <MenuItem value={CurrencyUtils.currencies.EUR.id}>EUR</MenuItem>
                    <MenuItem value={CurrencyUtils.currencies.USD.id}>USD</MenuItem>
                    <MenuItem value={CurrencyUtils.currencies.BTC.id}>BTC</MenuItem>
                    <MenuItem value={CurrencyUtils.currencies.ETH.id}>ETH</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}