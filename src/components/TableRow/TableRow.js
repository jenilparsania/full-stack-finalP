import './TableRow.css';

const TableRow = props => {

    const _editRowCategory = () => {
        console.log('TableRow _editRowItem fired')
        props.onEditCategory(props.entry);
    }
    const _deleteRowCategory = () => {
        console.log('TableRow _deleteRowItem fired')
        if (window.confirm('Are you sure you want to delete this Category?')) props.onDeleteCategory(props.entry);
    }

    return(<tr>
                <td>{ props.entry.id }</td>
                <td>{ props.entry.category_name }</td>
                
                <td><button onClick={ _editRowCategory }>Edit</button></td>
                <td><button onClick={ _deleteRowCategory }>DELETE</button></td>
            </tr>);
}
export default TableRow;