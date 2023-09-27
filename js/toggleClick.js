
window.addEventListener("DOMContentLoaded", () =>
{
    let toggleClicks = document.getElementsByClassName("toggle-click");
    if(toggleClicks)
    {
        Array(...toggleClicks).forEach(element =>
        {
            let classes = Array(...element.classList);
            let toggleClass = classes.find(klass => klass.startsWith("toggle-elem-"));
            let target;
            if(toggleClass)
            {
                target = document.getElementById(toggleClass.substring(12));
            }
            else target = element;

            element.addEventListener("click", () =>
            {
                if(target.style.display === "none") target.style.display = target.dataset.initialDisplay;
                else target.style.display = "none";
            });

            //Default to hidden
            target.dataset.initialDisplay = target.style.display;
            target.style.display = "none";
        });
    }

    document.body.classList.add("toggle-click-js-enabled");
});