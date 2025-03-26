import './EditItemForm.css'
import Button from '../Buttons/Button';
import { useEffect, useState } from 'react';


const EditItemForm = props => {
    const [id, setID ] = useState("");
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");
    const [quantity,setQuantity] = useState("");
    const [sku,setSKU] = useState("");
    const [category_id,setCategoryID] = useState("");
    
    const [item,setItem] = useState({});

    const _update = () => {
        props.onUpdateItem(item);
        _clear();
    }

    const _clear = () => {
        setID('');
        setTitle('');
        setDescription('');
        setPrice('');
        setQuantity('');
        setSKU('');
        setCategoryID('');
    }

    useEffect(()=>{
        setItem({ 'item_id': id,'title':title, 'desc':description,'price':price,'quantity':quantity,'sku':sku,'category_id':category_id});

    },[ id , title,description,price,quantity,sku,category_id]);

    useEffect(()=>{
        setID(props.item.item_id);
        setTitle(props.item.title);
        setDescription(props.item.description);
        setPrice(props.item.price);
        setQuantity(props.item.quantity);
        setSKU(props.item.sku);
        setCategoryID(props.item.category_id);
    },[ props])

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
            Category ID : 
            <input type='text' placeholder='Category ID ' value={category_id} onChange={(e)=> setCategoryID(e.target.value)} />
            <br/>
            <Button title="Update Item" onClick={_update} />

        </div>
    )
}

export default EditItemForm;