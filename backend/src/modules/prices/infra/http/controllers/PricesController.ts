import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListPricesService from '@modules/prices/services/AllPricesService';
import CreatePricesService from '@modules/prices/services/CreatePricesService';
import FindPriceService from '@modules/prices/services/FindPriceService';
import UpdatePricesService from '@modules/prices/services/UpdatePricesService';

export default class PricesController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { priceId } = req.params;

    const findPrice = container.resolve(FindPriceService);

    const price = await findPrice.execute({ id: priceId });

    return res.json(classToClass(price));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listPrices = container.resolve(ListPricesService);

    const prices = await listPrices.execute();

    return res.json(classToClass(prices));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { companyProductId } = req.params;
      const user_id = req.user.id;

      const createPrice = container.resolve(CreatePricesService);
      const price = await createPrice.execute({
        price: req.body.price,
        company_product_id: companyProductId,
        user_id,
      });
      return res.json(classToClass(price));
    } catch (error) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { priceId } = req.params;
      const { price } = req.body;
      const updatePrice = container.resolve(UpdatePricesService);
      const newPrice = await updatePrice.execute({ price_id: priceId, price });
      return res.json(classToClass(newPrice));
    } catch (error) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}
