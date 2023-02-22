const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  
    
   
      Category.findAll({
        include: [ Product ],
      }).then((categories) => res.status(200).json(categories))
      
     .catch( (err) =>res.status(500).json(err));
    
    
  

    });

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const Category = await Product.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
  
    if (!Product) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }
    res.status(200).json(Product);
  }
  catch (err) {
  res.status(500).json(err);
}

});


router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      reader_id: req.body.product_id,
    });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }


});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, 
    {
      id:req.params.id

    }
  )
  .then((category) => res.status(200).json(category))
  .catch((err) => res.json(err));

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
  const Category = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });

  if (!Category) {
    res.status(404).json({ message: 'No category found with that id!' });
    return;
  }

  res.status(200).json(Category);
} catch (err) {
  res.status(500).json(err);
}
});

module.exports = router;
