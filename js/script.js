//Load data from http://makeup-api.herokuapp.com
const products = function getAllProducts() {
    fetch('http://makeup-api.herokuapp.com/api/v1/products.json?product_tags=vegan')
    .then(function(response) {
        return response.json()
    }).then(function(results) {
        console.log(results)
        results.forEach(result => {
            //For each item we create a <li>
            let productContainer = document.createElement('li')
            productContainer.classList.add('product-element')
            document.querySelector('#products-list').appendChild(productContainer)

            //We create a <div> into <li>
            let productWrapper = document.createElement('div')
            productWrapper.classList.add('product-view')

            //Output name, brand, picture and price
            productWrapper.innerHTML = `<p class="product-name">${result.name}</p>`
            productWrapper.innerHTML += `<p class="product-brand">${result.brand}</p>`
            productWrapper.innerHTML += `<img class="product-img" src=${result.image_link} height="200"/>`
            productWrapper.innerHTML += `<p class="product-price">${result.price}$</p>`
            
            //A button to add an item to customer's basket
            let buyBtn = document.createElement('div')
            buyBtn.classList.add('buyBtn')
            buyBtn.innerHTML = 'Ajouter au panier'

            //items are added in local storage
            buyBtn.addEventListener('click', function() {
                //Get items from local storage
                let items = localStorage.getItem('items')
                items = items ? items.split(',') : []
                const itemName = result.name
                items.push(itemName)
                localStorage.setItem('items', items.toString())
                console.log(items.length)
                document.querySelector('#items-counter').innerHTML = items.length
            })
            
            productContainer.appendChild(productWrapper)
            productContainer.appendChild(buyBtn)
        })
    })
}
products()

//Allow products' research by name
search = () => {
    const search = document.querySelector('#search-bar')
    let filter = search.value.toUpperCase()
    const products = document.querySelector('#products-list')
    const product = products.getElementsByTagName('li')
    for (let i = 0; i < product.length; i++) {
        let productName = product[i].querySelectorAll('.product-name')[0]
        if (productName.innerHTML.toUpperCase().indexOf(filter) != -1) {
            product[i].style.display = ''
        } else {
            product[i].style.display = 'none'
        }
    }
}

showBasket = () => {
    document.querySelector('#products-list-wrapper').style.display = 'none'
    document.querySelector('#basket-list-wrapper').style.display = 'block'
    let items = localStorage.getItem('items')
    var itemsArray = items.split(',')

    const products = document.querySelector('#items-list')
    itemsArray.forEach(item => {
        let itemLi = document.createElement('li')
        itemLi.append(item)
        products.appendChild(itemLi)
    })
}

searchInBasket = () => {
    const search = document.querySelector('#search-basket')
    let filter = search.value.toUpperCase()
    const products = document.querySelector('#items-list')
    const product = products.getElementsByTagName('li')
    for (let i = 0; i < product.length; i++) {
        if (product[i].innerHTML.toUpperCase().indexOf(filter) != -1) {
            product[i].style.display = ''
        } else {
            product[i].style.display = 'none'
        }
    }
}