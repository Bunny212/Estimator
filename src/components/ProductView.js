import React, { useEffect, useState } from 'react';
import { GET_INVOICE_ESTIMATOR_VIEW, DELETE_ORDER, VIEW_POPUP_ESTIMATOR, PLACE_ORDER } from './GraphQlApi/mutations';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Modal from 'react-modal';
import { Link } from 'react-router-dom'
// import { useNavigate } from "react-router-dom";
// import { Button } from 'flowbite-react';
import DataTable from 'react-data-table-component';
import '../App.css';




function ProductView() {


  useEffect(() => {
    refetch();
  });


  // const navigate = useNavigate();

  const [viewdata, SetViewData] = useState('No Response yet')
  const [setDeleteData] = useState('No Response yet');
  const [ setOptions] = useState(false);
  // const [selectedRowId, setSelectedRowId] = useState(null);
  // const [placeOrder, setPlaceOrder] = useState("oder not place yet ")
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }


  const [deleteOrder] = useMutation(DELETE_ORDER);
  const [ViewData] = useMutation(VIEW_POPUP_ESTIMATOR);
  const [PlaceOrder] = useMutation(PLACE_ORDER);

  const ViewHandler = (id) => {

    const idString = id;
    const deleteID = parseInt(idString.slice(0, 4))

    console.log(deleteID)
    ViewData({
      variables: {
        estimateId: deleteID,
      },
    })
      .then((response) => {
        console.log('Mutation result:12222', response);
        SetViewData(response);
        openModal()
        // setOptions(false);
      })
      .catch((error) => {
        console.error('Mutation error:', error);
        alert(error.message)
      });
  };

  const DeleteHandler = (id) => {

    const idString = id;
    const deleteID = idString.slice(0, 4);
    deleteOrder({
      variables: {
        id: deleteID,
      },
    })
      .then((response) => {
        console.log('Mutation result:3333', response);
        setDeleteData(response)
        alert(response?.data?.deleteInvoiceEstimator?.message)
        // openModal()
        refetch();
        setOptions(false);

      })
      .catch((error) => {
        console.error('Mutation error:', error);
      });
  };
  const OrderHanlder = (id) => {
    const idString = id;
    const oderId = idString.slice(0, 4);
    PlaceOrder({
      variables: {
        id: oderId,
      },
    })
      .then((response) => {
        console.log('Mutation result:4444 ', response);
        // setPlaceOrder(response)
        alert(response?.data?.orderPlace?.message)
        // openModal()
        refetch();
        setOptions(false);
      })
      .catch((error) => {
        // console.error('Mutation error:', error);
        alert(
          //   <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          //   <span class="font-medium">Danger alert!</span> 
          // </div>
          error.message
        )

        console.log(error.message)
      });
  };


  const { loading, error, data, refetch } = useQuery(GET_INVOICE_ESTIMATOR_VIEW, { fetchPolicy: 'network-only' });

  if (loading) {

    <div role="status" class="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <div class="flex items-center justify-between pt-4">
        <div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <div class="flex items-center justify-between pt-4">
        <div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <div class="flex items-center justify-between pt-4">
        <div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <div class="flex items-center justify-between pt-4">
        <div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <span class="sr-only">Loading...</span>
    </div>
  }

  if (data) {
    console.log("this is fahad testing", data)
  }
  if (error) return <p>Error: {error?.message}</p>;
  var invoices = data?.invoiceestimator_view.sort((a, b) => b.id - a.id);



  // console.log("this is invoice data:::::", data?.invoiceestimator_view.sort((a, b) => b.id - a.id))
  
  var viewResponse = viewdata?.data?.popupInvoiceEstimatorView?.edit_invoice_estimator

  // const handleRowClick = (rowId) => {
  //   setOptions(!Options); // Toggle options visibility
  //   setSelectedRowId(rowId); // Update selected row ID
  // };



  const customColumns = [
    {
      name: 'Name',
      selector: 'customer_name',
      sortable: true,
      // cell: row => <div>Name: {row.customer_name}</div>,
      cell: row => (
        <div>
          <span className="hidden sm:inline">{row.customer_name}</span>
          <div className="Hiden-label">
          <div className='mobile-card mb-1'>
          <div className='font-semibold mr-2 text-sm widthtable'>Name:</div>  
           <div className='text-sm widthtable'>{row.customer_name}</div>
          </div>
          </div>
        </div>
      ),
      },
    {
      name: 'Dis-Amount',
      selector: 'discount_amount',
      sortable: true,
      // cell: row => <div>Dis-Amount: {row.discount_amount}</div>,

      cell: row => (
        <div>
          <span className="hidden sm:inline">{row.discount_amount}</span>
          <div className='Hiden-label'>
            <div className='mobile-card mb-1'>        
            <div className='font-semibold mr-2 text-sm'>
            Discount:
            </div>
            <div className='text-sm'>
            {row.discount_amount}
            </div>
            </div>
          </div>
          <span className="sm:hidden font-semibold"> </span>
        </div>
      ),

    },
    {
      name: 'Customer Address',
      selector: 'customer_address',
      sortable: true,
      // cell: row => <div>order_status: {row.order_status}</div>,
      cell: row => (
        <div>
          <span className="hidden sm:inline">{row.customer_address}</span>
          <div className='Hiden-label'>
            <div className='mobile-card mb-1'>
            <div className='font-semibold mr-2 text-sm'>
            Status:
            </div>
            <div className='text-sm'>
            {row.customer_address}
            </div>
            </div>
          </div>
        </div>
      ),

    },
    {
      name: 'Order Status',
      selector: 'order_status',
      sortable: true,
      // cell: row => <div>order_status: {row.order_status}</div>,
      cell: row => (
        <div>
          <span className="hidden sm:inline">{row.order_status}</span>
          <div className='Hiden-label'>
            <div className='mobile-card mb-1'>
            <div className='font-semibold mr-2 text-sm'>
            Status:
            </div>
            <div className='text-sm'>
            {row.order_status}
            </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: 'Total',
      selector: 'total',
      sortable: true,
      // cell: row => <div>total: {row.total}</div>,
      cell: row => (
        <div>
          <span className="hidden sm:inline">{row.total}</span>

          <div className='Hiden-label'>
            <div className='mobile-card mb-1'>
              <div className='font-semibold mr-2 text-sm'>total:</div>
              <div className='text-sm'>{row.total}</div>
            </div>
          </div>
          {/* <span className="sm:hidden font-semibold"> </span> */}
        </div>
      ),

    },
    {
      name: 'Actions',
      cell: row => (
        <>

          {row.order_status === "Not Placed" ? (
            <div className='flex flex-wrap '>
              <div
                onClick={() => {
                  ViewHandler(row.estimate_id);
                }}
                class="text-gray-700 bg-white shadow-md rounded-md m-1 px-2 py-1 text-sm flex" role="menuitem" tabindex="-1" id="menu-item-1">
                {/* <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                            <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                          </svg> */}
                <spam className='text-xs sm-hidden'>View</spam>
              </div>
              <div
                onClick={() => console.log(row.estimate_id)}
                class="text-gray-700 bg-white shadow-md rounded-md m-1 px-2 py-1 text-xs flex " role="menuitem" tabindex="-1" id="menu-item-1">
                <Link to={`/CreateInvoice/${row.estimate_id}`}>
                  {/* <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279" />
                            </svg> */}
                  <spam className='text-xs  sm-hidden'>
                    Edit
                  </spam>
                </Link>

              </div>
              {/* Add other action buttons */}
              <div
                onClick={() => {
                  DeleteHandler(row.estimate_id);
                }}
                class="text-gray-700 bg-white shadow-md rounded-md m-1 px-2 py-1 text-xs" role="menuitem" tabindex="-1" id="menu-item-1">
                {/* <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                          </svg> */}
                <span className='text-xs sm-hidden'>
                  Delete
                </span>
              </div>
              <div
                onClick={() => {
                  OrderHanlder(row.estimate_id);
                }}
                class="text-gray-700 bg-white shadow-md rounded-md m-1 px-2 py-1 text-xs flex" role="menuitem" tabindex="-1" id="menu-item-1">
                {/* <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1" />
                          </svg> */}
                <span className='text-xs sm-hidden'>Order</span>
              </div>
            </div>
          ) : (

            <button
              onClick={() => {
                ViewHandler(row.estimate_id);
              }}
              class="text-gray-700 bg-white shadow-md rounded-md px-2 py-1 text-sm flex" role="menuitem" tabindex="-1" id="menu-item-1">
              {/* <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                        <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                      </svg> */}
              <span className='text-xs'>View</span>
            </button>

          )
          }


        </>
      ),
    },
  ];




  // useEffect(() => {
  //   refetch();
  // }, []); 





  return (

    <>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          // style={customStyles}
          className='content'
          contentLabel="Example Modal"
        >
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            {/* <h6 className='sm-text-xs text-sm mb-2' ref={(_subtitle) => (subtitle = _subtitle)}>Your Invoice Estimator Pdf is Generated. Download Your Invoice Pdf.</h6> */}
            <svg onClick={closeModal} class="sm-w-4 sm-h-4 w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
            </svg>

          </div>
          <div>
            <h6 className='sm-text-xs text-sm text-center mb-4 textcolor' ref={(_subtitle) => (subtitle = _subtitle)}>Your Invoice Estimator Pdf is Generated. Download Your Invoice Pdf.</h6>
          </div>
          <div className="relative overflow-auto">
            <table className="w-full text-xs text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="sm-px-2 sm-py-2  px-4 py-4 text-xs">
                    Name
                  </th>
                  <th scope="col" className="sm-px-2 sm-py-2  px-4 py-4 text-xs">
                    price
                  </th>
                  <th scope="col" className="sm-px-2 sm-py-2  px-4 py-4 text-xs">
                    Quantity
                  </th>
                  {/* <th scope="col" className="px-6 py-3"> 
                                    </th> */}
                  <th scope="col" className="sm-px-2 sm-py-2  px-4 py-4 text-xs">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {viewResponse?.invoice_data.map((invoiceView) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="sm-px-2 sm-py-2  px-4 py-4 font-medium text-gray-900  dark:text-white">
                      {invoiceView?.name}
                    </td>
                    <td className="sm-px-2 sm-py-2  px-4 py-4 font-medium text-gray-900  dark:text-white" >{invoiceView?.price}</td>
                    <td className="sm-px-2 sm-py-2  px-4 py-4 font-medium text-gray-900  dark:text-white" >{invoiceView?.quantity}</td>
                    <td className="sm-px-2 sm-py-2  px-4 py-4 font-medium text-gray-900  dark:text-white" >{invoiceView?.total_product_price}</td>
                  </tr>
                ))
                }

              </tbody>
            </table>
          </div>
          {

            <div>

              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <span
                  style={{ backgroundColor: 'blue', fontSize: 15, paddingInline: 10, paddingBlock: 5, borderRadius: 5, color: '#ffff', marginTop: 20 }}
                  href={viewResponse?.invoice_pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pdf
                </span>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                  <div className='text-xs'>
                    Amount  :{''}{viewResponse?.total_with_currency}
                  </div>
                  <div className='text-xs'>
                    Discount :{''}{viewResponse?.customer_discount_with_currency}
                  </div>
                  <div className='text-xs'>
                    total Amount :{''}{viewResponse?.discount_value_with_currency}
                  </div>
                </div>
              </div>

            </div>
          }
        </Modal>

      </div>

      <div className=" overflow-x-auto mb-20 sm-shadow-md sm:rounded-lg">
        <DataTable

          columns={customColumns}
          data={invoices}
          // data ={invoices.reverse()}
          pagination
          highlightOnHover
          striped
          pointerOnHover
          responsive
          searchable
          progressPending={loading}
          progressComponent={
            <div style={{ width: '100%' }}>
              <div role="status" class="z-10 w-full block p-4 space-y-4 border border-gray-200 divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 dark:border-gray-700">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
                <div class="flex items-center justify-between pt-4">
                  <div>
                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
                <div class="flex items-center justify-between pt-4">
                  <div>
                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
                <div class="flex items-center justify-between pt-4">
                  <div>
                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
                <div class="flex items-center justify-between pt-4">
                  <div>
                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
                <span class="sr-only">Loading...</span>
              </div>

              <div role="status" class=" mb-10 w-full space-y-4 border border-gray-200 divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 dark:border-gray-700">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
                <div class="flex items-center justify-between pt-4">
                  <div>
                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
                <div class="flex items-center justify-between pt-4">
                  <div>
                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
                <div class="flex items-center justify-between pt-4">
                  <div>
                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
                <div class="flex items-center justify-between pt-4">
                  <div>
                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
                <span class="sr-only">Loading...</span>
              </div>

              <div role="status" class=" mb-10 w-full  border border-gray-200 divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 dark:border-gray-700">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
                <div class="flex items-center justify-between pt-4">
                  <div>
                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
                <div class="flex items-center justify-between pt-4">
                  <div>
                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
                <div class="flex items-center justify-between pt-4">
                  <div>
                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
                <div class="flex items-center justify-between pt-4">
                  <div>
                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                </div>
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          }

        >
        </DataTable>
      </div>
    </>
  );
}
export default ProductView;
