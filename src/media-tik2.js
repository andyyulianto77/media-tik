import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class mediaTik2 extends DDDSuper(LitElement) {

  static get tag() {
    return "media-tik2";
  }

  constructor() {
    super();
    this.visibleContent = 1;
    this.showButtons = true;
    this.showAllOption = false;
    this.labels = ["Content 1", "Content 2", "Content 3", "Content 4", "Content 5", "Content 6", "Content 7", "Content 8", "Content 9", "Content 10", "Content 11", "Content 12", "Content 13"];
  }
  
  static get properties() {
    return {
      visibleContent: { type: Number },
      showButtons: { type: Boolean },
      showAllOption: { type: Boolean },
      labels: { type: Array },
    };
  }
  
  static get styles() {
    return [super.styles,
    css`
      :host {
        // display: block;
        min-height: 0;
        /* max-width: 600px; */
        margin: auto;
        color: var(--ddd-theme-primary);
        /* background-color: var( */
          /* --simple-colors-default-theme-indigo-3; */
          /* --ddd-theme-default-linkLight */
        
        font-family: var(--ddd-font-navigation);
        font-size: var(--app-todo-font-size, var(--ddd-font-size-s));
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      div {
        padding: 0;
        margin: 0;
      }
      .content {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.24s ease-out;
      }
      .content.visible {
        max-height: 100%;
        /* max-height: 100px; Adjust this value if needed */
      }
      .button-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 20px;
      }
      button {
        display: flex;
        align-items: center;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
        /* transition-duration: 4000ms; */
        background-color: #4c80da;
        color: white;
        margin-right: 10px;
      }
      button:hover {
        background-color: #2d3748;
      }
      .arrow-down {
        width: 0;
        height: 0;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        border-top: 15px solid #85adf1;
        cursor: pointer;
        transition: transform 2.3s ease;
      }
      .arrow-down:hover {
        transform: translateY(2px);
      }
      .show-all {
        display: none;
        background-color: #2ece36;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.5s ease;
      }
      .show-all.visible {
        display: block;
        overflow: hidden;
      }
      .show-all:hover {
        background-color: #dbeeb7;
      }
    `];
  }
  
  
    render() {
      return html`
      <div class="wrapper">
    <!-- <div>${this.title}</div> -->
    ${this.renderContent()} ${this.showButtons ? this.renderButtons() : ""}
    <slot></slot>
  </div>
      `;
    }
  
    renderContent() {
      return this.labels.map(
        (label, index) => html`
          <div class="content ${this.visibleContent > index ? "visible" : ""}">
            <!-- <h2>${label}</h2> -->
            <slot name="content-${index + 1}"></slot>
          </div>
        `
      );
    }
  
    renderButtons() {
      return html`
        <div class="button-container">
          <button @click=${this.handlePause}>Lanjut ...</button>
          <div class="arrow-down" @click=${this.toggleShowAll}></div>
          <button
            class="show-all ${this.showAllOption ? "visible" : ""}"
            @click=${this.showAll}
          >
            Tampilkan Semua
          </button>
        </div>
      `;
    }
  
    handlePause() {
      if (this.visibleContent < this.labels.length) {
        this.visibleContent++;
      } else {
        this.visibleContent = 13;
        this.showButtons = false;
      }
    }
  
    toggleShowAll() {
      this.showAllOption = !this.showAllOption;
    }
  
    showAll() {
      this.visibleContent = this.labels.length;
      this.showButtons = false;
    }
    static get haxProperties() {
      return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
        .href;
    }
  }
  
  // customElements.define("enhanced-pause-component", EnhancedPauseComponent);
  
globalThis.customElements.define(mediaTik2.tag, mediaTik2);
