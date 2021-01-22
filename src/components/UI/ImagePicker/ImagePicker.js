import React from 'react';
import classes from './ImagePicker.css';
const imagePicker = (props) => {

    return (
        <div className={classes.Imagecontainer}>
            <div className={classes.Thumbnail}>
                {props.previewImage ? <img src={props.previewImage} alt="itemImage" /> : null}
            </div>
            <label className={classes.Label} htmlFor={props.id} >Pick Image</label>
            <input id={props.id} type="file" onChange={props.changed} />
        </div>
    );
};

export default imagePicker;