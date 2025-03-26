import logo from './logo.svg';
import './App.css';
import { useState , useEffect } from 'react';
import axios from 'axios';

import AddCategoryForm from './components/AddCategoryForm/AddCategoryForm';
import Table from './components/Table/Table';
import EditCategoryForm from './components/EditCategoryForm/EditCategoryForm';
import TableRow from './components/TableRow/TableRow';
import TableItems from './components/TableItems/TableItems';
import AddItemForm from './components/AddItemForm/AddItemForm';


function App() {
    const [category, setCategory] = useState([]);
    const [editing, setEditing] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [item, setItem] = useState([]);
    const [selectedItem,setSelectedItem] = useState({});
    const [editingItem,setEditingItem] = useState(false);
    

    // category Category
    //_addItem to pass into AddForm
    const _addCategory = category => {
        console.log('_addCategory fired');
        console.log(category);
        //send item to server via axios
        //receive new list of items for our Table component 

        const url = "http://127.0.0.1:3001/categories";
        axios.post(url,{ 
          category : category
        }).then( res => {
            //console.log(res.data.entries);
            //need to track the return items in a state variable
            setCategory(res.data.category);
            // setCategory(res.data.entries); would be an error sir 

            console.log(category);
            console.log("Response : ",res.data);
        }).catch( err => {
            
            console.log("err is : "+ err);
        });
    }

    //_editItem to pass into TABLE to load the selectedItem to be passed into Edit component
    const _editCategory = category => {
        console.log('_editcategory fired');
        //console.log(item);
        setSelectedCategory(category);
        setEditing(true);
    }

    //_updateItem passes into EditForm to track and update the updated data
    const _updateCategory = category => {
        console.log('_updatecategory fired');
        console.log(category);
        //send item to server via axios
        //receive new list of items for our Table component 

        const url = `http://127.0.0.1:3001/category/${category.category_id}`;
        axios.patch(url,{ 
          category : category
        }).then( res => {
            //console.log(res.data.entries);
            //need to track the return items in a state variable
            setCategory(res.data.category);
            //console.log(items);
            setSelectedCategory({});
            setEditing(false);
        }).catch( err => {
            console.log(err);
        });
    }

    const _deleteCategory = category => {
        console.log('_deletetem fired');
        console.log(category);
        //send item to server via axios
        //receive new list of items for our Table component 

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
            //console.log(res.data.entries);
            //need to track the return items in a state variable
            setItem(res.data.item);
            // setCategory(res.data.entries); would be an error sir 

            console.log(item);
            console.log("Response : ",res.data);
        }).catch( err => {
            
            console.log("err is : "+ err);
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

    useEffect( () => {
        console.log("after updating the category " + category);
    }, [category]);
    useEffect( () => {
        console.log("after updating the item " + item);
    }, [item]);

  return (
    <div className="App">
        {editing ? 
            (
                <EditCategoryForm onUpdateCategory={_updateCategory} category={selectedCategory}/>
            ): (
                <AddCategoryForm onAddCategory = {_addCategory} />

            )
        }


      <Table entries={category} onEditCategory={_editCategory} onDeleteCategory={_deleteCategory}/>
      <AddItemForm onAddItem = {_addItem} />
      <TableItems  entries={item} onEditCategory={_editCategory} onDeleteCategory={_deleteCategory} />
    </div>
  );
}

export default App;
