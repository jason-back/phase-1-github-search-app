function userSearch() {
    const submitForm = document.querySelector("#github-form");
    const searchInput = document.querySelector("#search");
    submitForm.addEventListener("submit", (e) => {
        e.preventDefault();
        fetch(`https://api.github.com/search/users?q=${searchInput.value}`)
            .then((res) => res.json())
            .then((data) => {
                const users = data.items;
                console.log(users);
                users.forEach((user) => {
                    const userList = document.querySelector("#user-list");
                    const userLi = document.createElement("li");
                    const userUrl = document.createElement("a");
                    const userButton = document.createElement("button");
                    userButton.innerText = user.login;
                    userUrl.href = user.html_url;
                    userUrl.innerHTML = `Go to profile`;
                    userList.appendChild(userLi);
                    userLi.appendChild(userUrl);
                    userLi.appendChild(userButton);
                    userButton.addEventListener("click", () => {
                        fetch(
                            `https://api.github.com/users/${user.login}/repos`
                        )
                            .then((res) => res.json())
                            .then((repos) => {
                                repos.forEach((repo) => {
                                    const reposList =
                                        document.querySelector("#repos-list");
                                    const userRepo =
                                        document.createElement("li");
                                    userRepo.innerText = repo.name;
                                    reposList.appendChild(userRepo);
                                });
                            });
                    });
                });
            });
    });
}
userSearch();
