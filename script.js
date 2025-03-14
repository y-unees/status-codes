const codesList = document.getElementById("codes-list");

async function fetchCodesData() {
    try {
        const response = await fetch('/codes.json');
        if (!response.ok) throw new Error("Network response was not ok!");
        const data = await response.json();
        displayCodes(data);
    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
}

function displayCodes(data) {
    data.codes.forEach(code => {
        const codeItem = document.createElement("div");
        codeItem.classList.add("code-item");
        codeItem.innerText = `Status code: ${code.code}`;

        const descriptionElement = document.createElement("div");
        descriptionElement.classList.add("code-description");
        descriptionElement.innerHTML = `<p>Name: ${code.name}</p>
                                        <p>${code.description}</p>`;
        descriptionElement.style.display = "none";

        codesList.appendChild(codeItem);
        codesList.appendChild(descriptionElement);

        codeItem.addEventListener("click", () => {
            document.querySelectorAll(".code-item").forEach(item => {
                if (item !== codeItem) {
                    item.classList.remove("clicked");
                    const description = item.nextElementSibling;
                    if (description && description.classList.contains("code-description")) {
                        description.style.display = "none";
                    }
                }
            });

            const description = codeItem.nextElementSibling;
            if (description && description.classList.contains("code-description")) {
                if (description.style.display === "none" || !description.style.display) {
                    codeItem.classList.add("clicked");
                    description.style.display = "block";
                } else {
                    codeItem.classList.remove("clicked");
                    description.style.display = "none";
                }
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", fetchCodesData);