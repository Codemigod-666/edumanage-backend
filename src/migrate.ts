import mongoose from "mongoose";
import connectDb from "./database";
import { StudentModel } from "./database/models/Student";

async function migrateStudents() {
  try {
    // await mongoose.connect("mongodb://localhost:27017/your-db-name");
    await connectDb();
    console.log("Connected to MongoDB ✅");

    // ✅ Example 1: Add field 'isActive' if not exists
    const updateResult1 = await StudentModel.updateMany(
      { isActive: { $exists: false } },
      { $set: { isActive: true } }
    );
    console.log(
      `Updated ${updateResult1.modifiedCount} documents with isActive.`
    );

    // ✅ Example 2: Rename field 'oldField' to 'newField'
    const updateResult2 = await StudentModel.updateMany(
      { oldField: { $exists: true } },
      [{ $set: { newField: "$oldField" } }, { $unset: "oldField" }]
    );
    console.log(`Renamed field in ${updateResult2.modifiedCount} documents.`);

    // ✅ Example 3: Remove unnecessary field
    const updateResult3 = await StudentModel.updateMany(
      { unwantedField: { $exists: true } },
      { $unset: { unwantedField: "" } }
    );
    console.log(
      `Removed unwantedField from ${updateResult3.modifiedCount} documents.`
    );

    console.log("Migration completed ✅");
  } catch (err) {
    console.error("Migration failed ❌", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB ✅");
  }
}

migrateStudents();
