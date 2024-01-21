

const showUser = async () => {
    const res = await fetch(`https://git-server.vercel.app/users?email=john.doe@example.com`);
    const users = await res.json();
    const headerSection = document.getElementById("headerSection");

    
        const div = document.createElement("div");

        div.innerHTML = `
        <div class="header_flex">
        <img src=${users.photo} alt="" class="image" />
        <div class="address">
          <h1>${users.name}</h1>
          <h5>${users.userName}</h5>
          <h3><i class="fa-solid fa-location-dot"></i>${users.location}</h3>
          <h5>${users.socialLink}</h5>
        </div>
      </div>
      <p><i class="fa-solid fa-paperclip"></i>${users.githubRepo}</p>
        `
        headerSection.appendChild(div)
}



const pagination = async() => {
    const res = await fetch("https://git-server.vercel.app/totalRepo");
    const repos = await res.json();
    const totalData = repos.count;
    const reposPerPage = 10
    const totalBtn = Math.ceil(totalData / reposPerPage)
    const paginateBtn = [...Array(totalBtn).keys()];
  
    const btn = document.getElementById("paginationSection");
    paginateBtn.map(item => {
        const div = document.createElement("div");
        const button = document.createElement("button");
        button.className = "paginateBtn";
        button.textContent = item + 1;

        button.addEventListener("click", async function () {
            const res = await fetch(`https://git-server.vercel.app/repo?page=${item}`);
            const repos = await res.json();

            const repoSection = document.getElementById("cardContent");

            repos.map(repo => {
              const div = document.createElement("div");
              div.innerHTML = `
              <div class="card">
                  <h1>${repo.repoName}</h1>
                  <p>${repo.repoDescription}</p>
                  <div class="btn_grp">
                    <button>${repo.technology.map(tech => tech)}</button>
                  </div>
                </div>
              `
              repoSection.appendChild(div)
            });
        });
    
        div.appendChild(button);
        document.getElementById('paginationSection').appendChild(div);
    })
   
}


pagination()
showUser()
