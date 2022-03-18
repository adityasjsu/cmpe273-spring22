import { React, Component } from "react"
import Item from "./Item";
import {CCol, CRow,CContainer} from '@coreui/react'

class ItemList extends Component {
    renderTile = (current_item) => {

        return (
            
            <CCol>
                <Item type={this.props.type} item={current_item}/>
            </CCol>
        )
    }

    render() {
        let tiles = [];
        for (let i = 0; i < this.props.items.length; i++) {
            const current_item = this.props.items[i];
            tiles.push(this.renderTile(current_item));
        }
        return tiles;    }
}

ItemList.defaultProps = {
    items: []
  };

export default ItemList;