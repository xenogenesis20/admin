import React, { useState } from 'react';
import {
    DialogTitle,
    Dialog,
    Button,
    DialogActions,
    DialogContent,
    Grid,
    TextField
} from "@material-ui/core";
import { Formik } from "formik";
import { AsyncAutocomplete } from './Autocomplete';
import bc from '../services/breathecode';

const CustomDialog = (props) => {
    const [category, setCategory] = useState([])
    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <Formik
                initialValues={props.formInitialValues}
                onSubmit={(values) => {
                    props.onSubmit(values)
                    props.onClose()
                }}
                enableReinitialize={true}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    setSubmitting,
                    setFieldValue,
                }) => (
                    <form className="p-4" onSubmit={handleSubmit}>
                        <DialogTitle id="alert-dialog-title">
                            {props.title}
                        </DialogTitle>
                        <DialogContent>

                            <Grid container spacing={3} alignItems="center">
                                <Grid item md={2} sm={4} xs={12}>
                                    File name
                                    </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <TextField
                                        className="m-1"
                                        label="Name"
                                        name="name"
                                        size="medium"
                                        required
                                        variant="outlined"
                                        value={values.name}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item md={2} sm={4} xs={12}>
                                    Slug
                                    </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <TextField
                                        className="m-1"
                                        label="Slug"
                                        name="slug"
                                        size=""
                                        required
                                        variant="outlined"
                                        value={values.slug}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item md={2} sm={4} xs={12}>
                                    Categories
                                    </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <AsyncAutocomplete
                                        onChange={(category) => { setCategory(category); setFieldValue('categories', category.map(c => c.id)) }}
                                        className="m-1"
                                        width={"100%"}
                                        label="Categories"
                                        value={category}
                                        multiple
                                        asyncSearch={() => bc.media().getAllCategories()}
                                        getOptionLabel={option => `${option.name}`}
                                    />
                                </Grid>
                            </Grid>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={props.onClose} color="primary">
                                Cancel
                    </Button>
                            <Button color="primary" type="submit" autoFocus>
                                Save
                    </Button>
                        </DialogActions>
                    </form>
                )}
            </Formik>
        </Dialog>
    );
}

export default CustomDialog;