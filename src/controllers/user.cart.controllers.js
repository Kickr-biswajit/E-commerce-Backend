import Product from "../models/admin.product.model.js";
import Cart from "../models/user.cart.model.js";

export const addToCart = async(req,res,next)=>{
    try {
        const userId = req.user.id;
        const {productId, quantity} = req.body;

        const product = await Product.findById(productId);
        if(!product){
            return res.status(400).json({
                success:false,
                message:"Product not found"
            })
        }
        let cart = await Cart.findOne({user:userId});
        if(!cart){
            cart = new Cart({
                user:userId,
                items:[],
                totalPrice:0
            })
        }

        const countQuantity = parseInt(quantity,10);
        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );
        if(itemIndex > -1){
            cart.items[itemIndex].quantity+=countQuantity;
        }else{
            cart.items.push({
                product:productId,
                quantity:countQuantity,
                price:product.price
            })
        }
        cart.totalPrice = cart.items.reduce(
        (sum,item)=>sum + (item.price)* item.quantity,0
        )
        await cart.save();
        
        return res.status(200).json({
            success:true,
            message:"Cart added Successfully",
            data:cart,product
        });
    } catch (error) {
        next(error);
    }
}

export const getMyCart = async(req,res,next)=>{
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({user:userId}).populate('items.product');
        if(!cart || cart.items.length === 0){
            return res.status(400).json({
                success:false,
                message:"Cart is empty"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Cart fetched Successfully",
            data:cart
        });
    } catch (error) {
        next(error);
    }
}

export const removeFromCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    const updatedCart = await Cart.findOneAndUpdate(
      {
        user: userId,
        "items.product": productId
      },
      {
        $pull: { items: { product: productId } }
      },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart"
      });
    }

    updatedCart.totalPrice = updatedCart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await updatedCart.save();

    res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart: updatedCart
    });

  } catch (error) {
    next(error);
  }
};
