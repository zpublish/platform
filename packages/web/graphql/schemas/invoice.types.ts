export default /* GraphQL */ `
  enum CurrencyCode {
    ZEC
  }

  type Invoice {
    id: ID!
    invoiceId: String
    status: String
    price: Float!
    currency: CurrencyCode
  }

  type InvoiceNotFoundError implements Error {
    message: String!
    code: String
  }

  union InvoiceResult = Invoice | InvoiceNotFoundError

  type Query {
    invoice(id: ID!): InvoiceResult
  }

  input InvoiceInput {
    price: Float!
    currency: CurrencyCode!
    # address: String
  }

  input UpdateInvoiceInput {
    id: ID!
    invoice: InvoiceInput
  }

  type Mutation {
    createInvoice(input: InvoiceInput!): Invoice
    updateInvoice(input: UpdateInvoiceInput!): Invoice
  }
`;
