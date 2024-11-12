import React, { useState } from 'react';
import { useDispatchCart } from './ContextReducer';
import { useCart } from './ContextReducer';

export default function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('');
    const [addedToCart, setAddedToCart] = useState(false);

    const handleAddToCart = async () => {
        let food = null;

        // Check if the item with the same id and size already exists in the cart
        for (const item of data) {
            if (item.id === props.foodName._id && item.size === size) {
                food = item;
                break;
            }
        }

        if (food) {
            // If the item exists, update the quantity and price
            await dispatch({
                type: "UPDATE",
                id: props.foodName._id,
                price: (props.options[size] * (food.qty + quantity)), // Update price
                qty: food.qty + quantity, // Update quantity
                size: size,
                img: props.img
            });
        } else {
            // If the item does not exist, add a new item to the cart
            const price = props.options[size]; // Get price based on selected size
            await dispatch({
                type: "ADD",
                id: props.foodName._id,
                name: props.foodName.name,
                price: price * quantity, // Calculate total price
                qty: quantity,
                size: size,
                img: props.img
            });
        }

        console.log(data); 
        setAddedToCart(true);

        // Set a timeout to reset the button text and states
        setTimeout(() => {
            setAddedToCart(false); // Reset the button text
            setQuantity(1); // Reset quantity to default
            setSize(''); // Reset size to default
        }, 2000); // Adjust the duration as needed
    };

    let options = props.options;
    let priceOptions = Object.keys(options); // Sizes

    return (
        <div>
            <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
                <img className="card-img-top" src={props.foodName.img} alt={props.foodName.name} style={{ height: '170px', objectFit: 'cover' }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodName.name}</h5>
                    <div className='container'>
                        {/* Select quantity */}
                        <select
                            className='m-2 h-100 bg-success rounded text-white'
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))} // Ensure the quantity is a number
                        >
                            {Array.from(Array(6), (e, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>

                        {/* Select size/price */}
                        <select
                            className='m-2 h-100 bg-success rounded'
                            value={size}
                            onChange={(e) => setSize(e.target.value)} // Correctly set the size
                        >
                            <option value="">Select Size</option>
                            {
                                priceOptions.map((size) => (
                                    <option key={size} value={size}>{size} - {options[size]}</option> // Show size and corresponding price
                                ))
                            }
                        </select>
                        <div className='d-inline h-100 fs-5'>
                            Total Price: {"Rs "}{size ? quantity * options[size] : '0'}
                        </div>
                    </div>
                    <hr></hr>
                    <div className={`d-flex justify-center align-center`}>
                    <button
                        className={`btn btn-success  m-auto`}
                        style={{ width: 'fit-content' }}
                        onClick={handleAddToCart}
                        disabled={!size || quantity === 0} // Disable if no size or invalid quantity
                    >
                        {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
                    </button>
                    </div>
                 
                </div>
            </div>
        </div>
    );
}
