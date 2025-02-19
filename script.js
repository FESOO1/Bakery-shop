// DESSERTS CONTAINER
const dessertsContainer = document.querySelector('.main-left-desserts');
const cart = {
    cartDessert: {
        dessertName: [],
        dessertPrice: [],
        dessertHowMany: [],
    },
    cartOverallPrice: 0,
};

// CART
const yourCartDessertCounter = document.querySelector('.main-left-header-inner');
const orderedDessertsContainer = document.querySelector('.main-right-cart-itself-ordered-desserts');
const orderTotalText = document.querySelector('.main-right-cart-itself-order-total-inner');
const confirmOrderButton = document.querySelector('.main-right-cart-itself-confirm-button');

// DISPLAYING THE DESSERTS

async function fetchTheDesserts() {
    const response = await fetch('./data.json');

    if (!response.ok) {
        throw new Error(response.status);
    };

    const data = await response.json();

    return data;
};

const fetchedResources = fetchTheDesserts();

fetchedResources
    .then(dessertData => {
        for (let i = 0; i < dessertData.length; i++) {
            const dessertImage = () => {
                if (window.innerWidth > 1200) {
                    return dessertData[i].image.desktop;
                } else if (window.innerWidth > 800) {
                    return dessertData[i].image.tablet;
                } else {
                    return dessertData[i].image.mobile;
                };
            };
            dessertsContainer.innerHTML += `
                <div class="main-left-dessert-itself" data-dessert-name="${dessertData[i].name}">
                    <div class="main-left-dessert-itself-image">
                        <img src="${dessertImage()}" alt="${dessertData[i].name}'s picture" class="main-left-dessert-itself-image-itself">
                    </div>
                    <div class="main-left-dessert-itself-buttons">
                        <button class="main-left-dessert-itself-button-add-to-cart" type="button">
                        <svg class="main-left-dessert-itself-button-add-to-cart-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                            <path d="M8 16L16.7201 15.2733C19.4486 15.046 20.0611 14.45 20.3635 11.7289L21 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M6 6H6.5M22 6H19.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M9.5 6H16.5M13 9.5V2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <circle cx="6" cy="20" r="2" stroke="currentColor" stroke-width="1.5" />
                            <circle cx="17" cy="20" r="2" stroke="currentColor" stroke-width="1.5" />
                            <path d="M8 20L15 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M2 2H2.966C3.91068 2 4.73414 2.62459 4.96326 3.51493L7.93852 15.0765C8.08887 15.6608 7.9602 16.2797 7.58824 16.7616L6.63213 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        </svg>
                        <h4 class="main-left-dessert-itself-button-add-to-cart-text">Add to Cart</h4>
                        </button>
                        <div class="main-left-dessert-itself-decrement-increment-buttons">
                            <button disabled type="button" class="main-left-dessert-itself-decrement-button-itself">
                                <svg class="main-left-dessert-itself-decrement-button-itself-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                                <path d="M20 12L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                            <span class="main-left-dessert-itself-decrement-increment-buttons-text">1</span>
                            <button type="button" class="main-left-dessert-itself-increment-button-itself">
                                <svg class="main-left-dessert-itself-increment-button-itself-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                                <path d="M12 4V20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M4 12H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="main-left-dessert-itself-information">
                        <h4 class="main-left-dessert-itself-information-category">${dessertData[i].category}</h4>
                        <h3 class="main-left-dessert-itself-information-name">${dessertData[i].name}</h3>
                        <h3 class="main-left-dessert-itself-information-price">$${dessertData[i].price.toFixed(2)}</h3>
                    </div>
                </div>
            `;
        };

        // DESSERT ITSELF
        const dessertItself = dessertsContainer.querySelectorAll('.main-left-dessert-itself');
        const dessertItselfAddToCartButton = document.querySelectorAll('.main-left-dessert-itself-button-add-to-cart');
        const dessertItselfDecrementIncrementButtonsContainer = document.querySelectorAll('.main-left-dessert-itself-decrement-increment-buttons');
        const dessertItselfDecrementButton = document.querySelectorAll('.main-left-dessert-itself-decrement-button-itself');
        const dessertItselfIncrementButton = document.querySelectorAll('.main-left-dessert-itself-increment-button-itself');
        const dessertItselfDecrementIncrementCounterText = document.querySelectorAll('.main-left-dessert-itself-decrement-increment-buttons-text');

        for (let i = 0; i < dessertItself.length; i++) {
            let dessertItselfDecrementIncrementCounter = 1;

            // ADD TO CART BUTTON
            dessertItselfAddToCartButton[i].addEventListener('click', () => {
                dessertItselfAddToCartButton[i].classList.add('main-left-dessert-itself-button-add-to-cart-hidden');
                dessertItselfDecrementIncrementButtonsContainer[i].classList.add('main-left-dessert-itself-decrement-increment-buttons-active');
            });

            // DECREMENT BUTTON
            dessertItselfDecrementButton[i].addEventListener('click', () => {
                dessertItselfDecrementIncrementCounter--;
                dessertItselfDecrementIncrementCounterText[i].textContent = dessertItselfDecrementIncrementCounter;

                if (dessertItselfDecrementIncrementCounter === 1) {
                    dessertItselfDecrementButton[i].disabled = true;
                };
            });

            // INCREMENT BUTTON
            dessertItselfIncrementButton[i].addEventListener('click', () => {
                dessertItselfDecrementIncrementCounter++;
                dessertItselfDecrementIncrementCounterText[i].textContent = dessertItselfDecrementIncrementCounter;
                dessertItselfDecrementButton[i].disabled = false;
            });
        };
    })
    .catch(error => {
        console.log(error);
    });