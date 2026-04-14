/* eslint-disable import/named */
import { createReducer } from "reduxsauce"

import {
  FETCH_INVOICE_ADDRESS,
  FETCH_INVOICE_ADDRESS_FAILURE,
  FETCH_INVOICE_ADDRESS_SUCCESS,
  FETCH_INVOICES,
  FETCH_INVOICES_FAILURE,
  FETCH_INVOICES_SUCCESS,
  SAVE_INVOICE_ADDRESS,
  SAVE_INVOICE_ADDRESS_FAILURE,
  SAVE_INVOICE_ADDRESS_SUCCESS,
} from "./index"

const initialState = {
  loading: false,
  invoices: { loading: false, data: [] },
  address: { loading: false, data: [] },
  billingMethodAvailable: false,
  error: null,
}

const fetchInvoices = (state) => ({
  ...state,
  invoices: { loading: true, data: [] },
  error: null,
})

const fetchInvoicesSuccess = (state, { invoices }) => ({
  ...state,
  invoices: { loading: false, data: invoices },
  error: null,
})

const fetchInvoicesFailure = (state, { error }) => ({
  ...state,
  invoices: { loading: false, data: [] },
  error,
})

const fetchInvoiceAddress = (state) => ({
  ...state,
  address: { loading: true, data: [] },
  error: null,
})

const fetchInvoiceAddressSuccess = (state, { address }) => ({
  ...state,
  address: { loading: false, data: address },
  billingMethodAvailable: typeof address === "object",
  error: null,
})

const fetchInvoiceAddressFailure = (state, { error }) => ({
  ...state,
  address: { loading: false, data: [] },
  billingMethodAvailable: false,
  error,
})

const saveInvoiceAddress = (state) => ({
  ...state,
  address: { loading: true, data: [] },
  error: null,
})

const saveInvoiceAddressSuccess = (state, { address }) => ({
  ...state,
  address: { loading: false, data: address },
  error: null,
})

const saveInvoiceAddressFailure = (state, { error }) => ({
  ...state,
  address: { loading: false, data: [] },
  error,
})

const InvoicesReducer = createReducer(initialState, {
  [FETCH_INVOICES]: fetchInvoices,
  [FETCH_INVOICES_SUCCESS]: fetchInvoicesSuccess,
  [FETCH_INVOICES_FAILURE]: fetchInvoicesFailure,
  [FETCH_INVOICE_ADDRESS]: fetchInvoiceAddress,
  [FETCH_INVOICE_ADDRESS_SUCCESS]: fetchInvoiceAddressSuccess,
  [FETCH_INVOICE_ADDRESS_FAILURE]: fetchInvoiceAddressFailure,
  [SAVE_INVOICE_ADDRESS]: saveInvoiceAddress,
  [SAVE_INVOICE_ADDRESS_SUCCESS]: saveInvoiceAddressSuccess,
  [SAVE_INVOICE_ADDRESS_FAILURE]: saveInvoiceAddressFailure,
})

export default InvoicesReducer
