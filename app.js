function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(
    `Please check "${selection}" selector, no such element exists`
  );
}

function Gallery(element) {
  this.container = element;
  this.list = [...element.querySelectorAll(".img")];

  // target
  this.modal = getElement(".modal");
  this.modalImg = getElement(".main-img");
  this.imageName = getElement(".image-name");
  this.modalImages = getElement(".modal-images");
  this.closeBtn = getElement(".close-btn");
  this.nextBtn = getElement(".next-btn");
  this.prevBtn = getElement(".prev-btn");
  // self reference
  // let self = this;

  // bind functions
  // this.openModal = this.openModal.bind(this);
  // container event
  this.container.addEventListener(
    "click",
    function (e) {
      // this.openModal();
      if (e.target.classList.contains("img")) {
        console.log(e.target);
        this.openModal(e.target, this.list);
      }
    }.bind(this)
  );
}

Gallery.prototype.openModal = function (selectedImage, list) {
  this.setMainImage(selectedImage);
  this.modalImages.innerHTML = list
    .map((img) => {
      return `
          <img
            src="${img.src}"
            title="${img.title}"
            class="${
              selectedImage.dataset.id === this.imageName.dataset.id
                ? "modal-img selected"
                : "modal-img"
            }"
            data-id="${img.dataset.id}"
            alt="city"
          />`;
    })
    .join("");
  this.modal.classList.add("open");
};

Gallery.prototype.setMainImage = function (selectedImage) {
  this.modalImg.src = selectedImage.src;
  this.imageName.textContent = selectedImage.title;
};

const nature = new Gallery(getElement(".nature"));
const city = new Gallery(getElement(".city"));
