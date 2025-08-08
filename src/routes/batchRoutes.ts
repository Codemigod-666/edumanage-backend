import express from "express";
import {
  addBatch,
  deleteBatch,
  getAllBatches,
  getBatchDetails,
  updateBatchData,
} from "../controllers/batchController";

const batchRouter = express.Router();

batchRouter.route("/get-all-batches").get(getAllBatches);
batchRouter.route("/get-batch").post(getBatchDetails);
batchRouter.route("/add-batch").post(addBatch);
batchRouter.route("/update-batch/:_id").put(updateBatchData);
batchRouter.route("/delete-batch/:_id").delete(deleteBatch);

export default batchRouter;
