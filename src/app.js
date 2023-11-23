import { v4 as uuid } from 'uuid';
import { ShwiftRepository } from "./repository.js";

export const createListing = async (request, response) => {
    try{
        if(request.body && typeof request.body === ('object')) {
            const shwiftRepo = new ShwiftRepository();
            const listingData = request.body;
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