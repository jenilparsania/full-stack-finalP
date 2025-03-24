import { useEffect, useState } from 'react';
import './AddCategoryForm.css'
import Button from '../Buttons/Button';


const AddCategoryForm = (props) => {
    const [value , setValue] = useState("");
    const [category , setCategory] = useState({});

    const _detechValueChange = (key ,value) => {
        setValue(value);
    }

    const _add = () => {
        props.onAddCategory(category);
        _clear();
    }
    const _clear = () => {
        setValue('');
    }

    useEffect(()=> {
        setCategory({'category_name': value});
        
    },[value]);

    return(
        <div className="Form">
            <label> Category Name : </label>
            {/* <input type='text' placeholder='Category' value={categoryName} onChange={e=>_detechValueChange('category_name',e.target.value)}/>  */}
            <input type='text' placeholder='Category' value={value} onChange={(e)=> setValue(e.target.value)}/> 
            <br/>
            <Button title="Add Category" onClick={_add} />

        </div>
    );
}

export default AddCategoryForm;