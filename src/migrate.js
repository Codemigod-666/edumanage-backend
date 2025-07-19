"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = __importDefault(require("./database"));
const Student_1 = require("./database/models/Student");
function migrateStudents() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // await mongoose.connect("mongodb://localhost:27017/your-db-name");
            yield (0, database_1.default)();
            console.log("Connected to MongoDB ✅");
            // ✅ Example 1: Add field 'isActive' if not exists
            const updateResult1 = yield Student_1.StudentModel.updateMany({ isActive: { $exists: false } }, { $set: { isActive: true } });
            console.log(`Updated ${updateResult1.modifiedCount} documents with isActive.`);
            // ✅ Example 2: Rename field 'oldField' to 'newField'
            const updateResult2 = yield Student_1.StudentModel.updateMany({ oldField: { $exists: true } }, [{ $set: { newField: "$oldField" } }, { $unset: "oldField" }]);
            console.log(`Renamed field in ${updateResult2.modifiedCount} documents.`);
            // ✅ Example 3: Remove unnecessary field
            const updateResult3 = yield Student_1.StudentModel.updateMany({ unwantedField: { $exists: true } }, { $unset: { unwantedField: "" } });
            console.log(`Removed unwantedField from ${updateResult3.modifiedCount} documents.`);
            console.log("Migration completed ✅");
        }
        catch (err) {
            console.error("Migration failed ❌", err);
        }
        finally {
            yield mongoose_1.default.disconnect();
            console.log("Disconnected from MongoDB ✅");
        }
    });
}
migrateStudents();
