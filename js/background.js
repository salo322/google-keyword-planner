
chrome.contextMenus.create({
  id: "copyContextMenu",
  title: "Copy keyword & Avg. Monthly Searches",
  contexts: ["all"]
});

chrome.contextMenus.create({
  id: "openLink",
  title: "Google Ads Training (free)",
  contexts: ["all"]
});

chrome.contextMenus.create({
  id: "googleAdsTutorials",
  title: "Google Ads Tutorials on Youtube",
  contexts: ["all"]
});

chrome.contextMenus.create({
  id: "community",
  title: "Google Ads Indonesia Community",
  contexts: ["all"]
});
chrome.contextMenus.create({
  id: "contact",
  title: "Contact Me",
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
      if (info.menuItemId === "googleAdsTutorials"){
        var newURL = "https://www.youtube.com/renrasedoya?sub_confirmation=1";
        chrome.tabs.create({ url: newURL });
      }
      if (info.menuItemId === "community"){
        var newURL = "https://www.facebook.com/groups/2052296024827476";
        chrome.tabs.create({ url: newURL });
      }
      if (info.menuItemId === "contact"){
        var newURL = "https://renrasedoya.com/contact-me/?utm_source=keyword_planner_extension&utm_medium=backlink";
        chrome.tabs.create({ url: newURL });
      }
  }
});