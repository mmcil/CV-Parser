import React, {useState} from 'react';

import {Grid, TextField,} from '@material-ui/core';
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
    const [responseData, setResponseData] = useState([]);
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

    const searchButton = async () => {

        const userData = {
            name: formState.name,
            email: formState.email,
            mobile_number: formState.mobile_number,
            skills: formState.skills,
            college_name: formState.college_name,
            degree: formState.degree,
            experience: formState.experience,
            company_names: formState.company_names,
            total_experience: formState.total_experience
        };

        console.log(JSON.stringify(userData))

        let axiosConfig = {
            headers: {
                "Content-type": "application/json"
            }
        };

        await axios.post("http://localhost:5000/search", userData, axiosConfig)
            .then(res => {
                setResponseData(res.data);
                console.log(responseData);
            });
    }

    const hasError = (field) =>
        !!(formValidate.touched[field] && formValidate.errors[field]);

    return (
        <div>
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
                            onChange={handleFieldChange('degree')}
                            value={formState.degree}
                            variant={'outlined'}
                            error={hasError('degree')}
                        />
                    </Grid>

                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            label={'Companies'}
                            onChange={handleFieldChange('company_names')}
                            value={formState.company_names}
                            variant={'outlined'}
                            error={hasError('company_names')}
                        />
                    </Grid>

                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            label={'Experience'}
                            onChange={handleFieldChange('experience')}
                            value={formState.experience}
                            variant={'outlined'}
                            error={hasError('experience')}
                        />
                    </Grid>

                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            label={'Total Experience'}
                            onChange={handleFieldChange('total_experience')}
                            value={formState.total_experience}
                            variant={'outlined'}
                            error={hasError('total_experience')}
                        />
                    </Grid>

                    <Grid item md={12} xs={12}>
                        <TextField
                            fullWidth
                            label={'Skills'}
                            onChange={handleFieldChange('skills')}
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

            <br/>
            <br/>

            <div>
                <table size="sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile Number</th>
                        <th>Skills</th>
                        <th>College Name</th>
                        <th>Degree</th>
                        <th>Experience</th>
                        <th>Total Experience</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        responseData.map((v, i, a) => {
                            return (
                                <tr key={v._id}>
                                    <td></td>
                                    <td>{v.name}</td>
                                    <td>{v.email}</td>
                                    <td>{v.mobile_number}</td>
                                    <td>{v.skills.join(", ")}</td>
                                    <td>{v.college_name}</td>
                                    <td>{v.degree}</td>
                                    <td>{v.experience}</td>
                                    <td>{v.total_experience}</td>
                                </tr>);
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default Search;