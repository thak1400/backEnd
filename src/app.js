import { v4 as uuid } from 'uuid';
import { ShwiftRepository } from "./repository.js";
import moment from 'moment/moment.js';

export const createListing = async (request, response) => {
    try{
        if(request.body && typeof request.body === ('object')) {
            const shwiftRepo = new ShwiftRepository();
            const listingData = request.body;
            console.log(request);
            const jobId = uuid();
            const result = await shwiftRepo.addListing(jobId, listingData);
            if(result) {
                console.log(`createListing successful`);
                response.status(201).send(result);
            } else {
                console.error(`createListing Failed  - ${JSON.stringify(request.body)}`);
                response.status(400).send({
                    type: 'BAD_REQUEST',
                    message: 'Request failed before completion',
                    details: 'Invalid Input request'
                });
            }
        }
    } catch(error) {
        console.log(`createListing failed - ${JSON.stringify(error)}`);
        response.status(500).send(error);
    }
}


export const deleteListing = async (request, response) => {
    try{
        if(request.body && typeof request.body === ('object')) {
            const shwiftRepo = new ShwiftRepository();
            const {jobId} = request.body;
            // const jobId = uuid();
            const result = await shwiftRepo.removeListing(jobId);
            if(result) {
                console.log(`deleteListing successful`);
                response.status(200).send(result);
            } else {
                console.error(`deleteListing Failed  - ${JSON.stringify(request.body)}`);
                response.status(400).send({
                    type: 'BAD_REQUEST',
                    message: 'Request failed before completion',
                    details: 'Invalid Input request'
                });
            }
        }
    } catch(error) {
        console.log(`deleteListing failed - ${JSON.stringify(error)}`);
        response.status(500).send(error);
    }
}
export const newApplication = async (request, response) => {
    try{
        if(request.body && typeof request.body === ('object')) {
            const shwiftRepo = new ShwiftRepository();
            const applicationId=uuid();
            let currentDate = moment().format();
            const applicationData=request.body;
            const result = await shwiftRepo.newApplication(applicationId,applicationData,currentDate);
            if(result) {
                console.log(`newApplication successful`);
                response.status(200).send(result);
            } else {
                console.error(`newApplication Failed  - ${JSON.stringify(request.body)}`);
                response.status(400).send({
                    type: 'BAD_REQUEST',
                    message: 'Request failed before completion',
                    details: 'Invalid Input request'
                });
            }
        }
    } catch(error) {
        console.log(`newApplication failed - ${JSON.stringify(error)}`);
        response.status(500).send(error);
    }
}

export const getListing = async (request, response) => {
    try{
        const shwiftRepo = new ShwiftRepository();
        const result = await shwiftRepo.fetchListing();
        if(result) {
            console.log(`getListing successful`);
            response.status(200).send(result);
        } else {
            console.error(`getListing Failed  - ${JSON.stringify(request.param)}`);
            response.status(400).send({
                type: 'BAD_REQUEST',
                message: 'Request failed before completion',
                details: 'Invalid Input request'
            });
        }
    } catch(error) {
        console.log(`getListing failed - ${JSON.stringify(error)}`);
        response.status(500).send(error);
    }
}

export const getListingByEmail = async (request, response) => {
    try{
        const shwiftRepo = new ShwiftRepository();
        const {emailId} = request.params;
        const result = await shwiftRepo.fetchListingByEmployerEmail(emailId);
        if(result) {
            console.log(`getListingByEmail successful`);
            response.status(200).send(result);
        } else {
            console.error(`getListingByEmail Failed  - ${JSON.stringify(request.param)}`);
            response.status(400).send({
                type: 'BAD_REQUEST',
                message: 'Request failed before completion',
                details: 'Invalid Input request'
            });
        }
    } catch(error) {
        console.log(`getListingByEmail failed - ${JSON.stringify(error)}`);
        response.status(500).send(error);
    }
}

export const updateApplication = async (request, response) => {
    try{
        if(request.body && typeof request.body === ('object')) {
            const shwiftRepo = new ShwiftRepository();
            const applicationData=request.body;
            const result = await shwiftRepo.updateApplication(applicationData.applicationId,applicationData);
            if(result) {
                console.log(`updateApplication successful`);
                response.status(200).send(result);
            } else {
                console.error(`updateApplication Failed  - ${JSON.stringify(request.body)}`);
                response.status(400).send({
                    type: 'BAD_REQUEST',
                    message: 'Request failed before completion',
                    details: 'Invalid Input request'
                });
            }
        }
    } catch(error) {
        console.log(`updateApplication failed - ${JSON.stringify(error)}`);
        response.status(500).send(error);
    }
}

