import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton } from '@coreui/react';
import { useNavigate } from 'react-router';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactPaginate from "react-paginate";

const OrderPage = (props) => {
    const [orderItems, setOrderItems] = useState([]);
    const [perPage, setperPage] = useState(5);
    const [total, setTotal] = useState(0);
    const [hasItems, setHasItems] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            axios.get("/api/orders/" + sessionStorage.getItem("token"))
            .then((response) => {
                if (response.status === 200) {
                    response.data.sort( (a, b) =>
                    a.date_purc.localeCompare(b.date) ||
                    a.time.date_purc(b.time));
                    console.log("response:", response.data);
                    const items = response.data;
                    setOrderItems(items);
                    setHasItems(true);
                }

            });
            console.log("has:", hasItems);
        }, 250);
    }, []);


    function Pagination({ perPage }) {
        const [pageCount, setPageCount] = useState(0);
        const [eligibleItems, setEligibleItems] = useState(null);
        const [Offset, setOffSet] = useState(0);

        useEffect(() => {
            console.log(perPage);
            console.log(Offset);
            const endOffset = parseInt(Offset) + parseInt(perPage);
            console.log(`Loading items from ${Offset} to ${endOffset}`);
            console.log("orderitems before slice", orderItems, orderItems.length);
            console.log("slice return", orderItems.slice(Offset, endOffset), Math.ceil(orderItems.length / perPage));
            setEligibleItems(orderItems.slice(Offset, endOffset));
            setPageCount(Math.ceil(orderItems.length / perPage));
            console.log("eligible items", eligibleItems);
            console.log("page cnt", pageCount);
        }, [Offset, perPage]);

        const handlePageChange = (e) => {
            console.log(e.selected);
            const newOffset = (e.selected * perPage) % orderItems.length;
            setOffSet(newOffset);
        };

        return (
            <>
                <OrdersData selectedOrders={eligibleItems} />
                &nbsp;
                <ReactPaginate
                    onPageChange={handlePageChange}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </>
        );
    }

    const perPageChangeHandler = async (e) => {
        setperPage(e.target.value);
    };






    function OrdersData({ selectedOrders }) {
        return selectedOrders === null ? (
            <div></div>
        ) : (
            <>
                {selectedOrders.map(({ image, gift, giftDesc, name, order_ID, shop, quantity, price, date_purc, total }) => (

                    <CTableRow>
                        <CTableHeaderCell align={'middle'} scope="row"><img src={image} width={100} />
                            {(gift === '1') ? <p>Gift Wrapped with Description : {giftDesc} </p> : ""
                            }
                        </CTableHeaderCell>
                        <CTableDataCell align={'middle'}>{name}</CTableDataCell>
                        {/*<CTableDataCell align={'middle'}>{order_ID}</CTableDataCell>*/}
                        <CTableDataCell align={'middle'}>{shop}</CTableDataCell>
                        <CTableDataCell align={'middle'}>{quantity}</CTableDataCell>
                        <CTableDataCell align={'middle'}>{localStorage.getItem("currency")}{price}</CTableDataCell>
                        <CTableDataCell align={'middle'}>{date_purc}</CTableDataCell>
                        <CTableDataCell align={'middle'}>{localStorage.getItem("currency")}{total}</CTableDataCell>
                    </CTableRow>
                ))
                }
            </>
        );

    }

    console.log("\n Inside Orders Page")

    return orderItems.length === 0 ? (
        <h2></h2>
    ) : (
        <div className='App'>

            <br />
            <br />

            <h1>My Purchases</h1>
            <center><Col md={3} className="text-end">
                Orders Per Page{" "}
                <select value={perPage} onChange={perPageChangeHandler}>
                    <option value="2">2</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>
            </Col></center>


            <CTable>
                <CTableHead color="light">
                    <Row>
                        <Col md={9}>
                        </Col>
                    </Row>
                    <CTableRow>
                        <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Product Name</CTableHeaderCell>
                        {/*<CTableHeaderCell scope="col">Order #</CTableHeaderCell>*/}
                        <CTableHeaderCell scope="col">Shop Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Date of  Purchase</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Order Total</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    <Pagination perPage={perPage} />
                </CTableBody>

            </CTable>







        </div>
    )

}

export default OrderPage;

