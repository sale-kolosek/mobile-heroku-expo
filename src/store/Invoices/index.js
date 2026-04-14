import { createActions } from "reduxsauce"

const { Types, Creators } = createActions({
  fetchInvoices: null,
  fetchInvoicesSuccess: ["invoices"],
  fetchInvoicesFailure: ["error"],

  fetchInvoiceAddress: null,
  fetchInvoiceAddressSuccess: ["address"],
  fetchInvoiceAddressFailure: ["error"],

  saveInvoiceAddress: ["address"],
  saveInvoiceAddressSuccess: ["address"],
  saveInvoiceAddressFailure: ["error"],
})

module.exports = { ...Types, ...Creators }
