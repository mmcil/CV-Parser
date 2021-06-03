import validate from 'validate';
import PropTypes from 'prop-types';
import {cloneDeep, get, pickBy} from 'lodash';
import {FormattedMessage} from 'react-intl';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import {makeStyles} from '@material-ui/styles';
import RemoveIcon from '@material-ui/icons/Delete';
import React, {useContext, useEffect, useRef, useState} from 'react';

import {
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    colors,
    Divider,
    Fab,
    Grid,
    TextField,
    Typography,
} from '@material-ui/core';
import axios from "axios";

const initialValues = {
    id: '',
    name: '',
    email: '',
    mobile_number: '',
    college_name: '',
    degree: '',
    skills: '',
    company_names: '',
    experience: '',
    total_experience: '',
};

const initialFormValidate = {
    isValid: false,
    touched: {},
    errors: {},
};

const Search = () => {
    const [formState, setFormState] = useState(initialValues);
    const [formValidate, setFormValidate] = useState(initialFormValidate);

    const handleFieldChange = (name) => (e) => {
        e.persist();

        setFormState((state) => ({
            ...state,
            [name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
        }));

        setFormValidate((state) => ({
            ...state,
            touched: {
                ...state.touched,
                [name]: true,
            },
        }));
    };

    const searchButton = () => {

    }

    const hasError = (field) =>
        !!(formValidate.touched[field] && formValidate.errors[field]);

    const searchRequest = async () => {
        const userData = {
            skills: 'Docker',
        };

        let axiosConfig = {
            headers: {
                "Content-type": "application/json"
            }
        };

        await axios.post("http://localhost:5000/search", userData, axiosConfig)
            .then(res => {
                const responseData = res.data;
                console.log(responseData);
            });
    }

    return (
        <div>
            <Grid className={'right'} container spacing={2}>

                <Grid item md={6} xs={12}>
                    <TextField
                        fullWidth
                        label={'Name'}
                        onChange={handleFieldChange('name')}
                        value={formState.name}
                        variant={'outlined'}
                        error={hasError('name')}
                    />
                </Grid>

                <Grid item md={6} xs={12}>
                    <TextField
                        fullWidth
                        label={'E-mail'}
                        onChange={handleFieldChange('email')}
                        value={formState.email}
                        variant={'outlined'}
                        error={hasError('email')}
                    />
                </Grid>

                <Grid item md={6} xs={12}>
                    <TextField
                        fullWidth
                        label={'Mobile Number'}
                        onChange={handleFieldChange('mobile_number')}
                        value={formState.mobile_number}
                        variant={'outlined'}
                        error={hasError('mobile_number')}
                    />
                </Grid>

                <Grid item md={6} xs={12}>
                    <TextField
                        fullWidth
                        label={'College'}
                        onChange={handleFieldChange('college_name')}
                        value={formState.college_name}
                        variant={'outlined'}
                        error={hasError('college_name')}
                    />
                </Grid>

                <Grid item md={6} xs={12}>
                    <TextField
                        fullWidth
                        label={'Degree'}
                        value={formState.degree}
                        variant={'outlined'}
                        error={hasError('degree')}
                    />
                </Grid>

                <Grid item md={6} xs={12}>
                    <TextField
                        fullWidth
                        label={'Companies'}
                        value={formState.company_names}
                        variant={'outlined'}
                        error={hasError('company_names')}
                    />
                </Grid>

                <Grid item md={6} xs={12}>
                    <TextField
                        fullWidth
                        label={'Experience'}
                        value={formState.experience}
                        variant={'outlined'}
                        error={hasError('experience')}
                    />
                </Grid>

                <Grid item md={6} xs={12}>
                    <TextField
                        fullWidth
                        label={'Total Experience'}
                        value={formState.total_experience}
                        variant={'outlined'}
                        error={hasError('total_experience')}
                    />
                </Grid>

                <Grid item md={12} xs={12}>
                    <TextField
                        fullWidth
                        label={'Skills'}
                        value={formState.skills}
                        variant={'outlined'}
                        error={hasError('skills')}
                    />
                </Grid>

                <Grid item md={4} xs={12}>
                    <button onClick={searchButton}>
                        Search
                    </button>
                </Grid>

            </Grid>

        </div>
    );
}

export default Search;