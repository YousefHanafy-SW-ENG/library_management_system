import { Router } from "express";
import { validateRequest } from "../../../common/middleware/requestValidation/index.js";
import { checkoutBookSchema,updateBorrowerSchema} from "../schema/index.js";
import { checkoutBook, getBorrowedCurrentBooks, getOverdueBooks, returnBook} from "../controllers/index.js";

const router = Router();

router.post("/",validateRequest({body:checkoutBookSchema}),checkoutBook);
router.post("/return",validateRequest({body:updateBorrowerSchema}),returnBook);
router.get("/:id/books/current",getBorrowedCurrentBooks);
router.get("/overdue",getOverdueBooks);




export default router;