const parser = new DOMParser();


function loadMore(href, container) {
    console.log("Loading Destination:", href, container);

    fetch(href)
      .then((response) => {
        if (response.status !== 200) {
          throw `Status: ${response.status}`;
        }
        return response.text();
      })
      .then((htmlString) => {
        const doc = parser.parseFromString(
          htmlString,
          "text/html"
        );

        console.log("Destination Document:", doc);
        const article = doc.body.firstChild;
        container.replaceChildren(article);
      })
      .catch((error) => {
        const message = document.createTextNode(
          `Failed to fetch ${href}: ${error}`
        );

        container.append(message);
      });
  }

function toggleDarkMode(page, checked){
  console.log('Dark Mode:', checked);
  page.classList.toggle('dark-mode', checked);
}
function relayEvent(event, customType, detail) {
  const relay = event.currentTarget;
  const customEvent = new CustomEvent(customType, {
    bubbles: true,
    detail
  });

  relay.dispatchEvent(customEvent);
  event.stopPropagation();
}


window.relayEvent = relayEvent;
window.loadMore = loadMore;

document.body.addEventListener("dark-mode", (event) =>
toggleDarkMode(
  event.currentTarget,
  event.detail.checked
)
);
console.log('index.js loaded');