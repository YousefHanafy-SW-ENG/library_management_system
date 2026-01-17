import { Router } from "express";
import { listBooks, createBook ,deleteBook,updateBook, searchBooks} from "../controllers/index.js";
import { validateRequest } from "../../../common/middleware/requestValidation/index.js";
import { createBookSchema, searchBookSchema, updateBookSchema } from "../schema/index.js";


const router = Router();

router.get("/",listBooks);

router.post("/",validateRequest({body:createBookSchema}),createBook);

router.delete("/:id",deleteBook);

router.patch("/",validateRequest({body:updateBookSchema}),updateBook);

router.post("/search",validateRequest({body:searchBookSchema}),searchBooks);


export default router;