import { NextFunction, Router } from "express";
import { getAllCustomers,createcustomers,getSingleCustomer, deleteCustomer, editCustomer } from "../controllers/customer.js";
import { Request,Response } from "express";
import { Customer } from "../db/entities/Customer.js";
import { logreqmiddleware } from "../middleware/Middleware.js";
const router = Router()

router.get("/",logreqmiddleware,getAllCustomers)


router.post("/", async (req: Request, res: Response, next: NextFunction) => {
   try{
    if (!req.body.name || !req.body.mobilePhone ||!req.body.balance ) {
        return res.status(400).json({
            message: "some fields are missing!!",
            success: false
        })
    }
    const customer = await createcustomers(req.body)

    res.json({
        message: "book created successfully",
        customer: customer
    })
}catch(error) {
    console.log("error: " + error);
    next(error)
}
})
router.delete("/:id", async (req:Request, res:Response, next:NextFunction)=>{

    const id =Number (req.params.id);

    try {
        const customer = await deleteCustomer(id)

        res.json({
            messege:"Task deleted successfully",
            success: true,
            customer:customer
        })
    } catch (error) {
        console.log("Error" + error);
        next(error)
    }
})

router.put("/:id", async (req:Request, res:Response, next:NextFunction)=>{

    const id =Number (req.params.id);
    const payload :Customer = req.body;

    try {
        const customer = await editCustomer(id, payload)

        res.json({
            messege:"Task edited successfully",
            success: true,
            customer:customer
        })
    } catch (error) {
        console.log("Error" + error);
        next(error)
    }
})

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customerId = Number(req.params.id)
        const customer = await getSingleCustomer(customerId)

        console.log("entered");


        res.json({
            message: "Customer created successfully",
            customer: customer
        })
    } catch (error) {
        console.log("error: " + error);
        next(error)
    }
})










export default router;