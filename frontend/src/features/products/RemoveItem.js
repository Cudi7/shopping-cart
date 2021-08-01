import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeQuantity } from './productsSlice';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function RemoveItem({ qty, id }) {
  const classes = useStyles();
  const [selectedQty, setSelectedQty] = useState(0);
  const [quantityValues, setQuantityValues] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let currentQty = [];
    for (let i = 1; i <= qty; i++) {
      currentQty.push(i);
    }
    setQuantityValues(currentQty);
  }, [qty]);

  const handleChange = (event) => setSelectedQty(event.target.value);

  const handleDelete = () => {
    console.log(selectedQty);
    if (selectedQty <= 0) return;
    dispatch(removeQuantity(id, selectedQty));
  };

  return (
    <>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel>Quantity</InputLabel>
          <Select value={selectedQty} onChange={handleChange}>
            {quantityValues &&
              quantityValues.map((qty) => (
                <MenuItem value={qty} key={id}>
                  {qty}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
      <DeleteIcon onClick={handleDelete} />
    </>
  );
}
