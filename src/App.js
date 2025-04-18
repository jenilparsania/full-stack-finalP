import logo from './logo.svg';
import './App.css';
import { useState , useEffect } from 'react';
import axios from 'axios';

import AddCategoryForm from './components/AddCategoryForm/AddCategoryForm';
import Table from './components/Table/Table';
import EditCategoryForm from './components/EditCategoryForm/EditCategoryForm';
import TableItems from './components/TableItems/TableItems';
import AddItemForm from './components/AddItemForm/AddItemForm';
import EditItemForm from './components/EditItemForm/EditItemForm';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Banner from './assets/photo_2.jpg'


function App() {
    const [category, setCategory] = useState([]);
    const [editing, setEditing] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [item, setItem] = useState([]);
    const [selectedItem,setSelectedItem] = useState({});
    const [editingItem,setEditingItem] = useState(false);
    const [store, setStore] = useState([]);

    
    

    
    const _addCategory = category => {
        console.log('_addCategory fired');
        console.log(category);
        

        const url = "http://127.0.0.1:3001/categories";
        axios.post(url,{ 
          category : category
        }).then( res => {
            setCategory(res.data.category);

            console.log(category);
            console.log("Response : ",res.data);
        }).catch( err => {
            
            console.log("err is : "+ err);
        });
    }

    //_editItem to pass into TABLE to load the selectedItem to be passed into Edit component
    const _editCategory = category => {
        console.log('_editcategory fired');
        setSelectedCategory(category);
        setEditing(true);
    }

    //_updateItem passes into EditForm to track and update the updated data
    const _updateCategory = category => {
        console.log('_updatecategory fired');
        console.log(category);
         

        const url = `http://127.0.0.1:3001/category/${category.category_id}`;
        axios.patch(url,{ 
          category : category
        }).then( res => {
            
            setCategory(res.data.category);
            setSelectedCategory({});
            setEditing(false);
        }).catch( err => {
            console.log(err);
        });
    }

    const _deleteCategory = category => {
        console.log('_deletetem fired');
        console.log(category);
        

        const url = `http://127.0.0.1:3001/category/${category.category_id}`;
        axios.delete(url,{ 
          category : category
        }).then( res => {
            setCategory(res.data.category);
        }).catch( err => {
            console.log(err);
        });
    }


    const _addItem = item => {
        console.log('_addItem fired');
        console.log(item);
        

        const url = "http://127.0.0.1:3001/items";
        axios.post(url,{ 
          item : item
        }).then( res => {
            
            setItem(res.data.item);
    
        }).catch( err => {
            
            console.log("err is : "+ err);
        });
    }

    const _deleteItem = item => {
        console.log('_deleteItem fired');
        console.log(item);
        

        const url = `http://127.0.0.1:3001/item/${item.item_id}`;
        axios.delete(url,{ 
          item : item
        }).then( res => {
            setItem(res.data.item);
        }).catch( err => {
            console.log(err);
        });
    }

    const _editItem = item => {
        console.log('_editItem fired');
        setSelectedItem(item);
        setEditingItem(true);
    }

    const _updateItem = item => {
        console.log('_updateItem fired');
        console.log(item);
       
        const url = `http://127.0.0.1:3001/item/${item.item_id}`;
        axios.patch(url,{ 
          item : item
        }).then( res => {
            
            setItem(res.data.item);
            setSelectedItem({});
            setEditingItem(false);
        }).catch( err => {
            console.log(err);
        });
    }
    

    //retrieve the list of all items on load
    useEffect( () => {

        let url = "http://127.0.0.1:3001/categories";
        axios.get(url).then( res => {
            console.log("fetching at the start" + category);
            setCategory(res.data.category);
        }).catch( err => {
            console.log(err);
        });

        url = "http://127.0.0.1:3001/items";
        axios.get(url).then( res => {
            console.log("fetching at the start" + item);
            setItem(res.data.item);
        }).catch( err => {
            console.log(err);
        });

        

    }, []);

    useEffect(()=>{
        const url = "http://127.0.0.1:3001/getitems";
        axios.get(url).then(res=>{
            console.log(" RESPONSE DATA " , res.data);
            
            setStore(res.data.item);
            console.log(res.data.item);
            
            
        }).catch(err=>{
            console.log(err);
            
        })
    },[item]);

    useEffect( () => {
        console.log("after updating the category " + category);
    }, [category]);

    useEffect( () => {
        console.log("after updating the item " + item);
    }, [item]);

    

    function ItemFn(){
        return(
            <div>
                {editingItem ?
                (
            
                <EditItemForm onUpdateItem = {_updateItem} item={selectedItem} />
                ) : (
                <AddItemForm onAddItem = {_addItem} />
                )
                }
                <TableItems  entries={item} onEditItem={_editItem} onDeleteItem={_deleteItem} />
            </div>
        )
    }

    function CategoryFn(){
        return(<div>
            {editing ? 
            (
                <EditCategoryForm onUpdateCategory={_updateCategory} category={selectedCategory}/>
            ): (
                <AddCategoryForm onAddCategory = {_addCategory} />

            )
            }

            <Table entries={category} onEditCategory={_editCategory} onDeleteCategory={_deleteCategory}/>

        </div>)
    }

    function StoreFront(){
        return(<div className='Table-Component'>
            <div className="banner">
                <img  className="banner-img" src={Banner} alt="https://www.istockphoto.com/photo/pasta-packaging-on-shel-at-store-gm1412238856-461752700?utm_campaign=srp_photos_bottom&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fbanner-images-superstore&utm_medium=affiliate&utm_source=unsplash&utm_term=banner+images+superstore%3A%3A%3A"/>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        store.map((item,index) => (  // fun fact : if we use {} instead of () here this would not work beacause the way react treats the map fn , I guess , would have to read about it more !
                            <tr key={index}>
                                <td> {item.title}</td>
                                <td> {item.category}</td>
                                <td> {item.description}</td>
                                <td> {item.price}</td>
                            </tr>
                        ))
                    }
                </tbody>
                
            </table>
        </div>)
    }

  return (
    <div className="App">

        <BrowserRouter>
            <div style={{marginBottom:'20px'}}>
                <Link to="/storefront">
                    <button>Storefront</button>
                </Link>
                <Link to="/item">
                    <button>Item</button>
                </Link>
                <Link to="/category">
                    <button>Category</button>
                </Link>
                
            </div>
            <Routes>
                <Route path='/storefront' element = {<StoreFront/>}/>
                <Route path='/item' element = {<ItemFn/>}/>
                <Route path='/category' element = {<CategoryFn/>}/>

            </Routes>
        
        </BrowserRouter>
        
    </div> 
  );
}

export default App;
