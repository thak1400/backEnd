import { dbSetup } from "../dbConnection/dbSetup.js";

export class ShwiftRepository {
    async addListing(jobId, listingData) {
        const connection = await dbSetup();
        try{
            const insertListing = `INSERT into shwift.employerlisting (job_id, job_title, job_desc, job_req, job_priority, pay_scale, num_hours, job_location, position_type, position_start_date, application_deadline, recruiter_name, job_saved,position_onsite,recruiter_email_id) 
                                VALUES ('${jobId}', '${listingData.jobTitle}', '${listingData.jobDescription}', '${listingData.jobRequirement}', '${listingData.jobPriority}', '${listingData.payScale}', '${listingData.numHours}', '${listingData.jobLocation}', '${listingData.positionType}', '${listingData.startDate}', '${listingData.appDeadline}', '${listingData.recruiterName}','false','${listingData.positionOnsite}','${listingData.recruiterEmail}') returning *;`;
                                console.log(insertListing);
            const dbResultInsertListing = await connection.dbClient.query(insertListing);
            // console.log(insertListing);
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

    async newApplication(applicationId, applicationData,currentDate) {
        const connection = await dbSetup();
        try{
            console.log(applicationId); 
            const insertApplication = `INSERT into shwift.myapplications (applicant_email_id, application_id, app_date, application_status, job_id, resume_url, employer_email_id)
            values ('${applicationData.applicantEmailId}','${applicationId}','${currentDate}','${applicationData.applicationStatus}','${applicationData.jobId}','${applicationData.resumeUrl}','${applicationData.employerEmailId}') RETURNING *;`;
            console.log(insertApplication);
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

    async updateListing(jobId,listingData) {
        const connection = await dbSetup();
        try{ 
            const updateListing = `UPDATE shwift.employerlisting SET job_title='${listingData.jobTitle}', job_desc='${listingData.jobDescription}', job_req='${listingData.jobRequirement}', job_priority='${listingData.jobPriority}', pay_scale='${listingData.payScale}', num_hours='${listingData.numHours}', job_location='${listingData.jobLocation}', position_type='${listingData.positionType}', position_start_date='${listingData.startDate}', application_deadline='${listingData.appDeadline}', recruiter_name='${listingData.recruiterName}' 
            WHERE job_id='${jobId}' returning *;`;
            console.log(updateListing);
            const dbResultUpdateListing = await connection.dbClient.query(updateListing);
            if(dbResultUpdateListing.rowCount){
                return dbResultUpdateListing.rows[0];
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


    async updatePswd(emailId,userData) {
        const connection = await dbSetup();
        try{ 
            console.log(emailId);
            console.log(userData);
            const updatePswd = `UPDATE shwift.userinfo SET first_name='${userData.firstName}', last_name='${userData.lastName}', pswd='${userData.pSWD}', acc_type='${userData.accType}', phone_num='${userData.phoneNum}'
            WHERE email_id='${userData.emailId}' returning *;`;
            console.log(updatePswd);
            const dbResultResetPwd = await connection.dbClient.query(updatePswd);
            if(dbResultResetPwd.rowCount){
                return dbResultResetPwd.rows[0];
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

    async login(emailId,password) {
        const connection = await dbSetup();
        try{ 
            let login = `SELECT * FROM shwift.userinfo where email_id='${emailId}' and pswd='${password}' `;
            // console.log(emailId);
            console.log(login);
            const dbResultLogin = await connection.dbClient.query(login);
            if(dbResultLogin.rowCount){
                return dbResultLogin.rows[0];
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

    async saveJob(emailId,jobId) {
        const connection = await dbSetup();
        try{
            const check = `SELECT * FROM shwift.saved_jobs WHERE email_id = '${emailId}' AND job_id = '${jobId}';`;
            const dbResultCheckSaved = await connection.dbClient.query(check);
            if(dbResultCheckSaved.rowCount){
                throw Error('Transaction Failed');
            } else {
                const saveJobInDB = `INSERT into shwift.saved_jobs (email_id,job_id) 
                values ('${emailId}','${jobId}') RETURNING *;`;
                console.log(saveJobInDB);
                const dbResultSavedJob = await connection.dbClient.query(saveJobInDB);
                if(dbResultSavedJob.rowCount){
                    return dbResultSavedJob.rows[0];
                } else {
                    throw Error('Transaction Failed');
                }
            }
        } catch(error) {
            if(error){
                throw new Error(error.message);
            }
        } finally {
            connection.dbClient.release();
        }
    }

    async deleteSavedJob(emailId,jobId) {
        const connection = await dbSetup();
        try{ 
            let deleteQuery = `DELETE FROM shwift.saved_jobs WHERE email_id = '${emailId}' AND job_id = '${jobId}'`;
            console.log(deleteQuery);
            const dbResultDeletedJob = await connection.dbClient.query(deleteQuery);
            if(dbResultDeletedJob.rowCount){
                return "Deleted successfully";
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
    async fetchSavedJobs(emailId,jobId) {
        const connection = await dbSetup();
        try{ 
            let fetchSavedJobs = `SELECT * FROM shwift.saved_jobs where email_id='${emailId}' and job_id='${jobId}' `;
            console.log(emailId);
            console.log(fetchSavedJobs);
            const dbfetchSavedJobs = await connection.dbClient.query(fetchSavedJobs);
            if(dbfetchSavedJobs.rowCount){
                return dbfetchSavedJobs.rows[0];
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

    async fetchSpecificListing(emailId) {
    const connection = await dbSetup();
    try{
        const fetchSpecificListing = `SELECT * FROM shwift.employerlisting;`;
        const dbGetAllListings = await connection.dbClient.query(fetchSpecificListing);
        if(dbGetAllListings.rowCount){
            
            for(let i=0;i<dbGetAllListings.rowCount;i++)
            {
                const currJobId=dbGetAllListings.rows[i].job_id;
                console.log(currJobId);
                const fetchFromSavedJobsTbl=`SELECT * FROM shwift.saved_jobs where email_id='${emailId}' and job_id='${currJobId}' `;
                console.log(fetchFromSavedJobsTbl);
                const dbfetchFromSavedJobsTbl = await connection.dbClient.query(fetchFromSavedJobsTbl);
                console.log(dbfetchFromSavedJobsTbl.rowCount);
                if(dbfetchFromSavedJobsTbl.rowCount)
                {
                    dbGetAllListings.rows[i].job_saved=true;
                }
                else{
                    dbGetAllListings.rows[i].job_saved=false;
                }
            }
            // console.log(dbResultGetSpecificListing.rows);    
            return dbGetAllListings.rows;
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

async signUp(serialNum,userData) {
    const connection = await dbSetup();
    try{
        const signUp = `INSERT into shwift.userinfo (first_name,last_name,email_id,pswd,acc_type,phone_num) 
        values ('${userData.firstName}','${userData.lastName}','${userData.emailId}','${userData.pSWD}','${userData.accType}','${userData.phoneNum}') RETURNING *;`;
        const dbResultNewAccount = await connection.dbClient.query(signUp);
        if(dbResultNewAccount.rowCount){
            
            if(dbResultNewAccount.rows[0].acc_type.toLowerCase()==="employee")
            {
                const signUpInfo=`INSERT into shwift.employeeinfo (first_name,last_name,employee_id,curr_employment_status,employee_gender,employee_dob,emp_expertise,rating,employee_dp,curr_position,emp_summary,emp_projects,emp_skills,emp_workex,emp_education,serial_num)
                values ('${dbResultNewAccount.rows[0].first_name}','${dbResultNewAccount.rows[0].last_name}','${dbResultNewAccount.rows[0].email_id}','','','','',0,'${userData.profileDp}','','','','','','','${serialNum}') RETURNING *;`;
                console.log(signUpInfo);
                const dbsignUpInfo=await connection.dbClient.query(signUpInfo);
            }
            else
            {
                const signUpInfo=`INSERT into shwift.employerinfo (org_name,org_type,org_num,org_desc,recruiter_mail,num_of_lisitings,rating,employer_dp,org_id)
                values ('${userData.orgName}', '', '${userData.orgNum}', '${userData.orgDescription}', '${userData.emailId}', '', 0, '${userData.profileDp}', '${serialNum}') RETURNING *;`;
                console.log(signUpInfo);
                const dbsignUpInfo=await connection.dbClient.query(signUpInfo);
            }
            return dbResultNewAccount.rows[0];
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

async fetchAllEmployeeInfo(emailId) {
    const connection = await dbSetup();
    try{
        const fetchAllEmployeeInfo = `SELECT * from shwift.employeeinfo where employee_id='${emailId}' ;`;
        console.log(fetchAllEmployeeInfo);
        const dbfetchAllEmployeeInfo = await connection.dbClient.query(fetchAllEmployeeInfo);
        if(dbfetchAllEmployeeInfo.rowCount){
            return dbfetchAllEmployeeInfo.rows[0];
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

async updateEmployeeInfo(emailId,key,value) {
    const connection = await dbSetup();
    try{
        const updateEmployeeInfo = `UPDATE shwift.employeeinfo SET ${key}='${value}' WHERE employee_id='${emailId}' returning *;`;
        console.log(updateEmployeeInfo);
        const dbupdateEmployeeInfo = await connection.dbClient.query(updateEmployeeInfo);
        if(dbupdateEmployeeInfo.rowCount){
            return dbupdateEmployeeInfo.rows[0];
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

async getSavedJobs(emailId) {
    const connection = await dbSetup();
    try{
        const getAllSavedJobs = `SELECT emp.* FROM shwift.employerlisting emp INNER JOIN shwift.saved_jobs jobs ON emp.job_id = jobs.job_id WHERE jobs.email_id = '${emailId}';`;
        console.log(getAllSavedJobs);
        const dbgetAllSavedJobs = await connection.dbClient.query(getAllSavedJobs);
        if(dbgetAllSavedJobs.rowCount){
            dbgetAllSavedJobs.rows.forEach(element => {
                element.job_saved = true;
            });
            return dbgetAllSavedJobs.rows;
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

async getApplicationsByEmail(emailId) {
    const connection = await dbSetup();
    try{
        const getApplicationsByEmail = `SELECT emp.*, apps.app_date, apps.application_status FROM shwift.employerlisting emp INNER JOIN shwift.myapplications apps ON emp.job_id = apps.job_id WHERE apps.applicant_email_id = '${emailId}' ;`;
        console.log(getApplicationsByEmail);
        const dbgetApplicationsByEmail = await connection.dbClient.query(getApplicationsByEmail);
        if(dbgetApplicationsByEmail.rowCount){
            return dbgetApplicationsByEmail.rows;
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



