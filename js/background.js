
chrome.contextMenus.create({
  id: "context1",
  title: "copy keywords & avg. monthly searches",
  contexts: ["all"]
});

chrome.contextMenus.create({
  id: "context2",
  title: "Google ads training (free)",
  contexts: ["all"]
});


chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (tab) {
      if (info.menuItemId === "context1"){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {message: "getInfo"})
          });
      }
      if (info.menuItemId === "context2"){
        var newURL = "http://stackoverflow.com/";
        chrome.tabs.create({ url: newURL });
      }
  }
});