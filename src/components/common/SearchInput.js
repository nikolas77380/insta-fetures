import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import deburr from 'lodash/deburr';

import useForm from "../useForm";

const suggestions = [
    { label: 'marissabel69' },
    { label: 'nikolay.kipniak' },
];

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginRight: theme.spacing(1),
        width: '100%',
    },
    formWrapper: {
        width: '100%',
        height: '200px',
    },
    root: {
        flexGrow: 1,
        height: 250,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    chip: {
        margin: theme.spacing(0.5, 0.25),
    },
    inputRoot: {
        flexWrap: 'wrap',
    },
    inputInput: {
        width: 'auto',
        flexGrow: 1,
    },
    divider: {
        height: theme.spacing(2),
    },
}));

function DownshiftMultiple(props) {
    const { classes } = props;
    const [inputValue, setInputValue] = React.useState('');
    const [selectedItem, setSelectedItem] = React.useState([]);

    function handleKeyDown(event) {
        if (selectedItem.length && !inputValue.length && event.key === 'Backspace') {
            setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
        }
    }

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }

    return (
        <Downshift
            id="downshift-multiple"
            inputValue={inputValue}
            onChange={props.handleChange}
            selectedItem={props.value}
        >
            {({
                  getInputProps,
                  getItemProps,
                  getLabelProps,
                  isOpen,
                  inputValue: inputValue2,
                  selectedItem: selectedItem2,
                  highlightedIndex,
              }) => {
                const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
                    onKeyDown: handleKeyDown,
                    placeholder: 'Select multiple friends',
                });

                return (
                    <div className={classes.container}>
                        {renderInput({
                            fullWidth: true,
                            classes,
                            label: 'Tag Friends',
                            InputLabelProps: getLabelProps(),
                            InputProps: {
                                startAdornment: props.value.map(item => (
                                    <Chip
                                        key={item}
                                        tabIndex={-1}
                                        label={item}
                                        className={classes.chip}
                                        onDelete={() => props.handleChange(item)}
                                    />
                                )),
                                onBlur,
                                onChange: event => {
                                    handleInputChange(event);
                                    onChange(event);
                                },
                                onFocus,
                            },
                            inputProps,
                        })}

                        {isOpen ? (
                            <Paper className={classes.paper} square>
                                {getSuggestions(inputValue2).map((suggestion, index) =>
                                    renderSuggestion({
                                        suggestion,
                                        index,
                                        itemProps: getItemProps({ item: suggestion.label }),
                                        highlightedIndex,
                                        selectedItem: selectedItem2,
                                    }),
                                )}
                            </Paper>
                        ) : null}
                    </div>
                );
            }}
        </Downshift>
    );
}

DownshiftMultiple.propTypes = {
    classes: PropTypes.object.isRequired,
};

function renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
        <TextField
            InputProps={{
                inputRef: ref,
                classes: {
                    root: classes.inputRoot,
                    input: classes.inputInput,
                },
                ...InputProps,
            }}
            {...other}
        />
    );
}

renderInput.propTypes = {
    /**
     * Override or extend the styles applied to the component.
     */
    classes: PropTypes.object.isRequired,
    InputProps: PropTypes.object,
};

function renderSuggestion(suggestionProps) {
    const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps;
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

    return (
        <MenuItem
            {...itemProps}
            key={suggestion.label}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}
        >
            {suggestion.label}
        </MenuItem>
    );
}

renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.number]).isRequired,
    index: PropTypes.number.isRequired,
    itemProps: PropTypes.object.isRequired,
    selectedItem: PropTypes.string.isRequired,
    suggestion: PropTypes.shape({
        label: PropTypes.string.isRequired,
    }).isRequired,
};

function getSuggestions(value, { showEmpty = false } = {}) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0 && !showEmpty
        ? []
        : suggestions.filter(suggestion => {
            const keep =
                count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

export default DownshiftMultiple;
