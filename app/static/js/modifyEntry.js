const token = localStorage.getItem("token");
const entryId = Number(location.pathname.match(/\d+/)[0]);

document.addEventListener('DOMContentLoaded', () => {
    title = document.getElementById('title');
    content = document.getElementById('content');
    const token = localStorage.getItem("token");
    const url = `https://diaryapi-v2.herokuapp.com/mydiary/v1/entries/${entryId}`;
    fetch(`${url}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`
      }

    })
    .then(res =>res.json())
    .then(data => {
        let entry = "Entry fetched Successuflly"
            title.value = data[entry][2];
            content.value = data[entry][3];
        })
});

   const modify = () => {
    document.getElementById("modify").addEventListener("submit", (event) => {
        event.preventDefault();
    const url = `https://diaryapi-v2.herokuapp.com/mydiary/v1/entries/${entryId}`;
    const title = document.getElementById('title');
    const content = document.getElementById('content');

    data = {
        title: title.value,
        content: content.value
    }

    fetch(`${url}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })


    .then(res =>res.json())
    .then(data => {
        if (data.message === "Entry Updated successfully"){
        document.getElementById("success").innerHTML = data.message;;
        window.location.assign(`/detail/${entryId}`);
        }
        else
        {
          document.getElementById("fail").innerHTML = Object.values(data);
        }
        })
        .catch(err => console.error(err));
    });
    };
    module.exports = modify