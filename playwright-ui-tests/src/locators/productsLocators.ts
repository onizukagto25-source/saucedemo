export const productsLocators = {
    // Header
    pageTitle: '.title',
    
    // Product list
    inventoryList: '.inventory_list',
    inventoryItem: '.inventory_item',
    
    // Product card elements
    productName: '.inventory_item_name',
    productPrice: '.inventory_item_price',
    productDescription: '.inventory_item_desc',
    productImage: '.inventory_item_img',
    
    // Add to cart button
    addToCartButton: 'button[data-test*="add-to-cart"]',
    removeButton: 'button[data-test*="remove"]',
    
    // Cart icon
    cartIcon: '.shopping_cart_link',
    cartBadge: '.shopping_cart_badge',
    
    // Sort dropdown
    sortDropdown: '.product_sort_container',
    
    // Menu
    menuButton: '#react-burger-menu-btn',
    logoutLink: '#logout_sidebar_link',
    
    // Filter options (if available)
    filterButton: '.filter_btn',
};