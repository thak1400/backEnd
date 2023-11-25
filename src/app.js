import { v4 as uuid } from 'uuid';
import { ShwiftRepository } from "./repository.js";

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
            const applicationData=request.body;
            const result = await shwiftRepo.newApplication(applicationId,applicationData);
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
            console.log(userData);
            const result = await shwiftRepo.signUp(userData);
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
            const {emailId}=request.body;
            // console.log(jobId);
            console.log("Calling fetchSpecificListing");
            const result = await shwiftRepo.fetchSpecificListing(emailId);
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
