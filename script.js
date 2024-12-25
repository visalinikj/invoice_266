document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.getElementById('form-container');
    const invoiceContainer = document.getElementById('invoice-container');
    const addItemButton = document.getElementById('add-item-button');
    const finishButton = document.getElementById('finish-button');
    const itemInputsContainer = document.getElementById('item-inputs');
    const itemsTableBody = document.getElementById('items-table-body');
    const items = [];
    let itemCount = 1;
    let subtotal = 0;

    formContainer.classList.add('active'); // Show form on load
    
    addItemButton.addEventListener('click', () => {
        const description = document.getElementById(`item-description-${itemCount}`).value;
        const quantity = parseInt(document.getElementById(`item-quantity-${itemCount}`).value);
        const price = parseFloat(document.getElementById(`item-price-${itemCount}`).value);

        if (description && quantity && price) {
            const totalPrice = quantity * price;
            items.push({ description, quantity, price, totalPrice });

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${description}</td>
                <td>${quantity}</td>
                <td>${price.toFixed(2)}</td>
                <td>${totalPrice.toFixed(2)}</td>
            `;
            itemsTableBody.appendChild(row);

            subtotal += totalPrice;
            const taxRate = 0.03; 
            const tax = subtotal * taxRate;
            const total = subtotal + tax;

            document.getElementById('subtotal').textContent = subtotal.toFixed(2);
            document.getElementById('tax').textContent = tax.toFixed(2);
            document.getElementById('total').textContent = total.toFixed(2);

            // Reset the input fields for the next item
            document.getElementById(`item-description-${itemCount}`).value = '';
            document.getElementById(`item-quantity-${itemCount}`).value = '';
            document.getElementById(`item-price-${itemCount}`).value = '';
        }
    });

    finishButton.addEventListener('click', () => {
        const customerName = document.getElementById('customer-name').value;
        const customerAddress = document.getElementById('customer-address').value;

        document.getElementById('invoice-customer-name').textContent = customerName;
        document.getElementById('invoice-customer-address').textContent = customerAddress;

        formContainer.classList.remove('active');
        invoiceContainer.classList.add('active');
    });
});