export const getApplications = async (request, response) => {
    try{
        const shwiftRepo = new ShwiftRepository();
        const { orgName } = request.params;
        const { jobId } = request.query;
        const result = await shwiftRepo.fetchApplication(orgName, jobId);
        if(result) {
            console.log(`getApplications successful`);
            response.status(200).send(result);
        } else {
            console.error(`getApplications Failed  - ${JSON.stringify(request.param)}`);
            response.status(400).send({
                type: 'BAD_REQUEST',
                message: 'Request failed before completion',
                details: 'Invalid Input request'
            });
        }
    } catch(error) {
        console.log(`getApplications failed - ${JSON.stringify(error)}`);
        response.status(500).send(error);
    }
}
export const updateListing = async (request, response) => {
    try{
        if(request.body && typeof request.body === ('object')) {
            const shwiftRepo = new ShwiftRepository();
            const listingData=request.body;
            const result = await shwiftRepo.updateListing(listingData.jobId,listingData);
            if(result) {
                console.log(`updateListing successful`);
                response.status(200).send(result);
            } else {
                console.error(`updateListing Failed  - ${JSON.stringify(request.body)}`);
                response.status(400).send({
                    type: 'BAD_REQUEST',
                    message: 'Request failed before completion',
                    details: 'Invalid Input request'
                });
            }
        }
    } catch(error) {
        console.log(`updateListing failed - ${JSON.stringify(error)}`);
        response.status(500).send(error);
    }
    
}
// export const signUp = async (request, response) => {
//     try{
//         if(request.body && typeof request.body === ('object')) {
//             const shwiftRepo = new ShwiftRepository();
//             const userData=request.body;
//             console.log(userData);
//             const result = await shwiftRepo.signUp(userData);
//             if(result) {
//                 console.log(`signUp successful`);
//                 response.status(200).send(result);
//             } else {
//                 console.error(`signUp Failed  - ${JSON.stringify(request.body)}`);
//                 response.status(400).send({
//                     type: 'BAD_REQUEST',
//                     message: 'Request failed before completion',
//                     details: 'Invalid Input request'
//                 });
//             }
//         }
//     } catch(error) {
//         console.log(`signUp failed - ${JSON.stringify(error)}`);
//         response.status(500).send(error);
//     }
    
// }

export const signUp = async (request, response) => {
    try{
        if(request.body && typeof request.body === ('object')) {
            const shwiftRepo = new ShwiftRepository();
            const userData=request.body;
            const serialNum=uuid();
            console.log(userData);
            const result = await shwiftRepo.signUp(serialNum,userData);
            if(result) {
                console.log(`signUp successful`);
                response.status(200).send(result);
            } else {
                console.error(`signUp Failed  - ${JSON.stringify(request.body)}`);
                response.status(400).send({
                    type: 'BAD_REQUEST',
                    message: 'Request failed before completion',
                    details: 'Invalid Input request'
                });
            }
        }
    } catch(error) {
        console.log(`signUp failed - ${JSON.stringify(error)}`);
        response.status(500).send(error);
    }
    
}

export const updatePswd = async (request, response) => {
    try{
        if(request.body && typeof request.body === ('object')) {
            const shwiftRepo = new ShwiftRepository();
            const userData=request.body;
            console.log(userData);
            console.log("Calling update pswd");
            const result = await shwiftRepo.updatePswd(userData.emailId,userData);
            if(result) {
                console.log(`updatePswd successful`);
                response.status(200).send(result);
            } else {
                console.error(`updatePswd Failed  - ${JSON.stringify(request.body)}`);
                response.status(400).send({
                    type: 'BAD_REQUEST',
                    message: 'Request failed before completion',
                    details: 'Invalid Input request'
                });
            }
        }
    } catch(error) {
        console.log(`updatePswd failed - ${JSON.stringify(error)}`);
        response.status(500).send(error);
    }
        
}

export const login = async (request, response) => {
    try{
        if(request.body && typeof request.body === ('object')) {
            const shwiftRepo = new ShwiftRepository();
            const {userName}=request.params;
            const {password}=request.query;
            console.log(request);
            console.log(userName);
            console.log(password);
            console.log("Calling login pswd");
            const result = await shwiftRepo.login(userName,password);
            if(result) {
                console.log(`login successful`);
                response.status(200).send(result);
            } else {
                console.error(`login Failed  - ${JSON.stringify(request.body)}`);
                response.status(400).send({
                    type: 'BAD_REQUEST',
                    message: 'Request failed before completion',
                    details: 'Invalid Input request'
                });
            }
        }
    } catch(error) {
        console.log(`login failed - ${JSON.stringify(error)}`);
        response.status(500).send(error);
    } 
}

