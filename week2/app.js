function main() {
  let HyfReposHttps =
    "https://api.github.com/orgs/HackYourFuture/repos?per_page=100";

  fetch(HyfReposHttps)
    .then(res => res.json())
    .then(function(data) {
      repositories = data;
      showRepositoriesInSelect(repositories);
    });
}

// Remove all child nodes to specified parent node.

function removeChildNodes(parentNode) {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
}

function showRepositoriesInSelect(repositories) {
  const repositoriesSelectElement = document.querySelector("#repos");
  repositoriesSelectElement.setAttribute(
    "onchange",
    "showRepository(this.value)",
    "getContributors(this.value)"
  );

  repositories.forEach(repository => {
    const optionElement = document.createElement("option");
    optionElement.setAttribute("value", repository.id);
    optionElement.innerText = repository.name;
    repositoriesSelectElement.appendChild(optionElement);
  });
}

// show repo info

function showRepository(repositoryId) {
  const selectedRepository = repositories.filter(repository => {
    return repository.id === Number.parseInt(repositoryId);
  })[0];

  const repositoryInfoElement = document.querySelector(".repos-info");
  removeChildNodes(repositoryInfoElement);
  repositoryInfoElement.innerHTML = `<em>Repository:</em><span>${
    selectedRepository.name
  }</span> <br>
                                      <em>Description:</strong><em>${
                                        selectedRepository.description
                                      }</span> <br>
                                      <em>Forks:</strong><em>${
                                        selectedRepository.forks
                                      }</span> <br>
                                      <em>Updated:</strong><em>${
                                        selectedRepository.updated_at
                                      }</span>`;

  fetch(selectedRepository.contributors_url)
    .then(response => response.json())
    .then(function(data) {
      contributors = data;
      showContributors(contributors);
    });
}

//shows repo contributers

function showContributors(contributors) {
  // const contributors = JSON.parse(contributorsData);
  const contributorsListElement = document.querySelector(".contributors-list");
  removeChildNodes(contributorsListElement);

  contributors.forEach(contributor => {
    const contributerElement = document.createElement("li");
    contributerElement.innerHTML = `<img width="100px" src="${
      contributor.avatar_url
    }"><br><span>${contributor.login}</span><br><span>${
      contributor.contributions
    }</span>`;

    contributorsListElement.appendChild(contributerElement);
  });
}

//data request
/*
  function getData(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    };
    xmlHttp.open("GET", theUrl, true); 
    xmlHttp.send(null);
  }
*/
