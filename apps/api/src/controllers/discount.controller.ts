import { Request, Response } from 'express';
import { serviceAddDiscount, serviceGetAllDiscounts, serviceGetDiscount } from "@/services/discount.service";

export const addDiscount = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, discountAmount } = req.body;

    if (!startDate || !endDate || !discountAmount) {
      return res.status(400).send({
        status: 400,
        success: false,
        message: 'Missing required fields',
      });
    }

    const result = await serviceAddDiscount({ startDate, endDate, discountAmount });

    return res.status(201).send({
      status: 201,
      success: true,
      message: 'Discount added successfully',
      result,
    });
  } catch (error) {
    console.error('Error adding discount:', error);
    return res.status(500).send({
      status: 500,
      success: false,
      message: 'Internal server error',
      error: (error as Error).message,
    });
  }
};


export const getDiscount = async (req: Request, res: Response) => {
    try {
      const { date } = req.query;
  
      if (!date) {
        return res.status(400).send({
          status: 400,
          success: false,
          message: 'Missing required query parameter: date',
        });
      }
 
      const dateString = date as string;
      const discount = await serviceGetDiscount(dateString);
  
      if (!discount) {
        return res.status(404).send({
          status: 404,
          success: false,
          message: 'No discount found for the specified date',
        });
      }
  
      return res.status(200).send({
        status: 200,
        success: true,
        message: 'Discount retrieved successfully',
        result: discount,
      });
    } catch (error) {
      console.error('Error retrieving discount:', error);
      return res.status(500).send({
        status: 500,
        success: false,
        message: 'Internal server error',
        error: (error as Error).message,
      });
    }
  };

  export const getAllDiscounts = async (req: Request, res: Response) => {
    try {
      const discount = await serviceGetAllDiscounts();
  
      return res.status(200).send({
        status: 200,
        success: true,
        message: 'Discount retrieved successfully',
        result: discount,
      });
    } catch (error) {
      console.error('Error retrieving discount:', error);
      return res.status(500).send({
        status: 500,
        success: false,
        message: 'Internal server error',
        error: (error as Error).message,
      });
    }
  };