export const fetchSavedJobs = async (request, response) => {
    try{
        if(request.body && typeof request.body === ('object')) {
            const shwiftRepo = new ShwiftRepository();
            console.log(request);
            const {emailId}=request.params;
            const {jobId}=request.query;
            console.log("Calling fetchSavedJobs");
            console.log(jobId);
            const result = await shwiftRepo.fetchSavedJobs(emailId,jobId);
            if(result) {
                console.log(`fetchSavedJobs successful`);
                response.status(200).send(result);
            } else {
                console.error(`fetchSavedJobs Failed  - ${JSON.stringify(request.body)}`);
                response.status(400).send({
                    type: 'BAD_REQUEST',
                    message: 'Request failed before completion',
                    details: 'Invalid Input request'
                });
            }
        }
    } catch(error) {
        console.log(`fetchSavedJobs failed - ${JSON.stringify(error)}`);
        response.status(500).send(error);
    } 
}

export const fetchSpecificListing = async (request, response) => {
    try{
        if(request.body && typeof request.body === ('object')) {
            const shwiftRepo = new ShwiftRepository();
            // const {jobId}=request.query;
            const userData = request.body;
            // console.log(jobId);
            console.log("Calling fetchSpecificListing");
            const result = await shwiftRepo.fetchSpecificListing(userData);
            if(result) {
                console.log(`fetchSpecificListing successful`);
                response.status(200).send(result);
            } else {
                console.error(`fetchSpecificListing Failed  - ${JSON.stringify(request.body)}`);
                response.status(400).send({
                    type: 'BAD_REQUEST',
                    message: 'Request failed before completion',
                    details: 'Invalid Input request'
                });
            }
        }
    } catch(error) {
        console.log(`fetchSpecificListing failed - ${JSON.stringify(error)}`);
        response.status(500).send(error);
    } 
}

export const saveJob = async (request, response) => {
    try{
        if(request.body && typeof request.body === ('object')) {
            const shwiftRepo = new ShwiftRepository();
            const saveJobData = request.body;
            console.log(saveJobData);
            const result = await shwiftRepo.saveJob(saveJobData.emailId, saveJobData.jobId);
            if(result) {
                console.log(`Job saved successfully`);
                response.status(200).send(result);
            } else {
                console.error(`Job save failed  - ${JSON.stringify(request.body)}`);
                response.status(400).send({
                    type: 'BAD_REQUEST',
                    message: 'Request failed before completion',
                    details: 'Invalid Input request'
                });
            }
        }
    } catch(error) {
        console.log(`Job save failed - ${JSON.stringify(error)}`);
        response.status(500).send(error);
    }
    
}

export const deleteSavedJob = async (request, response) => {
    try{
        if(request.body && typeof request.body === ('object')) {
            const shwiftRepo = new ShwiftRepository();
            const jobData = request.body;
            console.log(jobData);
            const result = await shwiftRepo.deleteSavedJob(jobData.emailId, jobData.jobId);
            if(result) {
                console.log(`Job deleted successfully`);
                response.status(200).send(result);
            } else {
                console.error(`Job delete failed  - ${JSON.stringify(request.body)}`);
                response.status(400).send({
                    type: 'BAD_REQUEST',
                    message: 'Request failed before completion',
                    details: 'Invalid Input request'
                });
            }
        }
    } catch(error) {
        console.log(`Job delete failed - ${JSON.stringify(error)}`);
        response.status(500).send(error);
    }
    
}

export const fetchAllEmployeeInfo = async (request, response) => {
    try{
        if(request.body && typeof request.body === ('object')) {
            const shwiftRepo = new ShwiftRepository();
            const {emailId} = request.body;
            console.log(emailId);
            const result = await shwiftRepo.fetchAllEmployeeInfo(emailId);
            if(result) {
                console.log(`fetchAllEmployeeInfo successfully`);
                response.status(200).send(result);
            } else {
                console.error(`fetchAllEmployeeInfo failed  - ${JSON.stringify(request.body)}`);
                response.status(400).send({
                    type: 'BAD_REQUEST',
                    message: 'Request failed before completion',
                    details: 'Invalid Input request'
                });
            }
        }
    } catch(error) {
        console.log(`fetchAllEmployeeInfo failed - ${JSON.stringify(error)}`);
        response.status(500).send(error);
    }
    
}

