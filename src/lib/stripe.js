import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const  PLAN_PRICE_ID = {
    'seeker_pro' :"price_1TiUGxCWUMTQ5LcqJJl5tsKt",
    'seeker_premium' :"price_1TiVYrCWUMTQ5Lcqo37MGb0F",
    'recruiter_pro' :"price_1TiVarCWUMTQ5LcqXXoXJP0k",
    'recruiter_premium' :"price_1TiVbsCWUMTQ5Lcqieo34GKt",
}