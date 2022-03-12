import React , {memo, useEffect, useMemo, useState} from 'react';
import axios from 'axios';
import { CContainer, CRow , CButton, CForm} from '@coreui/react';
import ItemList from '../Item/ItemList';

const FavItems = (props) => {
    const favItems = props.favItems;
    const[queryItems,setQueryItems] = useState({});
    const[query,setQuery] = useState("");
    const[searched,setSearched] = useState(false);

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
    }
    
    const handleSearchSubmit = () => {
        setQueryItems(favItems.filter(item => item.name.toLowerCase().includes(query)));
        setSearched(!searched);
    }

    return(
        <><div className='App'>

            <CForm className="">
                <h3>Favorite Products Below: </h3>
                <br></br>
                <div>
                <input onChange={handleSearchChange} type='search bar' name="search" placeholder='Search Favorites' style={{marginLeft:100}}></input>
                <button onClick={handleSearchSubmit} type="submit" color="" variant="outline" style={{marginRight:20}}>
                Search
                </button>
                </div>
            </CForm>
            <br/>
            <br/>
            {favItems.length > 0 ? 
            
            <CContainer>
            <CRow xs={{ cols: 4 }}>
                {searched ? 
                
                    <ItemList items={queryItems}/>

                    : 
            
                    <ItemList items={favItems}/>

                }
                {/* <ItemList items={favItems}/> */}
            </CRow>
            </CContainer>
        
            : 
        
            <p></p>}

        </div>
       </>
    )
}

export default FavItems;
