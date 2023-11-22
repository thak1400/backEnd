import { dbSetup } from "../dbConnection/dbSetup.js";

export class ShwiftRepository {
    async addListing(jobId, listingData) {
        const connection = await dbSetup();
        try{
            const insertListing = `INSERT into shwift.employerlisting (job_id, job_title, job_desc, job_req, job_priority, pay_scale, num_hours, job_location, position_type, position_start_date, application_deadline, recruiter_name) 
                                VALUES ('${jobId}', '${listingData.jobTitle}', '${listingData.jobDescription}', '${listingData.jobRequirement}', '${listingData.jobPriority}', '${listingData.payScale}', '${listingData.numHours}', '${listingData.jobLocation}', '${listingData.positionType}', '${listingData.startDate}', '${listingData.appDeadline}', '${listingData.recruiterName}') returning *;`;
            const dbResultInsertListing = await connection.dbClient.query(insertListing);
            if(dbResultInsertListing.rowCount){
                return dbResultInsertListing.rows[0];
            } else {
                throw Error('Transaction Failed');
            }
        } catch(error) {
            if(error){
                throw new Error(error.message);
            }
        } finally {
            connection.dbClient.release();
        }
    }
}