import TableItemsRow from '../TableItemsRow/TableItemsRow';
import './TableItems.css'


const TableItems = props => {

    const _editItem = category => {
        console.log('Table _editItem fired');
        props.onEditItem(category);
    }

    const _deleteItem = category => {
        console.log('Table _deleteItem fired');
        props.onDeleteItem(category);
    }

    return(
        <div className='Table-Component'>
            <table style={ {marginTop: '20px', width: '80%', marginLeft: 'auto', marginRight:'auto'} }>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>SKU</th>
                        <th>Category_ID</th>
                    </tr>
                </thead>
                <tbody>
                { props.entries.map(
                    (entry, i) => { return( <TableItemsRow key={i} index={i} entry={entry} onEditItem = { _editItem } onDeleteItem = { _deleteItem } /> ) }
                    ) 
                } 
                </tbody>
            </table>
        </div>
    );

}

export default TableItems;