document.getElementById("searchBar").addEventListener("input", searchArticles);

function searchArticles() {
    const query = document.getElementById("searchBar").value.trim();

    if (query.length === 0) {
        document.getElementById("searchResults").innerHTML = "";
        return;
    }

    console.log("Searching for:", query);  // Debugging log

    fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            console.log("Search results:", data); // Debugging log

            const resultsContainer = document.getElementById("searchResults");
            resultsContainer.innerHTML = "";

            if (data.length === 0) {
                resultsContainer.innerHTML = "<p>No articles found.</p>";
                return;
            }

            data.forEach(article => {
                const articleElement = document.createElement("a");
                articleElement.href = article.link;
                articleElement.innerText = article.title;
                articleElement.classList.add("search-result-item");

                resultsContainer.appendChild(articleElement);
            });
        })
        .catch(error => console.error("Error fetching search results:", error));
}
