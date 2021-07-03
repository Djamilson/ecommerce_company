import { Router } from 'express';

import brandsRouter from '@modules/brands/infra/http/routes/brands.routes';
import citiesRouter from '@modules/locality/infra/http/routes/cities.routes';
import statesRouter from '@modules/locality/infra/http/routes/states.routes';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';
import transactionsRouter from '@modules/payments/infra/http/routes/transactions.routes';
import countsColorsSizesProductsRouter from '@modules/products/infra/http/routes/counts.colors.sizes.products.routes';
import photosRouter from '@modules/products/infra/http/routes/photos.products.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import refreshTokenRouter from '@modules/refreshToken/infra/http/routes/refresh.token.routes';
import sectionsRouter from '@modules/sections/infra/http/routes/sections.routes';
import addressesRouter from '@modules/users/infra/http/routes/addresses.routes';
import groupsRouter from '@modules/users/infra/http/routes/groups.routes';
import infoClientsRouter from '@modules/users/infra/http/routes/infoclients.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import personsRouter from '@modules/users/infra/http/routes/persons.routes';
import phonesRouter from '@modules/users/infra/http/routes/phones.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/users', usersRouter);
/*= =================== offers user final ======================== */

routes.use('/sessions', sessionsRouter);
routes.use('/refresh', refreshTokenRouter);
routes.use('/groups', groupsRouter);

routes.use('/info/clients', infoClientsRouter);
routes.use('/addresses', addressesRouter);
routes.use('/phones', phonesRouter);
routes.use('/persons', personsRouter);

routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

routes.use('/cities', citiesRouter);
routes.use('/states', statesRouter);

routes.use('/products', productsRouter);
routes.use('/counts/colors/sizes/products', countsColorsSizesProductsRouter);
routes.use('/photos', photosRouter);

routes.use('/sections', sectionsRouter);
routes.use('/brands', brandsRouter);

routes.use('/orders', ordersRouter);
routes.use('/transactions', transactionsRouter);

export default routes;
