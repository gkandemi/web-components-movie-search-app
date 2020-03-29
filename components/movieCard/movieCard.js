const template = document.createElement("template");
template.innerHTML = `
<style>
@import url('http://${location.host}/components/movieCard/movieCard.css')
</style>
<div class="movie-container">
    <div class="image-container">
        <img />
    </div>
    <div class="info">
        <h3 class="title"></h3>
        <p>
            <slot />
        </p>
        <div class="action_container">
            <i class="isFavourite fa fa-heart"></i>
            <a target="_blank" class="button">IMDb</a>
        </div>
    </div>
</div>
`;

class MovieCard extends HTMLElement {
  constructor() {
    super();

    this.isFavourite = false;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    // Attribute Bilgilerini Okumak...
    setTimeout(() => {
      this.shadowRoot.querySelector("h3.title").innerHTML = this.getAttribute(
        "title"
      );
      this.shadowRoot.querySelector("img").src = this.getAttribute("poster");
      this.shadowRoot
        .querySelector(".button")
        .setAttribute(
          "href",
          `https://imdb.com/title/${this.getAttribute("imdbID")}`
        );

      if (this.getAttribute("isFavourite") == "true") {
        this.isFavourite = true;
        this.shadowRoot
          .querySelector(".isFavourite")
          .classList.add("is_favourite");
      }
    }, 100);
  }

  favToggle() {
    this.isFavourite = !this.isFavourite;
    if (this.isFavourite) {
      this.shadowRoot
        .querySelector(".isFavourite")
        .classList.add("is_favourite");
    } else {
      this.shadowRoot
        .querySelector(".isFavourite")
        .classList.remove("is_favourite");
    }
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector(".isFavourite")
      .addEventListener("click", () => this.favToggle());
  }

  disconnectedCallback() {
    this.shadowRoot
      .querySelector(".isFavourite")
      .removeEventListener("click", () => this.favToggle());
  }
}

window.customElements.define("movie-card", MovieCard);
