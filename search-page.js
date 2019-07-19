import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import {} from '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-input/paper-input.js';


class SearchPage extends PolymerElement {
    static get template() {
        return html`
<style>

/* Layout */

.layout {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100vh;
}

.layout-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
    width: 100%;
    padding: 10px 15px;
    transition: all 0.2s;
}

@media screen and (min-width: 560px) {
    .layout-container {
        padding: 20px 30px;
        width: 560px;
    }
}

@media screen and (min-width: 768px) {
    .layout-container {
        width: 740px;
    }
}

/* Header */

.app-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: #eee;
}

.app-header-content {
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;
}

.header-image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    min-width: 45px;
    font-size: 11px;
    border-radius: 3px;
    color: #ddd;
    overflow: hidden;
}

.header-image > img {
    flex: 1;
    width: 100%;
    height: auto;
}

/* Main content / Footer */

.app-main {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.app-footer {
    font-size: 12px;
    text-align: center;
}

/* Search */

.search-form {
    flex: 1;
    display: flex;
    min-width: 0;
    padding: 10px 0 10px 10px;
}

.search-input {
    flex: 1;
    margin-right: 10px;
    min-width: 0;
    padding: 10px;
    border-radius: 2px;
    /* border: 1px solid #c0c4ca; */
    border: none;
    /*background-color: #c0c4ca;*/
    font-size: 20px;
    font-weight: 600;
    transition: all 0.2s;
    outline: none;
}

.search-input:focus {
    background-color: white;
}

.search-btn {
    width: 100px;
    border-radius: 2px;
    border: none;
    font-size: 11px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    outline: none;
    background-color: #737c8a;
    color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 30px -5px rgba(0, 0, 0, 0.4);
}

.search-btn:hover {
    background-color: #4f5661;
    color: white;
}

.search-btn:active {
    background-color: #383d44;
    box-shadow: 0 2px 15px -2px rgba(0, 0, 0, 0.6);
    transform: scale(0.96);
}

/* Post list */

.post-list {
    margin-bottom: 20px;
}

.post-list-item {
    display: block;
    margin-bottom: 10px;
    padding: 25px;
    border-radius: 2px;
    background-color: #f5f5f5;
    font-size: 18px;
    font-weight: 300;
    color: #888;
    transition: all 0.2s;
}

.post-list-item:hover {
    background-color: #ddd;
    color: #444;
}

@media screen and (min-width: 560px) {
    .post-list-item {
        font-size: 22px;
    }
}


.message {
    text-align: center;
    font-style: italic;
}


</style>

<iron-ajax
    id="dataAjax"
    url="https://codingthat-quick-json-back-end-2.glitch.me/posts"
    params="[[params]]"
    handle-as="json"
    on-response="handleResponse">
</iron-ajax>


<div class="layout">
      <header class="app-header">
        <div class="layout-container">
          <div class="app-header-content">
            <div class="header-image">
              <img src="logo.png">
            </div>

            <div
              class="search-form"
              
            >
              <paper-input 
              class="search-input"
              label="Search for something" 
              value="{{searchQuery}}"
              disabled="{{disabled}}"
              on-keydown="searchMaybe"
              >
            </paper-input>

              <button type="button" class="search-btn" disabled="{{disabled}}" on-click="search">
                Search
              </button>
            </div>
          </div>
        </div>
      </header>

      <div class="layout-container">
        <article class="app-main">
        <template is="dom-if" if="[[ message !== '' ]]">
            <div class="message">{{ message }}</div>
        </template>
        <template is="dom-if" if="[[ message === '' ]]">
        
        
              <div class="post-list">
                  <dom-repeat items="{{results}}">
                    <template>
                        <a class="post-list-item" href="#" on-click="open">
                            {{item.title}}
                        </a>
                    </template>
                </dom-repeat>
            </div>
        </template>
        </article>

      </div>
    </div>

          
    `;
    }
    static get properties() {
        return {

            disabled: {
                type: Boolean,
                value: false
            },
            message: {
                type: String,
                value: ''
            },
            params: {
                type: String,
                computed: 'buildSearchRequest(query)'
            },
            results: {
                type: Array,
                value: []
            }
        };
    }

    buildSearchRequest(query) {
        return {
            q: query
        }
    }

    handleResponse(event, res) {
        this.results = res.response;
        this.disabled = false;
        this.message = '';
        if (this.results.length === 0) {
            this.message = 'No results found';
        }
    }
    search() {
        this.query = this.searchQuery
        this.disabled = true;
        this.message = 'Loading...';
        this.$.dataAjax.generateRequest();
    }

    open(e) {
        window.open(e.model.item.url)
    }

    searchMaybe(e) {
        if (e.keyCode === 13) {
            this.search();
        }
    }


}
customElements.define('search-page', SearchPage);
