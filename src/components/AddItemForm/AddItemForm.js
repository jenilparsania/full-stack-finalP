import Button from '../Buttons/Button';
import './AddItemForm.css'
import { useEffect, useState } from 'react';
import axios from 'axios';


const AddItemForm = props => {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");
    const [quantity,setQuantity] = useState("");
    const [sku,setSKU] = useState("");
    const [category_id,setCategoryID] = useState("");
    const [categories , setCategories] = useState([]);
    const [item,setItem] = useState({});

    const _add = () => {
        props.onAddItem(item);
        _clear();
    }

    const _clear = () => {
        setTitle('');
        setDescription('');
        setPrice('');
        setQuantity('');
        setSKU('');
        setCategoryID('');
    }

    useEffect(()=>{
        setItem({'title':title, 'desc':description,'price':price,'quantity':quantity,'sku':sku,'category_id':category_id});

    },[title,description,price,quantity,sku,category_id])

    useEffect(()=>{
        const url = "http://127.0.0.1:3001/categories"
        axios.get(url).then(res=>{
            console.log();
            setCategories(res.data.category);
        }).catch(err=>{
            console.log(err);
        })

        
    })

    return(
        <div className='Form'>
            Item Title : 
            <input type='text' placeholder='Title' value={title} onChange={(e)=> setTitle(e.target.value)} />
            <br/>
            Description : 
            <input type='text' placeholder='Description' value={description} onChange={(e)=> setDescription(e.target.value)} />
            <br/>
            Price : 
            <input type='text' placeholder='Price' value={price} onChange={(e)=> setPrice(e.target.value)} />
            <br/>
            Quantity : 
            <input type='text' placeholder='Quantity' value={quantity} onChange={(e)=> setQuantity(e.target.value)} />
            <br/>
            SKU : 
            <input type='text' placeholder='SKU' value={sku} onChange={(e)=> setSKU(e.target.value)} />
            <br/>
            Category  : 

            <select value={category_id} onChange={(e)=>setCategoryID(e.target.value)}>
                <option value="">Select Category </option>
                {categories.map((c)=>(
                    <option key={c.category_id} value={c.category_id}>
                        {c.category_name}
                    </option>
                ))}
            </select>
            <br/>
            <Button title="Add Item" onClick={_add} />

        </div>
    )
}

export default AddItemForm;
