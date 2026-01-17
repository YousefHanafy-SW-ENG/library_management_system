import { Router } from "express";
import { listBorrowers, registerBorrower ,deleteBorrower,updateBorrower} from "../controllers/index.js";
import { validateRequest } from "../../../common/middleware/requestValidation/index.js";
import { registerBorrowerSchema, updateBorrowerSchema} from "../schema/index.js";


const router = Router();

router.get("/",listBorrowers);

router.post("/",validateRequest({body:registerBorrowerSchema}),registerBorrower);

router.delete("/:id",deleteBorrower);

router.patch("/",validateRequest({body:updateBorrowerSchema}),updateBorrower);


export default router;