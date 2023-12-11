import React, { useEffect, useState } from 'react';
import { GET_INVOICE_ESTIMATOR_VIEW, DELETE_ORDER, VIEW_POPUP_ESTIMATOR, PLACE_ORDER } from './GraphQlApi/mutations';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Modal from 'react-modal';
import { Link } from 'react-router-dom'
// import { useNavigate } from "react-router-dom";
import { Button } from 'flowbite-react';
import DataTable from 'react-data-table-component';
import '../App.css';



// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     maxWidth: '100%', // Set a maximum width for larger screens
//     // borderRadius: '8px', // Rounded corners
//     // boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Shadow for depth
//     // backgroundColor: '#fff', // White background color
//     // padding:'5%'
//     padding:'2%'
//   },

// };

// customStyles.content['@media (max-width: 640px)'] = {
//   width: '100%', // Adjust width for mobile screens
// };

function ProductView() {


  // const skeletonRows = Array.from({ length: 5 }).map((_, index) => (
  //   <tr key={index}>
  //     <td className="border-b border-gray-200">
  //       <div className="animate-pulse flex space-x-4">
  //         <div className="rounded-full bg-gray-300 h-12 w-12"></div>
  //         <div className="flex-1 space-y-4 py-1">
  //           <div className="h-4 bg-gray-300 rounded w-3/4"></div>
  //           <div className="h-4 bg-gray-300 rounded w-5/6"></div>
  //           <div className="h-4 bg-gray-300 rounded w-4/6"></div>
  //         </div>
  //       </div>
  //     </td>
  //   </tr>
  // ));




  useEffect(() => {
    refetch();
  });


  // const navigate = useNavigate();

  const [viewdata, SetViewData] = useState('No Response yet')
  const [setDeleteData] = useState('No Response yet');
  const [Options, setOptions] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
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
        setOptions(false);
        openModal()
      })
      .catch((error) => {
        console.error('Mutation error:', error);
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


  const invoices = data?.invoiceestimator_view;

  console.log("this is invoice data:::::", data)

  var viewResponse = viewdata?.data?.popupInvoiceEstimatorView?.edit_invoice_estimator

  const handleRowClick = (rowId) => {
    setOptions(!Options); // Toggle options visibility
    setSelectedRowId(rowId); // Update selected row ID
  };



  const customColumns = [
    {
      name: 'Name',
      selector: 'customer_name',
      sortable: true,
    },
    {
      name: 'Dis-Amount',
      selector: 'discount_amount',
      sortable: true,
    },
    {
      name: 'Order Status',
      selector: 'order_status',
      sortable: true,
    },
    {
      name: 'Total',
      selector: 'total',
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <>

          <div class="relative inline-block text-left">
            <div>
              <button onClick={() => handleRowClick(row.id)} type="button" class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                Actions
                <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>

            {
              Options && row.id === selectedRowId && (
                <div class="absolute right-0 z-10 mt-2 w-35 text-xs origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                  <div class="py-1" role="none">
                    {row.order_status === "Not Placed" ? (
                      <div>
                        <div
                          onClick={() => {
                            ViewHandler(row.estimate_id);
                          }}
                          class="text-gray-700 block px-4 py-1 text-sm flex" role="menuitem" tabindex="-1" id="menu-item-1">



                          <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                            <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                          </svg>
                          <a className='text-xs ml-2 sm-hidden'>View</a>
                        </div>
                        <div
                          onClick={() => console.log(row.estimate_id)}
                          href="#" class="text-gray-700  px-4  text-xs flex " role="menuitem" tabindex="-1" id="menu-item-1">
                          <Link to={`/CreateInvoice/${row.estimate_id}`}>
                            <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279" />
                            </svg>
                          </Link>
                          <a className='text-xs ml-2 sm-hidden'>
                            Edit
                          </a>
                       </div>
                        {/* Add other action buttons */}
                        <div
                          onClick={() => {
                            DeleteHandler(row.estimate_id);
                          }}
                          class="text-gray-700 flex px-4 py-2 text-xs" role="menuitem" tabindex="-1" id="menu-item-1">
                          <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                          </svg>
                          <a className='text-xs ml-2 sm-hidden'>
                            Delete
                          </a>
                        </div>
                        <div
                          onClick={() => {
                            OrderHanlder(row.estimate_id);
                          }}
                          class="text-gray-700 px-4 py-2 text-xs flex" role="menuitem" tabindex="-1" id="menu-item-1">
                          <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1" />
                          </svg>
                          <a className='text-xs ml-2 sm-hidden'>order</a>
                        </div>
                      </div>
                    ) : (
                      // <div class="py-1" role="none">
                      //   <div
                      //   onClick={() => {
                      //     ViewHandler(row.estimate_id);
                      //   }} class="text-gray-700 flex px-4 py-2  text-xs" role="menuitem" tabindex="-1" id="menu-item-1">
                      //      <a className='text-xs ml-2'>View</a>
                      //       <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                      //         <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                      //       </svg>
                      //      </div>
                      // </div>
                      <div
                      onClick={() => {
                        ViewHandler(row.estimate_id);
                      }}
                      class="text-gray-700 block px-4 py-1 text-sm flex" role="menuitem" tabindex="-1" id="menu-item-1">
                      <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                        <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                      </svg>
                      <a className='text-xs ml-2'>View</a>
                    </div>

                    )
                    }
                  </div>
                </div>
              )

            }

          </div>
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
          <div className="relative overflow-x-auto">
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
                    {/* <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >{invoicedetails?.price}</td> */}
                    <td className="sm-px-2 sm-py-2  px-4 py-4 font-medium text-gray-900  dark:text-white" >{invoiceView?.total_product_price}</td>
                  </tr>

                ))
                }

              </tbody>
            </table>
          </div>
          {

            <div >

              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button
                  style={{ backgroundColor: 'blue', padding: 2, color: '#ffff', marginTop: 10 }}
                  href={viewResponse?.invoice_pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pdf
                </Button>

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

      <div className="relative overflow-x-auto mb-20 sm-shadow-md sm:rounded-lg">
        <DataTable
          columns={customColumns}
          data={invoices}
          pagination
          highlightOnHover
          striped
          pointerOnHover
          responsive
          searchable
          progressPending={loading}
          progressComponent={
            <div style={{ width: '100%' }}>
              <div role="status" class="w-full block p-4 space-y-4 border border-gray-200 divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 dark:border-gray-700">
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
