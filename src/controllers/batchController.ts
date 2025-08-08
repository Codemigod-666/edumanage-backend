import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { BatchModel } from "../database/models/Batch";
import { User } from "../database/models/User";

export const getAllBatches = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { tuition_id } = req.query;
    if (!tuition_id || typeof tuition_id !== "string") {
      res
        .status(400)
        .json({ error: "tuidion_id is required as a query paramater" });
      return;
    }

    const batches = await BatchModel.find({ tuition_id });
    res.status(200).json({ data: batches });
  }
);

export const getBatchDetails = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    // fetch the data of particular batch
    const { _id } = req.params;
    const batch = await BatchModel.findOne({ _id });

    res.status(200).json({ data: batch });
  }
);

export const addBatch = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { tuition_id } = req.body;
    // check if tuition id exists in user collection
    const tuitionOwner = await User.findOne({ tuition_id });
    if (!tuitionOwner) {
      res
        .status(400)
        .json({ error: "Invalid tuition_id. No such tuition owner exists." });
      return;
    }

    // proceed to create the batch
    const batch = await BatchModel.create(req.body);
    res.status(201).json({ data: batch });
  }
);

export const updateBatchData = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { _id } = req.params;
    const data = req.body;

    // check if the batch exists
    const batchExists = await BatchModel.findOne({ _id });
    if (!batchExists) {
      res.status(400).json({ error: "Batch not found" });
      throw new Error("Batch not found");
    }

    const updatedBatch = await BatchModel.findOneAndUpdate(
      { _id },
      { $set: data },
      { new: true }
    );
    res.status(200).json({ data: updatedBatch });
  }
);

export const deleteBatch = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    // finod batch with particular id and delete
    const { _id } = req.params;
    const batchExists = await BatchModel.findOne({ _id });

    if (!batchExists) {
      res.sendStatus(400);
      throw new Error("Batch not found");
    }

    const deletedBatch = await BatchModel.findOneAndDelete({ _id });
    res.status(200).json({ data: deletedBatch });
  }
);
