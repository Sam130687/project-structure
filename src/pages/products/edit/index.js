import ProductForm from "../../../components/product-form";

export default class Page {
  element;
  components = {};

  constructor () {
    this.productId = decodeURI(window.location.pathname).slice("/products/".length);
    this.isAddMode = this.productId === "add";

  }

  async render() {
    const element = document.createElement('div');

    element.innerHTML = this.template();

    this.element = element.firstElementChild;

    this.initComponents();
    await this.renderComponents();

    return this.element;
  }

  template () {
    return `<div class="products-edit">
      <div class="content__top-panel">
        <h1 class="page-title">
          <a href="/products" class="link">Товары</a> / ${(this.isAddMode) ? "Добавить" : "Редактировать"}
        </h1>
      </div>
      <div data-content class="content-box"></div>
    </div>`
  }

  initComponents() {
    if (this.isAddMode) {
      this.components.productFrom = new ProductForm();
    } else {
      this.components.productFrom = new ProductForm(this.productId);
    }
  }

  async renderComponents() {
    const element = await this.components.productFrom.render();
    const content = this.element.querySelector("[data-content]");
    content.append(element);
  }

  remove () {
    this.element.remove();
  }

  destroy() {
    for (const component of Object.values(this.components)) {
      component.destroy();
    }
  }
}