export const updateEmployeeInfo = async (request, response) => {
    try{
        if(request.body && typeof request.body === ('object')) {
            const shwiftRepo = new ShwiftRepository();
            const emailId = request.body.emailId;
            const col_name = request.body.col_name;
            const value = request.body.value;
            console.log(emailId);
            console.log(col_name);
            console.log(value);
            const result = await shwiftRepo.updateEmployeeInfo(emailId,col_name,value);
            if(result) {
                console.log(`updateEmployeeInfo successfully`);
                response.status(200).send(result);
            } else {
                console.error(`updateEmployeeInfo failed  - ${JSON.stringify(request.body)}`);
                response.status(400).send({
                    type: 'BAD_REQUEST',
                    message: 'Request failed before completion',
                    details: 'Invalid Input request'
                });
            }
        }
    } catch(error) {
        console.log(`updateEmployeeInfo failed - ${JSON.stringify(error)}`);
        response.status(500).send(error);
    }
    
}

export const getSavedJobs = async (request, response) => {
    try{
        if(request.body && typeof request.body === ('object')) {
            const shwiftRepo = new ShwiftRepository();
            const userData = request.body;
            console.log(userData.emailId);
            const result = await shwiftRepo.getSavedJobs(userData);
            if(result) {
                console.log(`getSavedJobs successful`);
                response.status(200).send(result);
            } else {
                console.error(`getSavedJobs failed  - ${JSON.stringify(request.body)}`);
                response.status(400).send({
                    type: 'BAD_REQUEST',
                    message: 'Request failed before completion',
                    details: 'Invalid Input request'
                });
            }
        }
    } catch(error) {
        console.log(`getSavedJobs failed - ${JSON.stringify(error)}`);
        response.status(500).send(error);
    }
    
}

export const getApplicationsByEmail = async (request, response) => {
    try{
        if(request.body && typeof request.body === ('object')) {
            const shwiftRepo = new ShwiftRepository();
            const userData = request.body;
            console.log(userData.emailId);
            const result = await shwiftRepo.getApplicationsByEmail(userData);
            if(result) {
                console.log(`getApplicationsByEmail successful`);
                response.status(200).send(result);
            } else {
                console.error(`getApplicationsByEmail failed  - ${JSON.stringify(request.body)}`);
                response.status(400).send({
                    type: 'BAD_REQUEST',
                    message: 'Request failed before completion',
                    details: 'Invalid Input request'
                });
            }
        }
    } catch(error) {
        console.log(`getApplicationsByEmail failed - ${JSON.stringify(error)}`);
        response.status(500).send(error);
    }
    
}

export const fetchAllEmployerInfo = async (request, response) => {
    try{
        if(request.body && typeof request.body === ('object')) {
            const shwiftRepo = new ShwiftRepository();
            const {emailId} = request.body;
            console.log(emailId);
            const result = await shwiftRepo.fetchAllEmployerInfo(emailId);
            if(result) {
                console.log(`fetchAllEmployerInfo successfully`);
                response.status(200).send(result);
            } else {
                console.error(`fetchAllEmployerInfo failed  - ${JSON.stringify(request.body)}`);
                response.status(400).send({
                    type: 'BAD_REQUEST',
                    message: 'Request failed before completion',
                    details: 'Invalid Input request'
                });
            }
        }
    } catch(error) {
        console.log(`fetchAllEmployerInfo failed - ${JSON.stringify(error)}`);
        response.status(500).send(error);
    }
    
}

export const updateEmployerInfo = async (request, response) => {
    try{
        if(request.body && typeof request.body === ('object')) {
            const shwiftRepo = new ShwiftRepository();
            const emailId = request.body.emailId;
            const col_name = request.body.col_name;
            const value = request.body.value;
            console.log(emailId);
            console.log(col_name);
            console.log(value);
            const result = await shwiftRepo.updateEmployerInfo(emailId,col_name,value);
            if(result) {
                console.log(`updateEmployerInfo successfully`);
                response.status(200).send(result);
            } else {
                console.error(`updateEmployerInfo failed  - ${JSON.stringify(request.body)}`);
                response.status(400).send({
                    type: 'BAD_REQUEST',
                    message: 'Request failed before completion',
                    details: 'Invalid Input request'
                });
            }
        }
    } catch(error) {
        console.log(`updateEmployerInfo failed - ${JSON.stringify(error)}`);
        response.status(500).send(error);
    }
    
}

