import React, { useState } from 'react'
import './App.css';

function TotalBill() {
    const [tableArray, setTableArray] = useState([]);
    const [amount, setAmount] = useState(0);

    const toggleCheckboxChange = async (e, index) => {
        const tempArray = [...tableArray];
        tempArray[index].checker = !tempArray[index].checker;
        await setTableArray(tempArray);
        let amount = 0;
        for (let i = 0; i < tableArray.length; i++) {
            if (tableArray[i].checker)
                amount += tableArray[i].itemPrice;
        }
        setAmount(amount);
    }

    return (
        <div>
            <h1>E-Bill</h1>
            <AddItems getArray={array => setTableArray(array)} />
            <table>
                <thead>
                    <tr>
                        <th>ItemName</th>
                        <th>Price</th>
                        <th>Select the Items</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tableArray.map((val, index) => (
                            <tr key={index + 1}>
                                <td>{val.itemName}</td>
                                <td>{val.itemPrice}</td>
                                <td>
                                    <input type="checkbox"
                                        id="checkBoxId"
                                        checked={val.checker}
                                        onChange={e => toggleCheckboxChange(e, index)}
                                    />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <h2>The total amount is - {amount}</h2>
        </div>
    )
}

function AddItems(props) {

    const [obj, setobj] = useState({ itemName: "", itemPrice: 1, checker: false })
    const [itemArray, setItemArray] = useState([]);
    const { getArray } = props;

    const setArray = async () => {
        if (obj.itemName !== '' && obj.itemPrice !== 0) {
            await setItemArray([...itemArray, obj]);
            getArray([...itemArray, obj]);
        }
        await setobj({ itemName: '', itemPrice: 1, checker: false });
    }
    return (
        <div>
            <h1>Add the new Items</h1>
            <form onSubmit={e => { e.preventDefault() }}>
                <label>Enter thr Item Name:</label>
                <input type="text" value={obj.itemName} onChange={e => setobj({ ...obj, itemName: e.target.value })} /><br></br>
                <label>Enter the Item Price:</label>
                <input type="number" min="1" value={obj.itemPrice} onChange={e => setobj({ ...obj, itemPrice: Number(e.target.value) })} /><br></br>
                <button onClick={setArray}>Add</button>
            </form>
        </div>
    )
}
export default TotalBill