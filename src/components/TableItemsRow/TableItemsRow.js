import './TableItemsRow.css'

const TableItemsRow = props => {

    const _editRowCategory = () => {
        console.log('TableRow _editRowItem fired')
        props.onEditCategory(props.entry);
    }
    const _deleteRowCategory = () => {
        console.log('TableRow _deleteRowItem fired')
        if (window.confirm('Are you sure you want to delete this Category?')) props.onDeleteCategory(props.entry);
    }

    return(<tr>
                <td>{ props.entry.item_id }</td>
                <td>{ props.entry.title }</td>
                <td>{ props.entry.description}</td>
                <td>{ props.entry.price }</td>
                <td>{ props.entry.quantity }</td>
                <td>{ props.entry.sku }</td>
                <td>{ props.entry.category_id }</td>
                
                <td><button onClick={ _editRowCategory }>Edit</button></td>
                <td><button onClick={ _deleteRowCategory }>DELETE</button></td>
            </tr>);
}
export default TableItemsRow;