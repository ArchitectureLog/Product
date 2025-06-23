import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error('Erreur dans getAllProducts:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
  }
});
    res.status(201).json(product);
  } catch (error) {
    console.error('Erreur dans createProduct:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
