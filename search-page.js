import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import {} from '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-input/paper-input.js';

class SearchPage extends PolymerElement {
    static get template() {
        return html`
<style>

    .wrapper {
        margin: auto;
        width:80%;
        height:50px;
        display: table;
    }
    .central {
        width:100%;
        height:50px;
        background-color:#CCCCCC;
        display: table-cell;
        padding-left: 15px;
        padding-right: 15px;
    }
    .left, .right {
        /*width: 20px;*/
        height:50px;        
        display: table-cell;
        vertical-align: middle;
    }
    
    button {
        border: 1px solid #999;
        background: none;
        padding: 20px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
    }
    
    .header {
        background: #ccc;
    }
    
    
    img {
        height: 50px;
        margin-top: 5px;
    }
    
    .contents {
        margin-top: 15px;
    }
    
    .message {
        text-align: center;
        padding: 5px;
        color: #999;
        font-style: italic;
    }
    .row {
        padding: 16px;
        background-color: #ccc;
        border-radius: 4px;
        border: 1px solid #ccc;
        overflow: hidden;
        text-decoration: none;
        margin-bottom: 2px;
    
    }
    .row:hover {
        text-decoration: underline;
    }

</style>

<iron-ajax
    id="dataAjax"
    url="https://codingthat-quick-json-back-end-2.glitch.me/posts"
    params="[[params]]"
    handle-as="json"
    on-response="handleResponse">
</iron-ajax>

<div class="header">
    <div class="wrapper">
        <div class="left">
            <img src="logo.png">
        </div>
        <div class="central">
            
            <paper-input 
              label="Search for something" 
              value="{{searchQuery}}"
              disabled="{{disabled}}"
              >
            </paper-input>
            </div>
            <div class="right">
                  <button type="button" disabled="{{disabled}}" on-click="search">Search</button>
            </div>
    
    </div>
</div>

    
<div class="message">
    {{message}}
</div>

<div class="contents">
    <div class="wrapper">
        <dom-repeat items="{{results}}">
            <template>
                <div class="row">
                    <div on-click="open">{{item.title}}</div>
                </div>
            </template>
        </dom-repeat>
    
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
        if (this.results.length === 0) {
            this.message = 'No results found';
        }
    }
    search() {
        this.query = this.searchQuery
        this.disabled = true;
        this.message = '';
        this.$.dataAjax.generateRequest();
    }

    open(e) {
        window.open(e.model.item.url)
    }


}
customElements.define('search-page', SearchPage);
