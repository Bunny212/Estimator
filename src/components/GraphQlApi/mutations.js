import { gql } from "@apollo/client";



export const GENERATE_TOKEN = gql`
  mutation GenerateCustomerToken($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`;

export const DELETE_ORDER = gql`
mutation DeleteInvoiceEstimator($id:Int!) {
  deleteInvoiceEstimator(input: {id:$id}) {
    message
    status
  }
}
`;
export const PLACE_ORDER = gql`
mutation PlaceOrder($id:Int!) {
  orderPlace(input: {id:$id}) {
    message
    status
  }
}
`

export const CREATE_INVOICE_MUTATION = gql`
  mutation invoIceEstimator($input: InvoiceInput!) {
    invoIceEstimator(input: $input) {
      invoice_estimator {
        discount_value_with_currency
        total_with_currency
        customer_discount_with_currency
        invoice_pdf
        invoice_data {
          name
          price
          quantity
          custom_option
          total_product_price
        }
      }
      message
      status
    }
  }
`;
export const GET_INVOICE_ESTIMATOR_VIEW = gql`
  query GetInvoiceEstimatorView {
    invoiceestimator_view {
      customer_address
      customer_name
      estimate_id
      discount_amount
      discount_type
      id
      order_status
      customer_number
      customer_email
      total

    }
  }
`;
export const VIEW_POPUP_ESTIMATOR = gql`
  mutation ViewPopupEstimator($estimateId: Int!) {
    popupInvoiceEstimatorView(input: { estimate_invoice_id: $estimateId }) {
      message
      status
      edit_invoice_estimator {
        discount_value_with_currency
        total_with_currency
        customer_discount_with_currency
        invoice_pdf
        invoice_data {
          name
          price
          quantity
          custom_option
          total_product_price
        }
      }
    }
  }
`;
export const EDIT_INVOICE_ESTIMATOR_MUTATION = gql`
  mutation editInvoiceEstimator($input: EditInvoiceInput!) {
    editInvoiceEstimator(input: $input) {
      edit_invoice_estimator {
        discount_value_with_currency
        total_with_currency
        customer_discount_with_currency
        invoice_pdf
        invoice_data {
          name
          price
          quantity
          custom_option
          total_product_price
        }
      }
      message
      status
    }
  }
`;

// export const GET_ALL_PRODUCT = gql`
//   query {
//     products(search: "", pageSize: 400) {
//       total_count
//       items {
//         id
//         name
//         sku
//         url_key
//         price_range {
//           minimum_price {
//             regular_price {
//               value
//               currency
//             }
//           }
//         }
//         stock_status
//         image {
//           url
//         }
//       }
//     }
//   }
// `;


// export const GET_ALL_PRODUCT = gql`
//   query Products($search: String, $pageSize: Int!) {
//     products(search: $search, pageSize: $pageSize) {
//       total_count
//       items {
//         id
//         name
//         sku
//         url_key
//         price_range {
//           minimum_price {
//             regular_price {
//               value
//               currency
//             }
//           }
//         }
//         stock_status
//         image {
//           url
//         }
//         page_info {
//           current_page # Retrieve the current page number
//           page_size # Retrieve the page size (number of items per page)
//           total_pages # Retrieve the total number of pages
//         }
//       }
//     }
//   }
// `;




export const GET_ALL_PRODUCT = gql`
  query Products($search: String, $pageSize: Int!, $currentPage:Int!) {
    products(search: $search, pageSize: $pageSize , currentPage: $currentPage) {
      total_count
      items {
        id
        name
        sku
        url_key
        price_range {
          minimum_price {
            regular_price {
              value
              currency
            }
          }
        }
        stock_status
        image {
          url
        }
      }
      page_info {
        current_page # Retrieve the current page number
        page_size # Retrieve the page size (number of items per page)
        total_pages # Retrieve the total number of pages
      }
    }
  }
`;



export const INVOICEES_TIMATOR = gql`
mutation invoiceestimator_edit($id:Int!){
  invoiceestimator_edit(input: {id:$id}) {
    id
    discount_amount
    discount_type
    estimate_id
    customer_address
    customer_name
    customer_number
    customer_email
    coupon_code
  }
}
`;


// export const Get_ViewData = gql`
// query invoiceestimator_edit($id: Int!) {
//   invoiceestimator_edit(id: $id) {
//     id
//     discount_amount
//     discount_type
//     estimate_id
//     customer_address
//     customer_name
//     customer_number
//     customer_email
//     coupon_code
//   }
// }`

export const YOUR_QUERY = gql`
query invoiceestimator_edit($id: Int!) {
  invoiceestimator_edit(id: $id) {
    id
    discount_amount
    discount_type
    estimate_id
    customer_address
    customer_name
    customer_number
    customer_email
    coupon_code
    chked_box_val{
      product_id
      product_qty
  }
  custom_options{
      product_id
      custom_option
  }
  }
}
`;
