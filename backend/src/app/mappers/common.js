exports.pagination = req => ({
  orderColumn: req.query.order_column,
  orderSense: req.query.order_sense,
  pageSize: req.query.page_size ? parseInt(req.query.page_size) : 10,
  pageNumber: req.query.page_number ? parseInt(req.query.page_number) : 1
});
