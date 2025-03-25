import './EditCategoryForm.css'

import { useEffect, useState } from 'react';
import Button from '../Buttons/Button';


const EditCategoryForm = (props) => {
    const [id , setID] = useState("");
    const [value , setValue] = useState("");
    const [category , setCategory] = useState({});

    const _detechValueChange = (key ,value) => {
        setValue(value);
    }

    const _update = () => {
        console.log("_update is fired");
        
        props.onUpdateCategory(category);
        _clear();
    }
    const _clear = () => {
        setID('');
        setValue('');
    }


    useEffect(()=> {
        setCategory({'category_id': id , 'category_name':value});
        console.log("category updated" + category);
        console.log(category);
        
    },[id,value]);

    useEffect(()=> {
        setID(props.category.category_id);
        setValue(props.category.category_name);

        //setCategory({'category_name': value});
        
    },[props]);

    return(
        <div className="Form">
            <label> Category Name : </label>
            {/* <input type='text' placeholder='Category' value={categoryName} onChange={e=>_detechValueChange('category_name',e.target.value)}/>  */}
            <input type='text' placeholder='Category' value={value} onChange={(e)=> setValue(e.target.value)}/> 
            <br/>
            <Button title="Update Category" onClick={_update} />

        </div>
    );
}

export default EditCategoryForm;