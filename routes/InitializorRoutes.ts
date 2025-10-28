import express,{Router } from 'express';
import {aboutRoute }from './aboutRoutes';
import {blogRoutes} from './blogRoutes'
import { contactRoutes } from './contactRoutes';
import {subscriptionRoutes  } from "./subscriptionRoutes";
import { productRoutes } from './productRoutes';
import { userRoutes } from './userRoutes';

const router = Router();
router.use('/about', aboutRoute);
router.use('/Blog',blogRoutes)
router.use('/Contact',contactRoutes)
router.use('/Subscription',subscriptionRoutes);
router.use('/Ai',productRoutes);
router.use('/users',userRoutes);
export {router as InitializorRoutes};

