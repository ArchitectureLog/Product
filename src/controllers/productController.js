const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all products with pagination
const getAllProducts = async (req, res) => {
  console.log('🔥 /api/products hit');
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (page < 1 || limit < 1 || limit > 100) {
      return res.status(400).json({ 
        error: 'Invalid pagination parameters. Page must be >= 1, limit must be between 1 and 100.' 
      });
    }

    const totalCount = await prisma.product.count();

    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        category: true,
        imageUrl: true
      },
      skip: skip,
      take: limit,
      orderBy: {
        id: 'asc'
      }
    });

    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    res.json({
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
        hasNextPage,
        hasPreviousPage,
        nextPage: hasNextPage ? page + 1 : null,
        previousPage: hasPreviousPage ? page - 1 : null
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Create a product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        category,
        imageUrl
      }
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Erreur dans createProduct:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
};
