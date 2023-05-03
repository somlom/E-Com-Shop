import Stripe from 'stripe';

import {Orders} from '../db/order';
import {Users} from '../db/users';
import Mailer from '../lib/mailer';
import {create_stripe_session} from '../lib/stripe';


export async function get_orders(req, res) {
  const order = await Orders.find({user: req.user, payed: true})
    .populate('products._id')
    .sort({updatedAt: 'descending'});
  return res.json(order);
}

export async function set_order(req, res) {
  const {cart} = req.body;

  if (cart) {
    const order = await Orders.findOne({user: req.user, open: true});
    if (order) {
      if (cart === order.products) {
        res.status(304);
        return res.json(order);
      } else {
        await order.updateOne({products: cart});
        return res.json(order);
      }
    } else {
      const order = await Orders.create({
        user: req.user,
        products: cart,
      });
      return res.json(order);
    }
  } else {
    res.status(301);
    throw new Error('Empty order');
  }
}

export async function pay_for_item(req, res) {
  const product = req.body;
  product._id = product.id;

  const order = await Orders.create({user: req.user, products: [product]});

  if (order) {
    const user = await Users.findById(req.user);
    if (user) {
      const session = await create_stripe_session(order, order.id, user.email);

      if (session.status === true) {
        await order.updateOne({stripe_order_id: session.id});

        return res.status(200).json(session);
      } else {
        return res.status(400).json('smth_went_wrong');
      }
    } else {
      return res.status(400).json('login_to_proceed');
    }
  } else {
    return res.status(400).json('smth_went_wrong');
  }
}

export async function pay_order(req, res) {
  const order = await Orders.findOne({user: req.user, open: true}).populate(
    'user'
  );

  const session = await create_stripe_session(
    order,
    order.id,
    order.user.email
  );

  await order.updateOne({stripe_order_id: session.id});

  if (session.status === true) {
    return res.json(session);
  } else {
    return res.status(400);
  }
}

export async function close_order(req, res) {
  const stripe = new Stripe(process.env.STRIPE_SECRET);

  const {order_id} = req.params;

  const order = await Orders.findById(order_id).populate('products._id');

  const session = await stripe.checkout.sessions.retrieve(
    order.stripe_order_id,
    {apiKey: process.env.STRIPE_SECRET}
  );

  if (session) {
    const products = [];

    Array.from(order.products).forEach(element => {
      element._id.quantity = parseInt(element.quantity);
      products.push(element._id);
    });

    if (
      order.payed === false &&
      order.open === true &&
      session.status === 'complete'
    ) {
      await order.updateOne({open: false, payed: true});

      const mailer = new Mailer();

      mailer.send_email(
        session.customer_email,
        'Ihre Bestellung ist in der Verarbeitung',
        'order',
        {name: session.shipping_details.name}, [{filename:"document.pdf", path:"public/png2pdf.pdf"}]
      );
      mailer.send_email(process.env.ADMIN_EMAIL, 'NEW ORDER', 'order_alert', {
        customer_details: session.customer_details,
        address: session.customer_details.address,
      });
    }
    return res.json(products);
  } else {
    return res.status(404).json();
  }
}
