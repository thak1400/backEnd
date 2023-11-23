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

    async removeListing(jobId) {
        const connection = await dbSetup();
        try{
            console.log(jobId); 
            const deleteListing = `DELETE from shwift.employerlisting WHERE job_id='${jobId}' RETURNING *;`;
            const dbResultDeletetListing = await connection.dbClient.query(deleteListing);
            if(dbResultDeletetListing.rowCount){
                return dbResultDeletetListing.rows[0];
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

    async fetchListing() {
        const connection = await dbSetup();
        try{
            const getListing = `SELECT * FROM shwift.employerlisting;`;
            const dbResultGetListing = await connection.dbClient.query(getListing);
            if(dbResultGetListing.rowCount){
                return dbResultGetListing.rows;
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

    async newApplication(applicationId, applicationData) {
        const connection = await dbSetup();
        try{
            console.log(applicationId); 
            const insertApplication = `INSERT into shwift.myapplications (applicant_id,application_id,job_title,org_name,app_date,application_status,job_id) 
            values ('${applicationData.applicantID}','${applicationId}','${applicationData.jobTitle}','${applicationData.orgName}','${applicationData.applicationDate}','${applicationData.applicationStatus}','${applicationData.jobId}') RETURNING *;`;
            const dbResultInsertApplication = await connection.dbClient.query(insertApplication);
            if(dbResultInsertApplication.rowCount){
                return dbResultInsertApplication.rows[0];
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

    async updateApplication(applicationId,applicationData) {
        const connection = await dbSetup();
        try{
            console.log(applicationId); 
            const updateApplication = `UPDATE  shwift.myapplications SET applicant_id='${applicationData.applicantID}', job_title='${applicationData.jobTitle}', org_name='${applicationData.orgName}', app_date='${applicationData.applicationDate}', application_status='${applicationData.applicationStatus}', job_id='${applicationData.jobId}'
            WHERE  application_id='${applicationId}' RETURNING *;`;
            // console.log(updateApplication);
            const dbResultUpdateApplication = await connection.dbClient.query(updateApplication);
            if(dbResultUpdateApplication.rowCount){
                return dbResultUpdateApplication.rows[0];
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
    
    async fetchApplication(orgName, jobId) {
        const connection = await dbSetup();
        try{
            let getApp = `SELECT * FROM shwift.myapplications where org_name = '${orgName}'`;
            if(jobId) {
                getApp += ` and job_id = '${jobId}'`;
            }
            getApp += `;`;
            const dbResultGetApp = await connection.dbClient.query(getApp);
            if(dbResultGetApp.rowCount){
                return dbResultGetApp.rows;
            } else {
                return [];
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