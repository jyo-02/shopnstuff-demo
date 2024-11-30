import React, { useState } from "react";

const QuantitySelector = ({ initialAmount, maxAmount, onChange }) => {
    const [amount, setAmount] = React.useState(initialAmount);

    const handleIncrease = () => {
        if (amount < maxAmount) {
            const newAmount = amount + 1;
            setAmount(newAmount);
            onChange(newAmount); // Pass the new amount directly
        }
    };

    const handleDecrease = () => {
        if (amount > 1) {
            const newAmount = amount - 1;
            setAmount(newAmount);
            onChange(newAmount); // Pass the new amount directly
        }
    };

    return (
        <div className="flex flex-row items-center">
            <button
                className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl"
                onClick={handleDecrease}
            >
                -
            </button>
            <span className="py-4 px-6 rounded-lg">{amount}</span>
            <button
                className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl"
                onClick={handleIncrease}
            >
                +
            </button>
        </div>
    );
};


export default QuantitySelector;
