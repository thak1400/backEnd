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