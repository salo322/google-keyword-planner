
chrome.contextMenus.create({
  id: "copyContextMenu",
  title: "copy keywords & avg. monthly searches",
  contexts: ["all"]
});

chrome.contextMenus.create({
  id: "openLink",
  title: "Google ads training (free)",
  contexts: ["all"]
});


chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (tab) {
      if (info.menuItemId === "copyContextMenu"){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {message: "getInfo"})
          });
      }
      if (info.menuItemId === "openLink"){
        var newURL = "https://renrasedoya.com/lp/google-ads-training/";
        chrome.tabs.create({ url: newURL });
      }
  }
});