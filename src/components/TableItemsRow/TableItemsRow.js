import './TableItemsRow.css'

const TableItemsRow = props => {

    const _editRowItem = () => {
        console.log('TableRow _editRowItem fired')
        props.onEditItem(props.entry);
    }
    const _deleteRowItem = () => {
        console.log('TableRow _deleteRowItem fired')
        if (window.confirm('Are you sure you want to delete this Category?')) props.onDeleteItem(props.entry);
    }

    return(<tr>
                <td>{ props.entry.item_id }</td>
                <td>{ props.entry.title }</td>
                <td>{ props.entry.description}</td>
                <td>{ props.entry.price }</td>
                <td>{ props.entry.quantity }</td>
                <td>{ props.entry.sku }</td>
                <td>{ props.entry.category_id }</td>
                
                <td><button onClick={ _editRowItem }>Edit</button></td>
                <td><button onClick={ _deleteRowItem }>DELETE</button></td>
            </tr>);
}
export default TableItemsRow;