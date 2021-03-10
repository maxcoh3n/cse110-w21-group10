class CompletedTask extends HTMLElement {
  static get observedAttributes() {
    return ["finishedses"];
  }

  constructor() {
    super();
  }
  connectedCallback() {
    let shadow = this.attachShadow({ mode: "open" });
    let li = document.createElement("li");
    let div = document.createElement("div");
    let nameLabel = document.createElement("label");
    let dateLabel = document.createElement("label");
    let ol = document.createElement("ol");

    // for css styling
    li.setAttribute("class", "listElement");
    div.setAttribute("class", "divTag");
    nameLabel.setAttribute("id", "nameLabel");
    dateLabel.setAttribute("id", "DateLabel");
    ol.setAttribute("id", "olTimeSes");

    dateLabel.innerText = this.getAttribute("date") + ": ";
    nameLabel.innerText = this.getAttribute("name");
    let arr = JSON.parse(this.getAttribute("totaltime"));

    for (let i = 0; i < arr.length; i++) {
      let timeLabel = document.createElement("label");
      let newline = document.createElement("br");
      timeLabel.setAttribute("id", "timeLabel");
      timeLabel.innerText = arr[i] + " minute session";
      timeLabel.appendChild(newline);
      ol.appendChild(timeLabel);
    }
    //li.appedpc div
    // div.appped three below
    li.appendChild(dateLabel);
    li.appendChild(nameLabel);
    li.appendChild(ol);

    // let style = document.createElement("style"); // for css style
    // STYE = {

    // }
    shadow.appendChild(li);
    //showappend(style);
  }
  attributeChangedCallback() {
    const shadow = this.shadowRoot;
    let timeLabel = document.createElement("label");
    let newline = document.createElement("br");
    timeLabel.setAttribute("id", "timeLabel");
    timeLabel.innerText = this.getAttribute("finishedses") + " minute session";
    timeLabel.appendChild(newline);
    shadow.getElementById("olTimeSes").appendChild(timeLabel);
  }
}

customElements.define("completed-task", CompletedTask);
