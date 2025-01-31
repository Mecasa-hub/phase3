import React from 'react';
import { Handle } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel } from '@mui/material';

const ShopifyNode = ({ data, isConnectable, updateNodeData }) => {
  const handleChange = (field) => (event) => {
    updateNodeData({ ...data, [field]: event.target.value });
  };

  const handleSwitchChange = (field) => (event) => {
    updateNodeData({ ...data, [field]: event.target.checked });
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
      
      <Typography variant="subtitle2" sx={{ mb: 2 }}>Shopify</Typography>

      <TextField
        fullWidth
        label="Shop Domain"
        value={data.shopDomain || ''}
        onChange={handleChange('shopDomain')}
        placeholder="your-store.myshopify.com"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Access Token"
        type="password"
        value={data.accessToken || ''}
        onChange={handleChange('accessToken')}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={data.operation || 'createProduct'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="createProduct">Create Product</MenuItem>
          <MenuItem value="updateProduct">Update Product</MenuItem>
          <MenuItem value="deleteProduct">Delete Product</MenuItem>
          <MenuItem value="getProduct">Get Product</MenuItem>
          <MenuItem value="listProducts">List Products</MenuItem>
          <MenuItem value="createOrder">Create Order</MenuItem>
          <MenuItem value="updateOrder">Update Order</MenuItem>
          <MenuItem value="cancelOrder">Cancel Order</MenuItem>
          <MenuItem value="getOrder">Get Order</MenuItem>
          <MenuItem value="listOrders">List Orders</MenuItem>
          <MenuItem value="createCustomer">Create Customer</MenuItem>
          <MenuItem value="updateCustomer">Update Customer</MenuItem>
          <MenuItem value="deleteCustomer">Delete Customer</MenuItem>
          <MenuItem value="getCustomer">Get Customer</MenuItem>
          <MenuItem value="listCustomers">List Customers</MenuItem>
          <MenuItem value="createCollection">Create Collection</MenuItem>
          <MenuItem value="updateCollection">Update Collection</MenuItem>
          <MenuItem value="deleteCollection">Delete Collection</MenuItem>
          <MenuItem value="getCollection">Get Collection</MenuItem>
          <MenuItem value="listCollections">List Collections</MenuItem>
          <MenuItem value="createInventoryItem">Create Inventory Item</MenuItem>
          <MenuItem value="updateInventoryItem">Update Inventory Item</MenuItem>
          <MenuItem value="deleteInventoryItem">Delete Inventory Item</MenuItem>
          <MenuItem value="getInventoryItem">Get Inventory Item</MenuItem>
          <MenuItem value="listInventoryItems">List Inventory Items</MenuItem>
          <MenuItem value="createDiscount">Create Discount</MenuItem>
          <MenuItem value="updateDiscount">Update Discount</MenuItem>
          <MenuItem value="deleteDiscount">Delete Discount</MenuItem>
          <MenuItem value="getDiscount">Get Discount</MenuItem>
          <MenuItem value="listDiscounts">List Discounts</MenuItem>
          <MenuItem value="createDraftOrder">Create Draft Order</MenuItem>
          <MenuItem value="updateDraftOrder">Update Draft Order</MenuItem>
          <MenuItem value="deleteDraftOrder">Delete Draft Order</MenuItem>
          <MenuItem value="getDraftOrder">Get Draft Order</MenuItem>
          <MenuItem value="listDraftOrders">List Draft Orders</MenuItem>
          <MenuItem value="fulfillOrder">Fulfill Order</MenuItem>
          <MenuItem value="refundOrder">Refund Order</MenuItem>
          <MenuItem value="createWebhook">Create Webhook</MenuItem>
          <MenuItem value="updateWebhook">Update Webhook</MenuItem>
          <MenuItem value="deleteWebhook">Delete Webhook</MenuItem>
          <MenuItem value="getWebhook">Get Webhook</MenuItem>
          <MenuItem value="listWebhooks">List Webhooks</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="ID"
        value={data.id || ''}
        onChange={handleChange('id')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Title"
        value={data.title || ''}
        onChange={handleChange('title')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Description"
        multiline
        rows={4}
        value={data.description || ''}
        onChange={handleChange('description')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Price"
        type="number"
        value={data.price || ''}
        onChange={handleChange('price')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Compare at Price"
        type="number"
        value={data.compareAtPrice || ''}
        onChange={handleChange('compareAtPrice')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="SKU"
        value={data.sku || ''}
        onChange={handleChange('sku')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Barcode"
        value={data.barcode || ''}
        onChange={handleChange('barcode')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Vendor"
        value={data.vendor || ''}
        onChange={handleChange('vendor')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Product Type"
        value={data.productType || ''}
        onChange={handleChange('productType')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Tags"
        value={data.tags || ''}
        onChange={handleChange('tags')}
        placeholder="Comma-separated tags"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Variants"
        multiline
        rows={4}
        value={data.variants || ''}
        onChange={handleChange('variants')}
        placeholder="Variants in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Images"
        multiline
        rows={4}
        value={data.images || ''}
        onChange={handleChange('images')}
        placeholder="Image URLs in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Metafields"
        multiline
        rows={4}
        value={data.metafields || ''}
        onChange={handleChange('metafields')}
        placeholder="Metafields in JSON format"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.published || false}
            onChange={handleSwitchChange('published')}
          />
        }
        label="Published"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.taxable || true}
            onChange={handleSwitchChange('taxable')}
          />
        }
        label="Taxable"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.requiresShipping || true}
            onChange={handleSwitchChange('requiresShipping')}
          />
        }
        label="Requires Shipping"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default ShopifyNode;
