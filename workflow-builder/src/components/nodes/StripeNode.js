import React from 'react';
import { Handle } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';

const StripeNode = ({ data, isConnectable, updateNodeData }) => {
  const handleChange = (field) => (event) => {
    updateNodeData({ ...data, [field]: event.target.value });
  };

  return (
    <Box
      sx={{
        background: '#fff',
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        minWidth: '250px',
      }}
    >
      <Handle type="target" position="top" isConnectable={isConnectable} />
      
      <Typography variant="subtitle2" sx={{ mb: 2 }}>Stripe</Typography>

      <TextField
        fullWidth
        label="API Key"
        type="password"
        value={data.apiKey || ''}
        onChange={handleChange('apiKey')}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={data.operation || 'createPayment'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="createPayment">Create Payment</MenuItem>
          <MenuItem value="retrievePayment">Retrieve Payment</MenuItem>
          <MenuItem value="updatePayment">Update Payment</MenuItem>
          <MenuItem value="capturePayment">Capture Payment</MenuItem>
          <MenuItem value="cancelPayment">Cancel Payment</MenuItem>
          <MenuItem value="createCustomer">Create Customer</MenuItem>
          <MenuItem value="retrieveCustomer">Retrieve Customer</MenuItem>
          <MenuItem value="updateCustomer">Update Customer</MenuItem>
          <MenuItem value="deleteCustomer">Delete Customer</MenuItem>
          <MenuItem value="listCustomers">List Customers</MenuItem>
          <MenuItem value="createSubscription">Create Subscription</MenuItem>
          <MenuItem value="retrieveSubscription">Retrieve Subscription</MenuItem>
          <MenuItem value="updateSubscription">Update Subscription</MenuItem>
          <MenuItem value="cancelSubscription">Cancel Subscription</MenuItem>
          <MenuItem value="createProduct">Create Product</MenuItem>
          <MenuItem value="retrieveProduct">Retrieve Product</MenuItem>
          <MenuItem value="updateProduct">Update Product</MenuItem>
          <MenuItem value="deleteProduct">Delete Product</MenuItem>
          <MenuItem value="listProducts">List Products</MenuItem>
          <MenuItem value="createPrice">Create Price</MenuItem>
          <MenuItem value="retrievePrice">Retrieve Price</MenuItem>
          <MenuItem value="updatePrice">Update Price</MenuItem>
          <MenuItem value="listPrices">List Prices</MenuItem>
          <MenuItem value="createRefund">Create Refund</MenuItem>
          <MenuItem value="retrieveRefund">Retrieve Refund</MenuItem>
          <MenuItem value="updateRefund">Update Refund</MenuItem>
          <MenuItem value="listRefunds">List Refunds</MenuItem>
          <MenuItem value="createInvoice">Create Invoice</MenuItem>
          <MenuItem value="retrieveInvoice">Retrieve Invoice</MenuItem>
          <MenuItem value="updateInvoice">Update Invoice</MenuItem>
          <MenuItem value="deleteInvoice">Delete Invoice</MenuItem>
          <MenuItem value="finalizeInvoice">Finalize Invoice</MenuItem>
          <MenuItem value="payInvoice">Pay Invoice</MenuItem>
          <MenuItem value="voidInvoice">Void Invoice</MenuItem>
          <MenuItem value="createCoupon">Create Coupon</MenuItem>
          <MenuItem value="retrieveCoupon">Retrieve Coupon</MenuItem>
          <MenuItem value="updateCoupon">Update Coupon</MenuItem>
          <MenuItem value="deleteCoupon">Delete Coupon</MenuItem>
          <MenuItem value="listCoupons">List Coupons</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Amount"
        type="number"
        value={data.amount || ''}
        onChange={handleChange('amount')}
        placeholder="Amount in cents"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Currency"
        value={data.currency || ''}
        onChange={handleChange('currency')}
        placeholder="usd"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Customer ID"
        value={data.customerId || ''}
        onChange={handleChange('customerId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Payment Method"
        value={data.paymentMethod || ''}
        onChange={handleChange('paymentMethod')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Description"
        multiline
        rows={2}
        value={data.description || ''}
        onChange={handleChange('description')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Metadata"
        multiline
        rows={4}
        value={data.metadata || ''}
        onChange={handleChange('metadata')}
        placeholder="Metadata in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Product ID"
        value={data.productId || ''}
        onChange={handleChange('productId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Price ID"
        value={data.priceId || ''}
        onChange={handleChange('priceId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Subscription ID"
        value={data.subscriptionId || ''}
        onChange={handleChange('subscriptionId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Invoice ID"
        value={data.invoiceId || ''}
        onChange={handleChange('invoiceId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Coupon ID"
        value={data.couponId || ''}
        onChange={handleChange('couponId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Refund Amount"
        type="number"
        value={data.refundAmount || ''}
        onChange={handleChange('refundAmount')}
        placeholder="Amount to refund in cents"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Refund Reason"
        value={data.refundReason || ''}
        onChange={handleChange('refundReason')}
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default StripeNode;
