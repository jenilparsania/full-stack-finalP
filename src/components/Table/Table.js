import TableRow from '../TableRow/TableRow';
import './Table.css';

const Table = props => {

    const _editCategory = category => {
        console.log('Table _editItem fired');
        props.onEditCategory(category);
    }

    const _deleteCategory = category => {
        console.log('Table _deleteItem fired');
        props.onDeletecategory(category);
    }

    return(
        <div className='Table-Component'>
            <table style={ {marginTop: '20px', width: '80%', marginLeft: 'auto', marginRight:'auto'} }>
                <thead>
                    <tr><th>id</th><th>Category Name</th></tr>
                </thead>
                <tbody>
                { props.entries.map(
                    (entry, i) => { return( <TableRow key={i} index={i} entry={entry} onEditCategory = { _editCategory } onDeleteCategory = { _deleteCategory } /> ) }
                    ) 
                } 
                </tbody>
            </table>
        </div>
    );

}

export default Table;