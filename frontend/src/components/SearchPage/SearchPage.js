import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CContainer, CRow } from '@coreui/react';
import ItemList from '../Item/ItemList';

const SearchPage = () => {

    const [items,setItems] = useState([]);
    const {query} = useParams();

    useEffect( () => {

        async function getItem(){
            axios.get("/api/items/searchitem/"+query)
            .then(response => {
                if(response){
                    setItems(response.data);
                    console.log("Items for query: ", query)
                }
                else{
                    console.log('No Such Item Exist');
                }
            });
        }

        getItem();
    },[setItems]);

    console.log(items)

    return (
        <div className='App'>
            
            <br/>
            <br/>

            <b>Showing {items.length} results for: "{query}"</b>

            <br/>
            <br/>
            <div> <label>SortBy:</label>       <select name="dropdown" id="dropdown">

                <option value="value1">Price:low to high</option>
                <option value="value2">Price:high to low</option>

            </select><br/><label>Exclude out of stock</label><input type={'checkbox'}></input>
              </div>
            <br/>
            <br/>
            {items.length > 0 ? 
            
            <CContainer>
            <CRow xs={{ cols: 4 }}>
                <ItemList items={items}/>
            </CRow>
            </CContainer>
        
        : 
        
        <p >No results for product "{query}" . Please use another keyword</p>}
        {/* {{valid ? items.map(({ item_ID, name, description, quantity }) => (
            <p key={item_ID}>Item name: {name},Description {description}, Quantity: {quantity}.</p>
        )) : <p>NO ITEMS in this Shop</p>}} */}
        </div>
        
    );
}

export default SearchPage;