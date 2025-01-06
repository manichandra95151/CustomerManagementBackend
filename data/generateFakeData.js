// const mongoose = require('mongoose');
// const { faker } = require('@faker-js/faker');
// const Customer = require('../models/Customer');
// require('dotenv').config();

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Database connected'))
//   .catch((err) => console.log(err));

// // Generate Fake Data in Batches
// const generateFakeData = async () => {
//   const batchSize = 10000; // Insert records in batches of 10,000
//   const totalRecords = 2000000; // Total records to generate

//   for (let i = 0; i < totalRecords / batchSize; i++) {
//     const customers = [];
//     for (let j = 0; j < batchSize; j++) {
//       const s_no = i * batchSize + j + 1; // Calculate serial number
//       customers.push({
//         s_no,
//         name_of_customer: faker.person.fullName(),
//         email: faker.internet.email(),
//         mobile_number: faker.phone.number(),
//         dob: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
//       });
//     }

//     try {
//       await Customer.insertMany(customers); // Bulk insert for each batch
//       console.log(`Inserted batch ${i + 1} of ${totalRecords / batchSize}`);
//     } catch (error) {
//       console.error(`Error inserting batch ${i + 1}:`, error);
//       break;
//     }
//   }

//   mongoose.connection.close();
//   console.log('All records inserted successfully');
// };

// generateFakeData();

const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Customer = require('../../models/Customer');
require('dotenv').config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));

// Generate Fake Data in Batches
const generateFakeData = async () => {
  const batchSize = 10000; // Insert records in batches of 10,000
  const totalRecords = 2000000; // Total records to generate

  // Find the highest s_no already present in the database
  let lastRecord = await Customer.findOne().sort({ s_no: -1 }).select('s_no');
  let startSno = lastRecord ? lastRecord.s_no + 1 : 1; // Start from the next serial number

  for (let i = 0; i < totalRecords / batchSize; i++) {
    const customers = [];
    for (let j = 0; j < batchSize; j++) {
      const s_no = startSno + (i * batchSize + j); // Calculate the serial number
      customers.push({
        s_no,
        name_of_customer: faker.person.fullName(),
        email: faker.internet.email(),
        mobile_number: faker.phone.number(),
        dob: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
      });
    }

    try {
      await Customer.insertMany(customers); // Bulk insert for each batch
      console.log(`Inserted batch ${i + 1} of ${totalRecords / batchSize}`);
    } catch (error) {
      console.error(`Error inserting batch ${i + 1}:`, error);
      break;
    }
  }

  mongoose.connection.close();
  console.log('All records inserted successfully');
};

generateFakeData();
