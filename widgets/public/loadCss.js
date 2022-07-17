let scriptForCss = document.createElement("script")
scriptForCss.innerHTML = "$(echo $REPLACE_TEXT)"
document.body.appendChild(scriptForCss)