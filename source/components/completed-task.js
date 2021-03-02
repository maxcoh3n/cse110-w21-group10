class CompletedTask extends HTMLElement {
  static get observedAttributes() {
    return ["totaltime"];
  }

  constructor() {
    super();
  }
  connectedCallback() {
    let shadow = this.attachShadow({ mode: "open" });
    let li = document.createElement("li");
    let div = document.createElement("div");
    let nameLabel = document.createElement("label");
    let timeLabel = document.createElement("label");
    let dateLabel = document.createElement("label");

    // for css styling
    li.setAttribute("class", "listElement");
    div.setAttribute("class", "divTag");
    nameLabel.setAttribute("id", "nameLabel");
    timeLabel.setAttribute("id", "timeLabel");
    dateLabel.setAttribute("id", "DateLabel");

    nameLabel.innerText = "Task name: " + this.getAttribute("name");
    timeLabel.innerText =
      "Total time of task: " + this.getAttribute("totaltime");
    dateLabel.innerText = "Date: " + this.getAttribute("date");

    li.appendChild(nameLabel);
    li.appendChild(timeLabel);
    li.appendChild(dateLabel);

    let stlye = document.createElement("style"); // for css style

    shadow.appendChild(li);
  }
  attributeChangedCallback(name, oldvalue, newvalue) {
    if (name == "totaltime" && oldvalue != null) {
      const shadow = this.shadowRoot;
      let timeLabel = shadow.getElementById("timeLabel");
      timeLabel.innerText =
        "Total time of task: " + this.getAttribute("totaltime");
    }
  }
}

customElements.define("completed-task", CompletedTask);
