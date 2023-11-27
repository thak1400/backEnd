import dotenv from 'dotenv'; // load environment variables from .env file
import express from 'express';
import bodyParser from "body-parser";
// import multer from 'multer';
// const upload = multer({ dest: 'uploads/',fileFilter:function(req,file,cb){
//   console.log('file is',file)
//   cb(null,true);
// }
// });
import { uploadImage, createListing, deleteListing, newApplication, updateApplication, getApplications, getListing, updateListing, signUp, updatePswd, login, saveJob, deleteSavedJob, fetchSavedJobs, fetchSpecificListing, fetchAllEmployeeInfo, updateEmployeeInfo, getSavedJobs, getApplicationsByEmail, fetchAllEmployerInfo, updateEmployerInfo, getRecommendedJobs, fetchAllApplicationsForSpecificEmployer, getListingByEmail, updateApplicationStatus, uploadPdf } from './app.js';
dotenv.config();
const app = express();
app.use(bodyParser.json({ limit: '5mb' }))
app.use(
  bodyParser.urlencoded({
    limit: '5mb',
    extended: true,
  })
)
const port = process.env.PORT || 3000; // default port is 3000

app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Shwift API endpoint'
    });
});

app.post('/shwift/createlisting', createListing);

app.get('/shwift/listing', getListing);

app.get('/shwift/listing/:emailId', getListingByEmail);

// Not in use
app.get('/shwift/application/:orgName', getApplications);

app.delete('/shwift/deleteListing', deleteListing);

app.post('/shwift/application', newApplication);

app.patch('/shwift/application', updateApplication);

app.patch('/shwift/listing', updateListing);

app.post('/shwift/signUp', signUp);

app.patch('/shwift/updatePswd', updatePswd);

app.get('/shwift/login/:userName', login);

app.get('/shwift/savedjobs/:emailId',fetchSavedJobs);

app.post('/shwift/saveJob', saveJob);

app.post('/shwift/fetchSpecificListing',fetchSpecificListing);

app.post('/shwift/deleteSavedJob', deleteSavedJob);

app.post('/shwift/fetchAllEmployeeInfo', fetchAllEmployeeInfo);

app.post('/shwift/updateEmployeeInfo', updateEmployeeInfo);

app.post('/shwift/getSavedJobs', getSavedJobs);

app.post('/shwift/getApplicationsByEmail', getApplicationsByEmail);

app.post('/shwift/fetchAllEmployerInfo', fetchAllEmployerInfo);

app.post('/shwift/updateEmployerInfo', updateEmployerInfo);

app.post('/shwift/getRecommendedJobs', getRecommendedJobs);

app.post('/shwift/fetchAllApplicationsForSpecificEmployer', fetchAllApplicationsForSpecificEmployer);

app.post('/shwift/uploadImage', uploadImage);

app.post('/shwift/uploadPdf', uploadPdf);

app.post('/shwift/updateApplicationStatus', updateApplicationStatus);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
