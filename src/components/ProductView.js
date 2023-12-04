import React, { useEffect, useState } from 'react';
import { GET_INVOICE_ESTIMATOR_VIEW, DELETE_ORDER, VIEW_POPUP_ESTIMATOR, PLACE_ORDER } from './GraphQlApi/mutations';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Modal from 'react-modal';
import { Link } from 'react-router-dom'
// import { useNavigate } from "react-router-dom";
import {  Button } from 'flowbite-react';
import DataTable from 'react-data-table-component';






const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%', // Adjust width for mobile feel
    maxWidth: '100%', // Set a maximum width for larger screens
    // borderRadius: '8px', // Rounded corners
    // boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Shadow for depth
    backgroundColor: '#fff', // White background color
  },

};

customStyles.content['@media (max-width: 640px)'] = {
  width: '95%', // Adjust width for mobile screens
};

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
  const [ setDeleteData] = useState('No Response yet');
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


  const { loading, error, data, refetch } = useQuery(GET_INVOICE_ESTIMATOR_VIEW);

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

  const customColumns = [
    {
      name: 'Name',
      selector: 'customer_name',
      sortable: true,
    },
    // {
    //   name: 'Address',
    //   selector: 'customer_address',
    //   sortable: true,
    // },
    // {
    //   name: 'Estimate ID',
    //   selector: 'estimate_id',
    //   sortable: true,
    // },
    {
      name: 'Dis-Amount',
      selector: 'discount_amount',
      sortable: true,
    },
    // {
    //   name: 'Discount Type',
    //   selector: 'discount_type',
    //   sortable: true,
    // },
    {
      name: 'Order Status',
      selector: 'order_status',
      sortable: true,
    },
    // {
    //   name: 'Number',
    //   selector: 'customer_number',
    //   sortable: true,
    // },
    // {
    //   name: 'Email',
    //   selector: 'customer_email',
    //   sortable: true,
    // },
    {
      name: 'Total',
      selector: 'total',
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <div>
          <button onClick={() => { ViewHandler(row.estimate_id) }}>View</button>
          <button onClick={() => console.log(row.estimate_id)}>
            <Link to={`/CreateInvoice/${row.estimate_id}`}>
              Edit
            </Link>
          </button>
          {/* Add other action buttons */}
          <button onClick={() => { DeleteHandler(row.estimate_id) }}>Delete</button>
          {/* <button onClick={() => { ViewHandler(row.estimate_id) }}>View</button> */}
          <button onClick={() => { OrderHanlder(row.estimate_id) }}>place Order</button>



        </div>

        //         <div className="flex sm:flex-col  sm:space-x-2">
        //   <button
        //     onClick={() => { ViewHandler(row.estimate_id) }}
        //     className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-2 sm:mb-0 w-full sm:w-auto"
        //   >
        //     View
        //   </button>
        //   <button
        //     onClick={() => console.log(row.estimate_id)}
        //     className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded mb-2 sm:mb-0 w-full sm:w-auto"
        //   >
        //     <Link to={`/CreateInvoice/${row.estimate_id}`} className="text-white">
        //       Edit
        //     </Link>
        //   </button>
        //   <button
        //     onClick={() => { DeleteHandler(row.estimate_id) }}
        //     className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mb-2 sm:mb-0 w-full sm:w-auto"
        //   >
        //     Delete
        //   </button>
        //   <button
        //     onClick={() => { OrderHanlder(row.estimate_id) }}
        //     className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mb-2 sm:mb-0 w-full sm:w-auto"
        //   >
        //     Place Order
        //   </button>
        // </div>


      ),
    },
  ];




  return (

    <>
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h6 ref={(_subtitle) => (subtitle = _subtitle)}>Your Invoice Estimator Pdf is Generated. Download Your Invoice Pdf.</h6>
            <svg onClick={closeModal} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
          </svg>

        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  price
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                {/* <th scope="col" className="px-6 py-3">
                                        
                                    </th> */}
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {viewResponse?.invoice_data.map((invoiceView) => (

                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                    {invoiceView?.name}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900  dark:text-white" >{invoiceView?.price}</td>
                  <td className="px-6 py-4 font-medium text-gray-900  dark:text-white" >{invoiceView?.quantity}</td>
                  {/* <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >{invoicedetails?.price}</td> */}
                  <td className="px-6 py-4 font-medium text-gray-900  dark:text-white" >{invoiceView?.total_product_price}</td>
                </tr>

              ))
              }

            </tbody>
          </table>
        </div>
        {

          <div style={{ display: '', justifyContent: 'space-between' }}>

            <div>
              <Button
                style={{ backgroundColor: 'blue', padding: 2, color: '#ffff', marginTop: 20 }}
                href={viewResponse?.invoice_pdf}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Pdf
              </Button>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
              <div>
                Amount  :{''}{viewResponse?.total_with_currency}
              </div>
              <div>
                Discount :{''}{viewResponse?.customer_discount_with_currency}
              </div>
              <div>
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
      <div style={{width:'100%'}}>
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
