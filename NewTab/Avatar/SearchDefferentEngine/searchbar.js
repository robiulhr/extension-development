
var manifest = chrome.runtime.getManifest();
let name = manifest.chrome_settings_overrides.search_provider.name
console.log(name);
name = "robiul"
console.log(name);

let languege = chrome.i18n.getMessage("messageContent", target.url)
console.log(languege);