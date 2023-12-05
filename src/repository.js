import { dbSetup } from "../dbConnection/dbSetup.js";
import AWS from 'aws-sdk';
import imageType from 'image-type';
import moment from 'moment';

AWS.config.update({
    secretAccessKey: 'tyPKZeASFS5hE7VaACQlBFmWGolruWK55YzCTWYy',
    accessKeyId: 'AKIA6QZAOWCY2QZOTMV6',
    region: 'us-east-2'
});

export class ShwiftRepository {
    async addListing(jobId, listingData) {
        const connection = await dbSetup();
        try{
            const currentTime = moment().format();
            console.log(currentTime);
            const insertListing = `INSERT into shwift.employerlisting (job_id, job_title, job_desc, job_req, job_priority, pay_scale, num_hours, job_location, position_type, position_start_date, application_deadline, recruiter_name, job_saved,position_onsite,recruiter_email_id, created_at) 
                                VALUES ('${jobId}', '${listingData.jobTitle}', '${listingData.jobDescription}', '${listingData.jobRequirement}', '${listingData.jobPriority}', '${listingData.payScale}', '${listingData.numHours}', '${listingData.jobLocation}', '${listingData.positionType}', '${listingData.startDate}', '${listingData.appDeadline}', '${listingData.recruiterName}','false','${listingData.positionOnsite}','${listingData.recruiterEmail}','${currentTime}') returning *;`;
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
            const getListing = `SELECT emplist.*, empinfo.employer_dp FROM shwift.employerlisting emplist INNER JOIN shwift.employerinfo empinfo on emplist.recruiter_email_id=empinfo.recruiter_mail ORDER BY emplist.created_at DESC;`;
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

    async fetchListingByEmployerEmail(emailId) {
        const connection = await dbSetup();
        try{
            const getListing = `SELECT emplist.*, empinfo.employer_dp FROM shwift.employerlisting emplist Inner Join shwift.employerinfo empinfo ON emplist.recruiter_email_id = empinfo.recruiter_mail where recruiter_email_id = '${emailId}' ORDER BY emplist.created_at DESC;`;
            console.log(getListing);
            const dbResultGetListing = await connection.dbClient.query(getListing);
            if(dbResultGetListing.rowCount){
                return dbResultGetListing.rows;
            } else {
                return []
            }
        } catch(error) {
            if(error){
                console.log(error.message);
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
            let getApp = `SELECT app.*, emp.employee_dp FROM shwift.myapplications app Inner Join shwift.employeeinfo emp ON app.applicant_email_id = emp.employee_id where org_name = '${orgName}'`;
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
                let res = dbResultLogin.rows[0];
                let infoQuery = ``;
                if(res.acc_type == "employer"){
                    infoQuery = `Select employer_dp as user_dp from shwift.employerinfo where recruiter_mail = '${emailId}';`;
                } else {
                    infoQuery = `Select employee_dp as user_dp from shwift.employeeinfo where employee_id = '${emailId}';`;
                }
                const dbResultDp = await connection.dbClient.query(infoQuery);
                if(dbResultDp.rowCount) {
                    res.user_dp = dbResultDp.rows[0].user_dp;
                }
                return res;
            } else {
                throw Error('No such User Exists.');
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
            console.log(check);
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
            let fetchSavedJobs = `SELECT savedjobs.*,empinfo.employer_dp FROM shwift.saved_jobs savedjobs INNER JOIN shwift.employerinfo empinfo on savedjobs.email_id=empinfo.recruiter_mail where email_id='${emailId}' and job_id='${jobId}' `;
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

    async fetchSpecificListing(userData) {
    const connection = await dbSetup();
    try{
        const fetchSpecificListing = `SELECT emplist.*, empinfo.employer_dp FROM shwift.employerlisting emplist INNER JOIN shwift.employerinfo empinfo on emplist.recruiter_email_id=empinfo.recruiter_mail ORDER BY emplist.created_at DESC;`;
        console.log(fetchSpecificListing);
        const dbGetAllListings = await connection.dbClient.query(fetchSpecificListing);
        var jobs = [];
        var search = userData.searchText.toLowerCase();
        if(dbGetAllListings.rowCount){
            for(let i=0;i<dbGetAllListings.rowCount;i++)
            {
                const currJobId=dbGetAllListings.rows[i].job_id;
                // console.log(currJobId);
                const fetchFromSavedJobsTbl=`SELECT * FROM shwift.saved_jobs where email_id='${userData.emailId}' and job_id='${currJobId}'; `;
                // console.log(fetchFromSavedJobsTbl);
                const dbfetchFromSavedJobsTbl = await connection.dbClient.query(fetchFromSavedJobsTbl);
                // console.log(dbfetchFromSavedJobsTbl.rowCount);
                if(dbfetchFromSavedJobsTbl.rowCount)
                {   
                    dbGetAllListings.rows[i].job_saved=true;
                }
                else{
                    dbGetAllListings.rows[i].job_saved=false;
                }
            }
            for(let j=0;j<dbGetAllListings.rowCount;j++)
            {
                const currRecruiter=dbGetAllListings.rows[j].recruiter_email_id;
                // console.log(currRecruiter);
                const fetchFromEmployerInfoTbl=`SELECT * FROM shwift.employerinfo where recruiter_mail='${currRecruiter}'; `;
                // console.log(fetchFromEmployerInfoTbl);
                const dbfetchFromEmployerInfoTbl = await connection.dbClient.query(fetchFromEmployerInfoTbl);
                if(dbfetchFromEmployerInfoTbl.rowCount)
                {
                    // console.log(dbfetchFromEmployerInfoTbl.rows[j].org_name);
                    dbGetAllListings.rows[j].recruiter_name = dbfetchFromEmployerInfoTbl.rows[0].org_name;                    
                }
                // console.log(dbfetchFromEmployerInfoTbl.rows[j]);
            }
            // console.log(dbResultGetSpecificListing.rows);  
            dbGetAllListings.rows.forEach(element => {
                if (element.job_title.toLowerCase().indexOf(search) !== -1) {
                    jobs.push(element);
                } else if (element.recruiter_name.toLowerCase().indexOf(search) !== -1) {
                    jobs.push(element);
                } 
            });  
            return jobs;
        } else {
            return jobs;
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
                const signUpInfo=`INSERT into shwift.employeeinfo (first_name,last_name,employee_id,curr_employment_status,employee_gender,employee_dob,emp_expertise,rating,employee_dp,curr_position,emp_summary,emp_projects,emp_skills,emp_workex,emp_education,serial_num, availability)
                values ('${dbResultNewAccount.rows[0].first_name}','${dbResultNewAccount.rows[0].last_name}','${dbResultNewAccount.rows[0].email_id}','','','','',0,'${userData.profileDp}','','','','','','','${serialNum}','${userData.availability}') RETURNING *;`;
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
        const fetchAllEmployeeInfo = `SELECT u.email_id, u.phone_num, emp.* from shwift.userinfo u, shwift.employeeinfo emp where employee_id='${emailId}' and u.email_id = emp.employee_id ;`;
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

async getSavedJobs(userData) {
    const connection = await dbSetup();
    try{
        var savedJobs = [];
        var search = userData.searchText.toLowerCase();
        const getAllSavedJobs = `SELECT emp.*, info.employer_dp FROM shwift.employerlisting emp, shwift.saved_jobs jobs, shwift.employerinfo info WHERE jobs.email_id = '${userData.emailId}' AND emp.job_id = jobs.job_id AND emp.recruiter_email_id = info.recruiter_mail ORDER BY emp.created_at DESC;`;
        console.log(getAllSavedJobs);
        const dbgetAllSavedJobs = await connection.dbClient.query(getAllSavedJobs);
        if(dbgetAllSavedJobs.rowCount){
            for (var element of dbgetAllSavedJobs.rows) {
                element.job_saved = true;
                const fetchFromEmployerInfoTbl=`SELECT * FROM shwift.employerinfo where recruiter_mail='${element.recruiter_email_id}'; `;
                const dbfetchFromEmployerInfoTbl = await connection.dbClient.query(fetchFromEmployerInfoTbl);
                if(dbfetchFromEmployerInfoTbl.rowCount)
                {
                    element.recruiter_name = dbfetchFromEmployerInfoTbl.rows[0].org_name;                    
                }
                if (element.job_title.toLowerCase().indexOf(search) !== -1) {
                    savedJobs.push(element);
                } else if (element.recruiter_name.toLowerCase().indexOf(search) !== -1) {
                    savedJobs.push(element);
                } 
            }
            return savedJobs;
        } else {
            return savedJobs;
        }
    } catch(error) {
        if(error){
            throw new Error(error.message);
        }
    } finally {
        connection.dbClient.release();
    }
}

async getApplicationsByEmail(userData) {
    const connection = await dbSetup();
    try{
        var applications = [];
        var search = userData.searchText.toLowerCase();
        // const getApplicationsByEmail = `SELECT emp.*, apps.app_date, apps.application_status FROM shwift.employerlisting emp INNER JOIN shwift.myapplications apps ON emp.job_id = apps.job_id WHERE apps.applicant_email_id = '${emailId}' ;`;
        const getApplicationsByEmail = `SELECT emp.*, apps.app_date, apps.application_status, info.employer_dp, info.org_name FROM shwift.employerlisting emp, shwift.myapplications apps, shwift.employerinfo info WHERE apps.applicant_email_id = '${userData.emailId}' AND emp.job_id = apps.job_id AND emp.recruiter_email_id = info.recruiter_mail ORDER BY emp.created_at DESC;`;
        console.log(getApplicationsByEmail);
        const dbgetApplicationsByEmail = await connection.dbClient.query(getApplicationsByEmail);
        if(dbgetApplicationsByEmail.rowCount){
            for (var element of dbgetApplicationsByEmail.rows) {
                if (element.job_title.toLowerCase().indexOf(search) !== -1) {
                    applications.push(element);
                } else if (element.org_name.toLowerCase().indexOf(search) !== -1) {
                    applications.push(element);
                } 
            }
            return applications;
        } else {
            return applications;
        }
    } catch(error) {
        if(error){
            throw new Error(error.message);
        }
    } finally {
        connection.dbClient.release();
    }
}

async fetchAllEmployerInfo(emailId) {
    const connection = await dbSetup();
    try{
        const fetchAllEmployerInfo = `SELECT * from shwift.employerinfo where recruiter_mail='${emailId}' ;`;
        console.log(fetchAllEmployerInfo);
        const dbfetchAllEmployerInfo = await connection.dbClient.query(fetchAllEmployerInfo);
        if(dbfetchAllEmployerInfo.rowCount){
            return dbfetchAllEmployerInfo.rows[0];
        } else {
            // throw Error('Transaction Failed');
            return [];
        }
    } catch(error) {
        if(error){
            console.log(error.message);
            throw new Error(error.message);
        }
    } finally {
        connection.dbClient.release();
    }
}

async updateEmployerInfo(emailId,key,value) {
    const connection = await dbSetup();
    try{
        const updateEmployerInfo = `UPDATE shwift.employerinfo SET ${key}='${value}' WHERE recruiter_mail='${emailId}' returning *;`;
        console.log(updateEmployerInfo);
        const dbupdateEmployerInfo = await connection.dbClient.query(updateEmployerInfo);
        if(dbupdateEmployerInfo.rowCount){
            return dbupdateEmployerInfo.rows[0];
        } else {
            // throw Error('Transaction Failed');
            return [];
        }
    } catch(error) {
        if(error){
            console.log(error.message);
            throw new Error(error.message);
        }
    } finally {
        connection.dbClient.release();
    }
}

async fetchAllApplicationsForSpecificEmployer(emailId) {
    const connection = await dbSetup();
    try{
        var applications = [];
        var search = userData.searchText.toLowerCase();
        const fetchAllApplicationsForSpecificEmployer = `SELECT u.first_name, u.last_name, u.email_id, u.phone_num, emp.employee_dp, job.job_title, emp.availability, job.job_id, apps.resume_url
        from shwift.myapplications apps, shwift.userinfo u, shwift.employerlisting job, shwift.employeeinfo emp 
        where apps.employer_email_id ='${emailId}' AND apps.applicant_email_id = u.email_id AND apps.job_id = job.job_id AND u.email_id = emp.employee_id ORDER BY job.created_at DESC;`;
        console.log(fetchAllApplicationsForSpecificEmployer);
        const dbfetchAllApplicationsForSpecificEmployer = await connection.dbClient.query(fetchAllApplicationsForSpecificEmployer);
        if(dbfetchAllApplicationsForSpecificEmployer.rowCount){
            for (var element of dbfetchAllApplicationsForSpecificEmployer.rows) {
                if (element.job_title.toLowerCase().indexOf(search) !== -1) {
                    applications.push(element);
                } else if (element.first_name.toLowerCase().indexOf(search) !== -1) {
                    applications.push(element);
                } else if (element.last_name.toLowerCase().indexOf(search) !== -1) {
                    applications.push(element);
                } 
            }
            return applications;
        } else {
            return applications;
        }
    } catch(error) {
        if(error){
            console.log(error.message);
            throw new Error(error.message);
        }
    } finally {
        connection.dbClient.release();
    }
}

async getRecommendedJobs(emailId) {
    const connection = await dbSetup();
    try{
        const getUserSkills = `SELECT emp_skills FROM shwift.employeeinfo WHERE employee_id = '${emailId}'`;
        console.log(getUserSkills);
        const dbgetUserSkills = await connection.dbClient.query(getUserSkills);
        var recommendedJobs = [];
        if(dbgetUserSkills.rowCount){
            const userSkills = dbgetUserSkills.rows[0].emp_skills;
            let userSkillsList = userSkills.split(",");
            userSkillsList = userSkillsList.toLocaleString().toLowerCase().split(',');
            const getAllListings = `SELECT emplist.*, empinfo.employer_dp FROM shwift.employerlisting emplist Inner Join shwift.employerinfo empinfo ON emplist.recruiter_email_id = empinfo.recruiter_mail ORDER BY emplist.created_at DESC;`;
            const dbGetAllListings = await connection.dbClient.query(getAllListings);
            if(dbGetAllListings.rowCount){
                dbGetAllListings.rows.forEach(element => {
                    const reqSkills = element.job_req;
                    console.log(reqSkills);
                    let skillsList = reqSkills.split(",");
                    skillsList = skillsList.toLocaleString().toLowerCase().split(',');
                    skillsList.forEach(e => {
                        if (userSkillsList.indexOf(e) !== -1) {
                            recommendedJobs.push(element);
                        }
                    });
                }); 
                return recommendedJobs;
            } else {
               return recommendedJobs;
            }
        } else {
            return recommendedJobs;
        }
    } catch(error) {
        if(error){
            throw new Error(error.message);
        }
    } finally {
        connection.dbClient.release();
    }
}

async uploadImage(applicantId, base64Data) {
    const connection = await dbSetup();
    try{
        let matches = base64Data.split(",");
        let buffer = new Buffer.from(matches[1], 'base64');
        const type = await imageType(buffer);
        const params = {
            Bucket: 'shwift-images',
            Key: `profile/${applicantId}`,
            Body: buffer,
            ContentType: type.mime,
            ACL: 'public-read'
        }
        const s3 = new AWS.S3();
        const imgData = await s3.upload(params).promise();
        setTimeout( () => {}, 1000);
        return imgData.Location;
    } catch(error) {
        console.log(error);
        if(error){
            throw new Error(error.message);
        }
    } finally {
        connection.dbClient.release();
    }
}

async uploadPdf(applicantId, base64Data) {
    const connection = await dbSetup();
    try{
        let matches = base64Data.split(",");
        let buffer = new Buffer.from(matches[1], 'base64');
        const type = await imageType(buffer);
        const params = {
            Bucket: 'shwift-images',
            Key: `pdf/${applicantId}.pdf`,
            Body: buffer,
            ContentType: type.mime,
            ACL: 'public-read'
        }
        const s3 = new AWS.S3();
        const imgData = await s3.upload(params).promise();
        setTimeout( () => {}, 1000);
        return imgData.Location;
    } catch(error) {
        console.log(error);
        if(error){
            throw new Error(error.message);
        }
    } finally {
        connection.dbClient.release();
    }
}

async updateApplicationStatus(recruiter_emailId,employee_emailId,jobId,appStatus) {
    const connection = await dbSetup();
    try{
        const updateApplicationStatus = `UPDATE shwift.myapplications SET application_status='${appStatus}' WHERE applicant_email_id='${employee_emailId}' and employer_email_id='${recruiter_emailId}' and job_id='${jobId}' returning *;`;
        console.log(updateApplicationStatus);
        const dbupdateApplicationStatus = await connection.dbClient.query(updateApplicationStatus);
        if(dbupdateApplicationStatus.rowCount){
            return dbupdateApplicationStatus.rows[0];
        } else {
            return [];
        }
    } catch(error) {
        if(error){
            console.log(error.message);
            throw new Error(error.message);
        }
    } finally {
        connection.dbClient.release();
    }
}

}



