import React, { useState } from 'react';
import { useFormik } from 'formik';
import { GET_ALL_PRODUCT, CREATE_INVOICE_MUTATION, EDIT_INVOICE_ESTIMATOR_MUTATION, YOUR_QUERY } from './GraphQlApi/mutations';
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
import { Button } from 'flowbite-react';





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




const CreateInvoice = () => {
    const { id } = useParams();
    const idString = id;
    const ViewID = idString?.slice(0, 4);
    const EditViewid = parseInt(ViewID);

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



    // const [selectedRowsData, setSelectedRowsData] = useState([]);

    const [rowDetails] = useState({});


    const [searchTerm, setSearchTerm] = useState('');
    const [pageSize, setPageSize] = useState(10);

    console.log("this is row data:::::", rowDetails)
    // const [productidclick, setProductIdClick] = useState(2);
    // const [selectedProductIds, setSelectedProductIds] = useState([]);
    const [selectedProductIds, setSelectedProductIds] = useState([]);
    const [productQty, setProductQty] = useState([1])
    const [selectedOption, setSelectedOption] = useState('default');
    // const [modalData, setModalData] = useState();
    const [editReturn, setEditReturn] = useState();
    const [CreateEstimate] = useMutation(CREATE_INVOICE_MUTATION);
    const [EditEstimate] = useMutation(EDIT_INVOICE_ESTIMATOR_MUTATION);
    // const [getViewData] = useMutation(INVOICEES_TIMATOR);


    const { loading: Viewloading, error: Viewerror, data: Viewdata, } = useQuery(YOUR_QUERY, {
        variables: {
            id: EditViewid
        }
    });



    if (Viewloading) {
        <p>Loading.....</p>
    }


    if (Viewdata) {
        console.log("this data is of type edit12344444 ", Viewdata)

    }
    if (Viewerror) {
        console.log("this data is of type edit error ", Viewerror.message)
    }

    // var formData = Viewdata?.invoiceestimator_edit
    var formData = Viewdata?.invoiceestimator_edit

    // console.log("this is form data ", formData?.customer_address)


    const formik = useFormik({
        initialValues: {
            DiscountAmount: formData?.discount_amount || '',
            DiscountType: formData?.discount_type || 'Fix',
            FName: formData?.customer_name || '',
            LName: formData?.last_name || '',
            CAddress: formData?.customer_address || '',
            CNumber: formData?.customer_number || '',
            email: formData?.customer_email || '',
            Coupon: formData?.coupon_code || '',
            selectedProducts: [],

        },

        enableReinitialize: true,
        onSubmit: async (values) => {
            values.selectedProducts = selectedProductIds;

            const input = {
                editable_estimate_invoice_id: values.editable_estimate_invoice_id,
                chked_box_val: values.selectedProducts.map((productId, index) => ({
                    product_id: productId,
                    product_qty: productQty[productId] || 1, // Use productQty or default to 1
                })),
                custom_options: values.selectedProducts.map((productId, index) => ({
                    product_id: productId,
                    custom_option: selectedOption[productId] || 'no', // Use selectedOption or default to 'yes'
                })),
                coupon_code: values.Coupon,
                first_name: values.FName,
                last_name: values.LName,
                customer_email: values.email,
                customer_address: values.CAddress,
                customer_number: values.CNumber,
                discount_amount: parseFloat(values.DiscountAmount),
                discount_type: values.DiscountType,
            };
            try {
                let mutationResult;

                if (EditViewid == null) {

                    mutationResult = await CreateEstimate({ variables: { input } });
                } else {
                    input.editable_estimate_invoice_id = EditViewid;
                    mutationResult = await EditEstimate({ variables: { input } });
                }
                const { data } = mutationResult;
                console.log("edit data::::", data);
                setEditReturn(data)

                if (data) {
                    openModal();
                }

            } catch (error) {
                console.error('Error creating/editing invoice estimate:', error?.message);
            }
        },
    });

    console.log("this is data fahad is testing ", Object.keys(rowDetails)
    )

    // const invoice_data = modalData?.invoIceEstimator?.invoice_estimator?.invoice_data;
    // console.log('hello', modalData?.invoIceEstimator?.invoice_estimator?.invoice_data);
    const {  error, data, refetch } = useQuery(GET_ALL_PRODUCT, {
        variables: {
            search: "",
            pageSize: 10,
        },
    });


    

    if (error) return <p>Error: {error?.message}</p>;

    const products = data?.products?.items || [];

    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        refetch({ search: term, pageSize });
    };

    const handlePageSizeChange = (event) => {
        const size = parseInt(event.target.value);
        setPageSize(size);
        refetch({ search: searchTerm, pageSize: size });
    };
    // const products = data.products.items;

    const handleProductSelection = (productId, productqty, selectedOption) => {

        if (selectedProductIds.includes(productId)) {
            setSelectedProductIds(selectedProductIds.filter(id => id !== productId));
        } else {
            setSelectedProductIds([...selectedProductIds, productId]);
        }
        const updatedOptions = {
            ...selectedOption,
            [productId]: selectedOption,
        };
        setSelectedOption(updatedOptions);
    };
    const invoiceData = editReturn?.editInvoiceEstimator?.edit_invoice_estimator?.invoice_data;
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                        <h6 ref={(_subtitle) => (subtitle = _subtitle)}>Your Invoice Estimator Pdf is Generated. Download Your Invoice Pdf.</h6>

                        {/* <svg onClick={closeModal} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg> */}

                        <svg onClick={closeModal} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                        </svg>

                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr  >
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Fitting Charges
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Quantity
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Product Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody  >
                                {

                                    <>
                                        {invoiceData?.map((invoicedetails, index) => (
                                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-4 sm:px-6 py-2 sm:py-4 font-medium text-gray-900 whitespace-normal dark:text-white">
                                                    {invoicedetails?.name}
                                                </td>
                                                <td className="px-4 sm:px-6 py-2 sm:py-4 font-medium text-gray-900 whitespace-normal dark:text-white" >{invoicedetails?.custom_option}</td>
                                                <td className="px-4 sm:px-6 py-2 sm:py-4 font-medium text-gray-900 whitespace-normal dark:text-white" >{invoicedetails?.quantity}</td>
                                                <td className="px-4 sm:px-6 py-2 sm:py-4 font-medium text-gray-900 whitespace-normal dark:text-white" >{invoicedetails?.price}</td>
                                                <td className="px-4 sm:px-6 py-2 sm:py-4 font-medium text-gray-900 whitespace-normal dark:text-white" >{invoicedetails?.total_product_price}</td>
                                            </tr>
                                        ))}
                                    </>
                                }
                            </tbody>
                        </table>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <Button
                                    style={{ backgroundColor: 'blue', padding: 2, color: '#ffff', marginTop: 20 }}
                                    href={editReturn?.editInvoiceEstimator?.edit_invoice_estimator?.invoice_pdf}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Pdf
                                </Button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                                <div>
                                    Grand Total:{editReturn?.editInvoiceEstimator?.edit_invoice_estimator?.total_with_currency}
                                </div>
                                <div>
                                    Discount Price:{editReturn?.editInvoiceEstimator?.edit_invoice_estimator?.customer_discount_with_currency}
                                </div>
                                <div>
                                    Total Payable:{editReturn?.editInvoiceEstimator?.edit_invoice_estimator?.discount_value_with_currency}
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>








            <div className="lg:px-6 lg:py-12 mb-40">
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount Amount:</label>
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                name="DiscountAmount"
                                type="number"
                                onChange={formik.handleChange}
                                value={formik?.values?.DiscountAmount} placeholder="Discount Amount" required />
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <label for="DiscountType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount Type</label>
                            {/* <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /> */}
                            <select
                                id="DiscountType"
                                name="DiscountType"
                                onChange={formik.handleChange}
                                value={formik?.values?.DiscountType}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option key="Fix" value="Fix" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >Fix</option>
                                <option key="percent" value="percent" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >Percentage</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <label for="FName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name:</label>
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                id="FName"
                                name="FName"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik?.values?.FName} required />
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <label for="LName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name::</label>
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                id="LName"
                                name="LName"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik?.values?.LName}
                                required />
                        </div>

                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <label for="CAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Customer Address:</label>
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                id="CAddress"
                                name="CAddress"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik?.values?.CAddress} required />
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <label for="CNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Customer Number:</label>
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                id="CNumber"
                                name="CNumber"
                                onChange={formik.handleChange}
                                value={formik?.values?.CNumber}
                                required />
                        </div>

                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Customer Email:</label>
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                value={formik?.values?.email} required />
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <label for="Coupon" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Coupon Code:</label>
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                id="Coupon"
                                name="Coupon"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik?.values?.Coupon} />
                        </div>
                    </div>


                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="mb-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <select value={pageSize}
                            className=" mb-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={handlePageSizeChange}>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={30}>30</option>
                            <option value={40}>40</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                            <option value={150}>150</option>
                            <option value={170}>170</option>
                            <option value={180}>200</option>
                            <option value={400}>All</option>
                        </select>

                    </div>



                    <div className='hidden sm:block'>
                        <div className=" relative overflow-x-auto  sm:rounded-lg  py-3 ">
                            <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Select
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            image
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            QUANTITY
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Stock status
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Fitting Charges
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>   {products.map(product => (
                                    <tr key={product.id}>
                                        <th scope="col" className="px-6 py-3">
                                            <input
                                                type="checkbox"
                                                onChange={() => handleProductSelection(product.id, selectedOption[product.id])}
                                                checked={selectedProductIds.includes(product.id)}
                                            />

                                        </th>
                                        <th scope="col" className="px-6 py-3">{product.name}</th>
                                        <th scope="col" className="px-6 py-3">
                                            <img
                                                src={product.image.url}
                                                alt={product.name}
                                                style={{ width: '50px', height: '50px' }}
                                            />
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <input
                                                type='number'

                                                onChange={(e) => {
                                                    const updatedQty = [...productQty];
                                                    updatedQty[product.id] = e.target.value;
                                                    setProductQty(updatedQty);
                                                }}

                                            />

                                        </th>

                                        <th scope="col" className="px-6 py-3">
                                            {product.price_range.minimum_price.regular_price.value}{' '}
                                            {product.price_range.minimum_price.regular_price.currency}
                                        </th>
                                        <th scope="col" className="px-6 py-3">{product.stock_status}</th>
                                        <th scope="col" className="px-6 py-3">

                                            <select
                                                onChange={(event) => {
                                                    const updatedOptions = {
                                                        ...selectedOption,
                                                        [product.id]: event.target.value
                                                    };
                                                    setSelectedOption(updatedOptions);
                                                }}

                                            >

                                                <option key="No" value="no" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >No</option>
                                                <option key="Yes" value="yes" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >Yes</option>
                                            </select>

                                        </th>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className='lg:hidden sm:block mb-5'>
                        <div className=" rid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {products.map(product => (
                                <div key={product.id} className="bg-white shadow-md rounded-md p-4 mb-10">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold">{product.name}</h3>
                                            <p>Price: {product.price_range.minimum_price.regular_price.value} {product.price_range.minimum_price.regular_price.currency}</p>
                                        </div>
                                        <img
                                            src={product.image.url}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor={`quantity_${product.id}`} className="block mb-1">Quantity:</label>
                                        <input
                                            type="number"
                                            id={`quantity_${product.id}`}
                                            className="border border-gray-300 rounded-md p-2 w-full"
                                            value={productQty[product.id]}
                                            onChange={(e) => {
                                                const updatedQty = [...productQty];
                                                updatedQty[product.id] = e.target.value;
                                                setProductQty(updatedQty);
                                            }}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor={`checkbox_${product.id}`} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={`checkbox_${product.id}`}
                                                className="mr-2"
                                                onChange={() => handleProductSelection(product.id, selectedOption[product.id])}
                                                checked={selectedProductIds.includes(product.id)}
                                            />
                                            Add to Estimate
                                        </label>
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor={`fitting_${product.id}`} className="block mb-1">Fitting Charges:</label>
                                        <select
                                            id={`fitting_${product.id}`}
                                            className="border border-gray-300 rounded-md p-2 w-full"
                                            value={selectedOption[product.id]}
                                            onChange={(event) => {
                                                const updatedOptions = {
                                                    ...selectedOption,
                                                    [product.id]: event.target.value
                                                };
                                                setSelectedOption(updatedOptions);
                                            }}
                                        >
                                            <option value="no">No</option>
                                            <option value="yes">Yes</option>
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>



                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Submit</button>

                </form>
                <>


                    {/* 
<div class="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around items-center p-4">
    <div class="flex flex-col items-center">
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.01" />
        </svg>
        <span class="text-xs mt-1">Icon 1</span>
    </div>

    <div class="flex flex-col items-center">
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
        </svg>
        <span class="text-xs mt-1">Icon 2</span>
    </div>

    <div class="flex flex-col items-center">
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3" />
        </svg>
        <span class="text-xs mt-1">Icon 3</span>
    </div>
</div> */}
                    {/* 
                    <div className='hidden sm:block'>
                        <div className=" relative overflow-x-auto  sm:rounded-lg  py-3 mb-20">
                            <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Select
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            image
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            QUANTITY
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Stock status
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Fitting Charges
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>   {products.map(product => (
                                    <tr key={product.id}>
                                        <th scope="col" className="px-6 py-3">
                                            <input
                                                type="checkbox"
                                                onChange={() => handleProductSelection(product.id, selectedOption[product.id])}
                                                checked={selectedProductIds.includes(product.id)}
                                            />

                                        </th>
                                        <th scope="col" className="px-6 py-3">{product.name}</th>
                                        <th scope="col" className="px-6 py-3">
                                            <img
                                                src={product.image.url}
                                                alt={product.name}
                                                style={{ width: '50px', height: '50px' }}
                                            />
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <input
                                                type='number'

                                                onChange={(e) => {
                                                    const updatedQty = [...productQty]; 
                                                    updatedQty[product.id] = e.target.value; 
                                                    setProductQty(updatedQty); 
                                                }}
                                        
                                            />

                                        </th>

                                        <th scope="col" className="px-6 py-3">
                                            {product.price_range.minimum_price.regular_price.value}{' '}
                                            {product.price_range.minimum_price.regular_price.currency}
                                        </th>
                                        <th scope="col" className="px-6 py-3">{product.stock_status}</th>
                                        <th scope="col" className="px-6 py-3">

                                            <select
                                                onChange={(event) => {
                                                    const updatedOptions = {
                                                        ...selectedOption,
                                                        [product.id]: event.target.value
                                                    };
                                                    setSelectedOption(updatedOptions);
                                                }}
                                            
                                            >
                                              
                                                <option key="No" value="no" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >No</option>
                                                <option key="Yes" value="yes" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >Yes</option>
                                            </select>

                                        </th>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>




                    <div className='lg:hidden sm:block mb-40'>
                        <div className=" rid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {products.map(product => (
                                <div key={product.id} className="bg-white shadow-md rounded-md p-4 mb-10">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold">{product.name}</h3>
                                            <p>Price: {product.price_range.minimum_price.regular_price.value} {product.price_range.minimum_price.regular_price.currency}</p>
                                        </div>
                                        <img
                                            src={product.image.url}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor={`quantity_${product.id}`} className="block mb-1">Quantity:</label>
                                        <input
                                            type="number"
                                            id={`quantity_${product.id}`}
                                            className="border border-gray-300 rounded-md p-2 w-full"
                                            value={productQty[product.id]}
                                            onChange={(e) => {
                                                const updatedQty = [...productQty];
                                                updatedQty[product.id] = e.target.value;
                                                setProductQty(updatedQty);
                                            }}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor={`checkbox_${product.id}`} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={`checkbox_${product.id}`}
                                                className="mr-2"
                                                onChange={() => handleProductSelection(product.id, selectedOption[product.id])}
                                                checked={selectedProductIds.includes(product.id)}
                                            />
                                            Add to Estimate
                                        </label>
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor={`fitting_${product.id}`} className="block mb-1">Fitting Charges:</label>
                                        <select
                                            id={`fitting_${product.id}`}
                                            className="border border-gray-300 rounded-md p-2 w-full"
                                            value={selectedOption[product.id]}
                                            onChange={(event) => {
                                                const updatedOptions = {
                                                    ...selectedOption,
                                                    [product.id]: event.target.value
                                                };
                                                setSelectedOption(updatedOptions);
                                            }}
                                        >
                                            <option value="no">No</option>
                                            <option value="yes">Yes</option>
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div> */}


                </>

            </div>
        </>
    );
};

export default CreateInvoice;

