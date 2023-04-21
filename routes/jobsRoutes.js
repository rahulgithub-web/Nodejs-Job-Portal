import express from "express";
import {
  createJobController,
  deleteJobController,
  getAllJobsController,
  jobStatsController,
  updateJobController,
} from "../controllers/jobsController.js";
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

//routes

/**
 * @swagger
 * components:
 *  schemas:
 *    Job:
 *      type: object
 *      required:
 *        - company
 *        - position
 *        - workLocation
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto-generated ID of the job posting.
 *          example: 61416a291f904a26ccfe7e4f
 *        company:
 *          type: string
 *          description: The name of the company posting the job.
 *          example: Acme Inc.
 *        position:
 *          type: string
 *          description: The title of the job being posted.
 *          example: Software Engineer
 *        status:
 *          type: string
 *          enum: [pending, reject, interview]
 *          description: The current status of the job posting.
 *          example: pending
 *        workType:
 *          type: string
 *          enum: [full-time, part-time, internship, contract]
 *          description: The type of work associated with the job.
 *          example: full-time
 *        workLocation:
 *          type: string
 *          description: The location of the job.
 *          example: Mumbai
 *        createdBy:
 *          type: string
 *          description: The ID of the user who created the job posting.
 *          example: 614169ef1f904a26ccfe7e4d
 *      example:
 *        _id: 61416a291f904a26ccfe7e4f
 *        company: Acme Inc.
 *        position: Software Engineer
 *        status: pending
 *        workType: full-time
 *        workLocation: Mumbai
 *        createdBy: 614169ef1f904a26ccfe7e4d
 */

/**
 * @swagger
 * tags:
 *  name: Jobs
 *  description: APIs for managing job postings.
 */

/**
 * @swagger
 * /api/v1/jobs/create-job:
 *   post:
 *     summary: Create a new job posting.
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: The created job posting.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       500:
 *         description: Internal server error.
 */
//! ========> Create Jobs <=========
router.post("/create-job", userAuth, createJobController);

//! ========> Get Jobs <=========
/**
 * @swagger
 * /api/v1/jobs/get-job:
 *   get:
 *     summary: Get all jobs for a user.
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter jobs by status (e.g. "open", "closed", "in progress", etc.).
 *       - in: query
 *         name: workType
 *         schema:
 *           type: string
 *         description: Filter jobs by work type (e.g. "full-time", "part-time", "contract", etc.).
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search for jobs by position name.
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort jobs by latest, oldest, a-z, or z-a.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination (default is 1).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page (default is 10).
 *     responses:
 *       200:
 *         description: List of jobs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalJobs:
 *                   type: integer
 *                   description: Total number of jobs matching the filter criteria.
 *                 jobs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Job'
 *                   description: List of jobs matching the filter criteria.
 *                 numOfPage:
 *                   type: integer
 *                   description: Total number of pages based on the number of jobs and the limit.
 *       401:
 *         description: Unauthorized error.
 *       500:
 *         description: Internal server error.
*/
router.get("/get-job", userAuth, getAllJobsController);

//! ========> Update jobs <=========
/**
 * @swagger
 * /api/v1/jobs/update-job/{id}:
 *   patch:
 *     summary: Update a job posting by ID.
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the job posting to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       200:
 *         description: The updated job posting.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Job posting not found.
 *       500:
 *         description: Internal server error.
 */

router.patch("/update-job/:id", userAuth, updateJobController);

//! ========> Delete Jobs <=========
/**
 * @swagger
 * /api/v1/jobs/delete-job/{id}:
 *   delete:
 *     summary: Delete a job posting.
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the job to delete
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Success, Job Deleted!
 *       404:
 *         description: Job not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: No Job Found With This ID {id}
 *       401:
 *         description: Not authorized to delete the job
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Your Not Authorize to delete this job
 *       500:
 *         description: Internal server error.
 */

router.delete("/delete-job/:id", userAuth, deleteJobController);

//! ========> Get Job Stats <=========
/**
 * @swagger
 * /api/v1/jobs-stats:
 *   get:
 *     summary: Get job statistics for the authenticated user.
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Job statistics for the authenticated user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalJob:
 *                   type: integer
 *                 defaultStats:
 *                   type: object
 *                   properties:
 *                     pending:
 *                       type: integer
 *                     reject:
 *                       type: integer
 *                     interview:
 *                       type: integer
 *                 monthlyApplication:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                       count:
 *                         type: integer
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */

router.get("/job-stats", userAuth, jobStatsController);

export default router;