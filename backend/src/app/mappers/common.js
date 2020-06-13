exports.pagination = req => ({
  orderColumn: req.query.order_column,
  orderSense: req.query.order_sense,
  pageSize: req.query.page_size ? parseInt(req.query.page_size) : 10,
  pageNumber: req.query.page_number ? parseInt(req.query.page_number) : 1
});

exports.OPTIONAL_ACTIVE = 'optional_active';
exports.ACTIVE = 'active';
exports.NAME = 'name';
exports.ID = 'id';

const addIdProperty = (obj, req) => {
  obj.id = req.params.id;
  return obj;
};

const addNameProperty = (obj, req) => {
  obj.name = req.body.name;
  return obj;
};

const addActiveProperty = (obj, req) => {
  obj.active = req.body.active;
  return obj;
};

const addOptionalActiveProperty = (obj, req) => {
  obj.active = req.body.active === undefined || req.body.active === true;
  return obj;
};

exports.addCommonProperties = (obj, req, props) => {
  if (props.includes(this.ID)) {
    addIdProperty(obj, req);
  }
  if (props.includes(this.NAME)) {
    addNameProperty(obj, req);
  }
  if (props.includes(this.ACTIVE)) {
    addActiveProperty(obj, req);
  }
  if (props.includes(this.OPTIONAL_ACTIVE)) {
    addOptionalActiveProperty(obj, req);
  }
  return obj;
};
