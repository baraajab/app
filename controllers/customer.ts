
import { Request,Response } from "express"
import { Customer } from "../db/entities/Customer.js"
import { AppError } from "../errors/AppErrors.js"


const getAllCustomers =async(req:Request,res:Response)=>{
  const customers =await Customer.find()

  res.json({
    message: "getting all books successfully",
    status: true,
    customers: customers
  })
  
}

const createcustomers=async(frompostman:Customer)=>{
    const customer=await Customer.findOne({where:[
        {name:frompostman.name  },{mobilePhone:frompostman.mobilePhone}
        ,{balance:frompostman.balance}
    ]})

    if(customer){
        throw new AppError ("the customer is already exist",404,true)

    }

    const NewCustomer =Customer.create(frompostman)
    return  NewCustomer.save()
}
// const deleteCustomer = (req:Request,res:Response)=>{
//     const customerId = Number(req.params.id);

//     const customerIndex = customers.findIndex((customer) => customer.id === customerId);

//     if (customerIndex === -1) {
//         res.status(404).json({
//             message: "book not found"
//         })
//     }
//     customers.splice(customerIndex, 1)

//     res.status(200).json({
//         message: "deleted successfully",
//         customers: customers
//     })

// }
const deleteCustomer = async (id:number)=>{
    const customer = await Customer.findOne({ where:{id:id }})

    if(!customer){
        throw new AppError("Task not found ", 404, true)
    }

    return customer.remove()
}

const getSingleCustomer = async (customerId: any) => {
    const customer = await Customer.findOne({ where: { id: customerId } })

    if (!customer) {
        throw new AppError("book not found", 404, true)
    }

    return customer
}
const editCustomer = async (id:number, payload:Customer)=>{
    const customer = await Customer.findOne({ where:{id:id }})

    if(!customer){
        throw new AppError("Task not found ", 404, true)
    }

    if(payload.name){
        customer.name = payload.name
    }

    if(payload.mobilePhone){
        customer.mobilePhone = payload.mobilePhone
    }
    if(payload.mobilePhone){
        customer.balance = payload.balance
    }
    return customer.save()
    
}
export{getAllCustomers,createcustomers,getSingleCustomer,deleteCustomer,editCustomer}