export const fetchAllApplicationsForSpecificEmployer = async (request, response) => {
    try{
        if(request.body && typeof request.body === ('object')) {
            const shwiftRepo = new ShwiftRepository();
            const userData = request.body;
            console.log(userData.emailId);
            const result = await shwiftRepo.fetchAllApplicationsForSpecificEmployer(userData);
            if(result) {
                console.log(`fetchAllApplicationsForSpecificEmployer successfully`);
                response.status(200).send(result);
            } else {
                console.error(`fetchAllApplicationsForSpecificEmployer failed  - ${JSON.stringify(request.body)}`);
                response.status(400).send({
                    type: 'BAD_REQUEST',
                    message: 'Request failed before completion',
                    details: 'Invalid Input request'
                });
            }
        }
    } catch(error) {
        console.log(`fetchAllApplicationsForSpecificEmployer failed - ${JSON.stringify(error)}`);
        response.status(500).send(error);
    }
    
}

export const getRecommendedJobs = async (request, response) => {
    try{
        if(request.body && typeof request.body === ('object')) {
            const shwiftRepo = new ShwiftRepository();
            const {emailId} = request.body;
            console.log(emailId);
            const result = await shwiftRepo.getRecommendedJobs(emailId);
            if(result) {
                console.log(`getRecommendedJobs successful`);
                response.status(200).send(result);
            } else {
                console.error(`getRecommendedJobs failed  - ${JSON.stringify(request.body)}`);
                response.status(400).send({
                    type: 'BAD_REQUEST',
                    message: 'Request failed before completion',
                    details: 'Invalid Input request'
                });
            }
        }
    } catch(error) {
        console.log(`getRecommendedJobs failed - ${JSON.stringify(error)}`);
        response.status(500).send(error);
    }
}

export const uploadImage = async (request, response) => {
    try{
        if(request.body && typeof request.body === ('object')) {
            const shwiftRepo = new ShwiftRepository();
            const {base64Image} = request.body;
            const applicantId = uuid();
            const result = await shwiftRepo.uploadImage(applicantId, base64Image);
            if(result) {
                console.log(`uploadImage successful`);
                response.status(200).send(result);
            } else {
                console.error(`uploadImage failed  - ${JSON.stringify(request.body)}`);
                response.status(400).send({
                    type: 'BAD_REQUEST',
                    message: 'Request failed before completion',
                    details: 'Invalid Input request'
                });
            }
        }
    } catch(error) {
        console.log(`uploadImage failed - ${JSON.stringify(error)}`);
        response.status(500).send(error);
    }
    
}

export const uploadPdf = async (request, response) => {
    try{
        if(request.body && typeof request.body === ('object')) {
            const shwiftRepo = new ShwiftRepository();
            const {base64Pdf} = request.body;
            const applicantId = uuid();
            const result = await shwiftRepo.uploadPdf(applicantId, base64Pdf);
            if(result) {
                console.log(`uploadPdf successful`);
                response.status(200).send(result);
            } else {
                console.error(`uploadPdf failed  - ${JSON.stringify(request.body)}`);
                response.status(400).send({
                    type: 'BAD_REQUEST',
                    message: 'Request failed before completion',
                    details: 'Invalid Input request'
                });
            }
        }
    } catch(error) {
        console.log(`uploadPdf failed - ${JSON.stringify(error)}`);
        response.status(500).send(error);
    }
    
}

export const updateApplicationStatus = async (request, response) => {
    try{
        if(request.body && typeof request.body === ('object')) {
            const shwiftRepo = new ShwiftRepository();
            const recruiter_emailId = request.body.recruiter_emailId;
            const employee_emailId = request.body.employee_emailId;
            const jobId = request.body.jobId;
            const appStatus = request.body.appStatus;
            const result = await shwiftRepo.updateApplicationStatus(recruiter_emailId,employee_emailId,jobId,appStatus);
            if(result) {
                console.log(`updateApplicationStatus successfully`);
                response.status(200).send(result);
            } else {
                console.error(`updateApplicationStatus failed  - ${JSON.stringify(request.body)}`);
                response.status(400).send({
                    type: 'BAD_REQUEST',
                    message: 'Request failed before completion',
                    details: 'Invalid Input request'
                });
            }
        }
    } catch(error) {
        console.log(`updateApplicationStatus failed - ${JSON.stringify(error)}`);
        response.status(500).send(error);
    }
    
}
