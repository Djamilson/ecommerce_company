import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCountColorSizeProductService } from '@modules/products/services/CreateCountColorSizeProductService';
import { FindCountColorSizeProductService } from '@modules/products/services/FindCountColorSizeProductService';

class CountColorsSizesProductsController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { countColorSizeProductId } = req.params;

    const findCountColorSizeProduct = container.resolve(
      FindCountColorSizeProductService,
    );

    const countColorSizeProduct = await findCountColorSizeProduct.execute({
      id: countColorSizeProductId,
    });

    return res.json(classToClass(countColorSizeProduct));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id;
      const product_id = req.params.productId;

      const {
        stock,
        sku,
        color_id,
        size_product_id,
        thumbnail,
        bar_code,
      } = req.body;

      const create = container.resolve(CreateCountColorSizeProductService);

      const countColorSizeProduct = await create.execute({
        stock,
        sku,
        color_id,
        size_product_id,
        thumbnail,
        bar_code,
        user_id,
        product_id,
      });

      return res.json(classToClass(countColorSizeProduct));
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { CountColorsSizesProductsController };
