window.globalData = {
  moduleOpen: null,
  selectedProduct: {
    "id": 3,
    "name": "Camiseta con detalle de encaje",
    "price": 12,
    "image": "https://res.cloudinary.com/duu1imwxs/image/upload/v1677270464/eCommerce/shirt3_wlm0h3.png",
    "category": "shirt",
    "quantity": 2,
    "description": "Esta camiseta presenta un detalle de encaje en el escote y mangas. Su ajuste regular y tela suave la hacen cómoda y fácil de usar para cualquier ocasión."
  },
  setOpen(x, y) {
    this.moduleOpen = x;
    this.selectedProduct = y;
  },
  getOpen(property) {
    return property === 'moduleOpen' ? this.moduleOpen : this.selectedProduct;
  }
};