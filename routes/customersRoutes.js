const express = require('express');
const Customer = require('../models/Customer');
const router = express.Router();

// GET /customers: Paginated, Search, and Filtered Data
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', filterField, filterValue } = req.query;

    // Search and filter conditions
    const query = {};
    if (search) {
      query.$or = [
        { name_of_customer: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }
    if (filterField && filterValue) {
      query[filterField] = filterValue;
    }

    // Pagination
    const skip = (page - 1) * limit;
    const customers = await Customer.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort({ created_at: -1 });

    const total = await Customer.countDocuments(query);

    res.json({
      customers,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

module.exports = router;
